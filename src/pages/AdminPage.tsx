import * as React from "react";
import {
  postProduct,
  updatePostedProduct,
} from "../api/dataBaseProductMethods";

import { postMultipleFiles } from "../api/dataBaseStorageMethods";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";
import SelectPictures from "../components/admin-area/selectPictures";
import Switch from "../components/admin-area/switch";
import CloseIcon from "@mui/icons-material/Close";

import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const defaultsAdminInputs = {
    productName: "",
    productCategory: "",
    quantity: 1,
    currency: "euro",
    prices: "",
    sizes: "",
    listBenefits: "",
    pictures: [],

    preorder: false,
  };

  const [values, setValues] = React.useState<any>(defaultsAdminInputs);

  const [limitedProduct, setlimitedProduct] = React.useState(false);
  const [preorderProduct, setPreorderProduct] = React.useState(false);

  const authUser = useSelector((state: any) => state.auth.user);

  const [loading, setLoading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const updatePictures = (event: any) => {
    if (event.target.files.length <= 0) return;
    if (values.pictures === null) {
      setValues({ ...values, pictures: [event.target.files[0]] });

      return;
    }
    const picturesCopy = [...values.pictures];
    picturesCopy.push(event.target.files[0]);
    setValues({ ...values, pictures: picturesCopy });
  };

  function deletePictureFromList(pictureIndex: number) {
    const picturesCopy = [...values.pictures];

    picturesCopy.splice(pictureIndex, 1);

    setValues({ ...values, pictures: picturesCopy });
  }

  function createImgs() {
    if (values.pictures === null) return [];
    return values.pictures.map((imgFile: File, index: number) => {
      return (
        <div
          className="product-image-container w-28 h-auto  m-2 relative"
          key={index + "t"}
        >
          <img
            src={URL.createObjectURL(imgFile)}
            alt="preview image"
            className=""
            key={index}
          />
          <div
            title="Delete picture"
            onClick={() => {
              deletePictureFromList(index);
            }}
            className="delete-picture-from-list-btn absolute right-0 top-0 text-red-400 cursor-pointer hover:text-red-600 transition-all ease"
          >
            <CloseIcon />
          </div>
        </div>
      );
    });
  }

  function createSizesObject() {
    // if this func retuns false then throw an error("not all fields ")
    const { quantity, prices, sizes } = values;

    const trimedSizes = sizes.trim();
    const trimedPrices = prices.trim();
    const trimedQuantity = quantity.trim();

    if (!sizes.includes(",")) {
      if (trimedSizes !== "" && trimedPrices !== "" && trimedQuantity !== "") {
        return {
          [trimedSizes]: {
            sold: 0,
            numberItemsAvailable: quantity,
            price: parseInt(trimedPrices),
          },
        };
      }

      return null;
    }
    if (!prices.includes(",") || !quantity.includes(",")) {
      return false;
    }

    const splitedSizes = sizes.split(",");
    const splitedPrices = prices.split(",");
    const splitedQuatity = quantity.split(",");

    const sizesObject: {
      [key: string]: {
        numberItemsAvailable: number;
        price: number;
        sold: number; // you could just placed zero as default instead of a number type
      };
    } = {};

    let isCommaBindingNotMissingAPair = true;

    for (const [index, sizeName] of splitedSizes.entries()) {
      const numberItemsAvailable = splitedQuatity[index];
      const price = splitedPrices[index];

      if (
        numberItemsAvailable == null ||
        price == null ||
        numberItemsAvailable === "" ||
        price === ""
      ) {
        isCommaBindingNotMissingAPair = false;
        break;
      }

      sizesObject[sizeName] = {
        sold: 0,
        numberItemsAvailable,
        price,
      };
    }

    if (isCommaBindingNotMissingAPair === false) return false;

    return sizesObject;
  }

  async function handleSubmit() {
    if (loading) return;
    setLoading(true);
    const userUid = "testUid"; //authUser?.uid  != null ? authUser?.uid : null

    const {
      productName,
      productCategory,

      currency,
      prices,
      quantity,
      listBenefits,
      pictures,
    } = values;

    const trimedProductName = productName.trim();
    const trimedProductCategory = productCategory.trim();
    const trimedPrices = prices.trim();
    if (
      trimedProductName === "" ||
      trimedProductCategory === "" ||
      trimedPrices === "" ||
      userUid == null
    ) {
      setErrorMessage("Please complete all fields !");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    const productCurrencyList = currency.includes(",")
      ? currency.trim().split(",")
      : [currency.trim()];
    const producListBenefits = listBenefits.includes(",")
      ? listBenefits.trim().split("|")
      : null;
    const productPrice = prices.includes(",") ? null : parseInt(prices);

    let productObject: { [key: string]: any } = {
      productName,
      productCategory,
      productCurrencyList,
      listBenefits: producListBenefits,
      price: productPrice,
      limited: limitedProduct,
      preorder: preorderProduct,
    };

    if (!quantity.includes(",") && quantity !== "") {
      productObject["numberItemsAvailable"] = parseInt(quantity);
    }

    const sizesObject = createSizesObject();
    if (sizesObject === false) {
      setErrorMessage(
        "Please make sure that your comma separated values are in pairs !"
      );
      setLoading(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if (sizesObject != null) {
      productObject = { ...productObject, sizesAvailable: sizesObject };
    }

    // post product

    const postedProduct = await postProduct({
      creatorId: userUid,
      productObject,
    });

    if (postedProduct.error) {
      setErrorMessage("Could not post the product");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    if (pictures === null || pictures?.length === 0) {
      // no pictures
      setLoading(false);

      return;
    }

    // await post pictures to storage

    const picturesPosted = await postMultipleFiles({
      beforeGeneralPath: postedProduct.data.id,
      files: pictures,
    });

    if (picturesPosted.error) {
      setErrorMessage("Could not add the product images");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return;
    }

    if (picturesPosted == null || picturesPosted?.data == null) {
      return;
    }
    // update posted product with picturesURL array list

    const picturesURL = picturesPosted.data.files.map(
      (pictureObject: any) => pictureObject.downloadURL
    );

    const updateResult = await updatePostedProduct({
      updatedByUserId: userUid,
      productIdToUpdate: postedProduct.data.id,
      productObject: { picturesURL: picturesURL },
    });

    if (updateResult.error) {
      setErrorMessage("Could not add an update date to the post");

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }

    // reset form
    setValues(defaultsAdminInputs);
    setPreorderProduct(false);
    setlimitedProduct(false);

    setLoading(false);
  }

  return (
    <div className="admin-page-container ">
      <div className="login-container flex flex-col gap-16  items-center ">
        <div className="login-container__title text-center mt-16">
          <div className="first-title text-[55px] text-[#1D1D1D]">Admin</div>
          <div className="second-title mt-3 font-sans text-lg text-[#1D1D1D]">
            Add a product {"("} comma separated are binded together as pairs
            {")"}
          </div>
        </div>
        <div className="login-container__inputs w-[30%]">
          <div className="inputs-container ">
            <div className="card flex flex-col gap-4">
              {errorMessage != null && (
                <div className="error-message-container flex items-center gap-2 text-[#e4ffa6] bg-[#36c7c4]  p-6 mb-7">
                  <div className="error-icon">
                    <ErrorOutlineIcon />
                  </div>
                  <div className="error-message">{errorMessage}</div>
                </div>
              )}
              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.productName}
                  onChange={handleChange("productName")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Product Name
                </span>
              </label>

              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.productCategory}
                  onChange={handleChange("productCategory")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Product Category name
                </span>
              </label>

              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.currency}
                  onChange={handleChange("currency")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Products currency {"("}comma separated{")"}
                </span>
              </label>

              <div className="invisible-line-between py-[0.56rem]"></div>
              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.quantity}
                  onChange={handleChange("quantity")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Products quantity available {"("}comma separated{")"}
                </span>
              </label>

              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.prices}
                  onChange={handleChange("prices")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Product Prices {"("}comma separated{")"}
                </span>
              </label>

              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.sizes}
                  onChange={handleChange("sizes")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Product Sizes{"("}comma separated{")"}
                </span>
              </label>

              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.listBenefits}
                  onChange={handleChange("listBenefits")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Product key points description {"("} pipese{"("}|{")"} parated
                  {")"}
                </span>
              </label>

              <div className="switches-container flex justify-between">
                <div className="limited-product-switch-container flex items-center gap-2">
                  <div className="label-switch">Limited product ?</div>
                  <div className="switch-container">
                    <Switch
                      checked={limitedProduct}
                      setChecked={setlimitedProduct}
                    />
                  </div>
                </div>

                <div className="product-is-preorder flex items-center gap-2">
                  <div className="label-switch">Preorder product ?</div>
                  <div className="switch-container">
                    <Switch
                      checked={preorderProduct}
                      setChecked={setPreorderProduct}
                    />
                  </div>
                </div>
              </div>

              <div className="add-product-pictures-input-container border-t border-black pt-2">
                <div className="added-product-pictures-list-container flex flex-wrap items-center">
                  {createImgs()}
                </div>
                <div className="icon-container flex justify-center">
                  <SelectPictures
                    setSelectedItem={updatePictures}
                    disableButton={loading}
                  />
                </div>
              </div>

              <div
                className="login-button button-action fill-animation bg-[#E84841]  p-[0.88rem] mt-9"
                onClick={handleSubmit}
              >
                <div className="login-action-text text-white text-center">
                  {loading ? (
                    <Stack
                      sx={{
                        color: "grey.500",
                        height: "25px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "10px",
                        padding: "0 0",
                        margin: "0 0",
                      }}
                      spacing={2}
                    >
                      <CircularProgress color="inherit" />
                    </Stack>
                  ) : (
                    "ADD PRODUCT"
                  )}
                </div>
              </div>

              <div className=" mt-6  mb-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
