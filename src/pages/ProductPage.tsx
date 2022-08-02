import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

// import ImageWebp from "../components/general-helpers/ImageWebp";
import { addToUserCart } from "../api/dataBaseCartMethods";
import { addProductToCart } from "../store/cart";
import { changeDrawerStateByDirectionId } from "../store/drawers";
import ProductImageShowcase from "../components/admin-area/productImageShowcase";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import DollarRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import QuantitySelector from "../composables/generalHelpers/productQuantitySelector";
import ProductItem from "../composables/generalHelpers/productItem";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const useId = React.useId();

  const productId = params?.productId;

  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  const userObject = useSelector((state: any) => state.auth.user);

  const productsList = useSelector((state: any) => state.products.productsList);

  const [loading, setLoading] = React.useState(false);

  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const productFound = findProductById();

  const [selectedSize, setSelectedSize] = React.useState<null | {
    sizeName: string;
    sizeValue: any;
  }>(null);

  const [selectedPrice, setSelectedPrice] = React.useState<null | number>(null);

  const selectedQuantity = React.useRef(1); // use to add product to cart

  // if the user is logged in then we store to the database

  async function addProductSelectedToCart() {
    // set error message if there was any error
    setLoading(true);

    const productToAddToCart = {
      quantity: selectedQuantity.current,
      sizeSelected: selectedSize != null ? { ...selectedSize } : null,
      ...productFound,
    };
    if (userObject?.uid != null) {
      // user is  logged in
      const { error, message } = await addToUserCart({
        userUid: userObject.uid,
        productObject: productToAddToCart,
      });

      if (error) {
        setErrorMessage(message);
        setLoading(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }

      dispatch(
        changeDrawerStateByDirectionId({
          direction: "right",
          newStatus: true,
        })
      );
      return;
    }

    dispatch(addProductToCart(productToAddToCart));
    setLoading(false);
    dispatch(
      changeDrawerStateByDirectionId({
        direction: "right",
        newStatus: true,
      })
    );
  }

  function setNewQuantity(newQuantityValue: number) {
    selectedQuantity.current = newQuantityValue;
  }

  const productSoldOut = findIfProductIsSoldOut();

  React.useEffect(() => {
    addASelectedPriceAndSize();
    selectedQuantity.current = 1;
  }, [productFound]);

  const productHasSizes =
    productFound != null ? Object.hasOwn(productFound, "sizesAvailable") : null;
  const sizesList: any = productHasSizes
    ? Object.entries(productFound.sizesAvailable)
    : null;

  function addASelectedPriceAndSize(manualAdd?: {
    newPriceNumber?: number;
    newSizeObject?: { sizeName: string; sizeValue: any };
  }) {
    if (productFound == null) {
      return;
    }
    // on template add .toLowerCase

    if (selectedSize === null && productHasSizes && manualAdd == null) {
      const autoSelectedSizeName = sizesList[0][0];
      const autoSelectedSizeValueObject = sizesList[0][1];

      setSelectedSize({
        sizeName: autoSelectedSizeName,
        sizeValue: autoSelectedSizeValueObject,
      });

      const priseNumberSelected = autoSelectedSizeValueObject.price.includes(
        ","
      )
        ? parseInt(autoSelectedSizeValueObject.price.trim().split(",")[0])
        : parseInt(autoSelectedSizeValueObject.price.trim());

      setSelectedPrice(priseNumberSelected);

      return;
    }

    if (manualAdd != null) {
      const { newPriceNumber, newSizeObject } = manualAdd;

      if (newPriceNumber) {
        setSelectedPrice(newPriceNumber);
      }

      if (newSizeObject) {
        setSelectedSize(newSizeObject);

        const priseNumberSelected = newSizeObject.sizeValue.price.includes(",")
          ? parseInt(newSizeObject.sizeValue.price.trim().split(",")[0])
          : parseInt(newSizeObject.sizeValue.price.trim());

        setSelectedPrice(priseNumberSelected);
      }
    }

    if (
      !productHasSizes &&
      selectedPrice === null &&
      typeof productFound?.price === "number"
    ) {
      setSelectedPrice(productFound.price);
    }
  }

  function findProductById() {
    if (productsList == null) {
      return null;
    }
    const foundProduct = productsList.find(
      (product: any) => product.id === productId
    );
    if (typeof foundProduct === "object") {
      return foundProduct;
    }

    return null;
  }

  function findIfProductIsSoldOut() {
    // productSoldOut

    if (selectedSize !== null) {
      const itemsAvailableNumber =
        typeof selectedSize.sizeValue.numberItemsAvailable === "string"
          ? parseInt(selectedSize.sizeValue.numberItemsAvailable.trim())
          : selectedSize.sizeValue.numberItemsAvailable;

      if (itemsAvailableNumber > 0) {
        return false;
      }

      return true;
    }

    if (productFound?.numberItemsAvailable != null) {
      const itemsAvailableNumber =
        typeof productFound.numberItemsAvailable === "string"
          ? parseInt(productFound.numberItemsAvailable.trim())
          : productFound?.numberItemsAvailable;

      if (itemsAvailableNumber > 0) {
        return false;
      }

      return true;
    }

    return false;
  }

  const returnFitCurrencyIcon = () => {
    const iconsList: { [key: string]: any } = {
      euro: <EuroRoundedIcon fontSize="medium" />,
      dollar: <DollarRoundedIcon fontSize="medium" />,
    };
    return iconsList[productsSelectedCurrency];
  };

  console.log(
    "my found product is",
    productFound,
    "bruhhh",
    selectedPrice,
    "size",
    selectedSize
  );

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function formatSizeNameWithKey(sizeName: string) {
    const sizeIncludesUnderScore = sizeName.includes("_");
    if (sizeIncludesUnderScore) {
      const splitByUnderscore = sizeName.split("_");
      const joinedSize =
        splitByUnderscore[0].toUpperCase() + "-" + splitByUnderscore[1];

      return joinedSize;
    }

    return capitalizeFirstLetter(sizeName);
  }

  function getRandomItemFromArray(arrayList: any[]) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arrayList.length);

    // get random item
    const item = arrayList[randomIndex];

    return { item, indexAt: randomIndex };
  }

  function returnPriceAndSizeAutoSelected(productItemObject: any) {
    // this should return the number of  items available
    const productCurrencyList: string[] = productItemObject.productCurrencyList;

    const indexPriceForCurrentSelectedCurrencyByUser =
      productCurrencyList.findIndex(
        (currency) => currency === productItemObject
      );
    if (productItemObject.price !== null) {
      return {
        autoSelectedSize: null,
        correctPriceForSelectedCurrency: parseInt(productItemObject.price),
        numberItemsAvailable: productItemObject.numberItemsAvailable,
      };
    }
    if (
      productItemObject.price === null &&
      productItemObject.sizesAvailable !== null
    ) {
      const sizeAutoSelected: any = Object.entries(
        productItemObject.sizesAvailable
      )[0];

      if (sizeAutoSelected[1].price.includes(",")) {
        const splitedPrices = sizeAutoSelected[1].price.split(",");
        const correctPriceForSelectedCurrency = parseInt(
          splitedPrices[indexPriceForCurrentSelectedCurrencyByUser]
        );
        return {
          autoSelectedSize: sizeAutoSelected[0],
          correctPriceForSelectedCurrency,
          numberItemsAvailable: sizeAutoSelected[1].numberItemsAvailable,
        };
        //productsSelectedCurrency
      }

      return {
        autoSelectedSize: sizeAutoSelected[0],
        correctPriceForSelectedCurrency: parseInt(sizeAutoSelected[1].price),
        numberItemsAvailable: sizeAutoSelected[1].numberItemsAvailable,
      };
    }

    return {
      autoSelectedSize: null,
      correctPriceForSelectedCurrency: null,
      numberItemsAvailable: null,
    };
  }

  function createRecomendedProductsList() {
    // ProductItem
    if (productsList == null || productFound == null) {
      return [];
    }
    const copyProductList = [...productsList];

    const indexOfProduct = copyProductList.findIndex(
      (productObject: any) => productObject.id === productFound.id
    );

    copyProductList.splice(indexOfProduct, 1);

    const productListElements = [];

    // const addedProducts:{[productName:string]:number} = {}

    for (let i = 0; i < 4; i++) {
      const { indexAt, item } = getRandomItemFromArray(copyProductList);
      const {
        numberItemsAvailable,

        correctPriceForSelectedCurrency,
      } = returnPriceAndSizeAutoSelected(item);
      productListElements.push(
        <ProductItem
          key={"recomendedProduct" + useId + i}
          correctPriceForSelectedCurrency={correctPriceForSelectedCurrency}
          numberItemsAvailable={numberItemsAvailable}
          selectedCurrency={productsSelectedCurrency}
          productPropertiesValues={item}
        />
      );
      copyProductList.splice(indexAt, 1);
    }

    return productListElements;
  }

  return (
    <div className="product-page-container bg-[#25c3c8]">
      {productFound != null && (
        <div className="product-exists ">
          <div className="product-page__header flex gap-2 items-center p-8">
            <div className="bread flex gap-2 items-center  ">
              <div className="font-sans text-[#1D4D4F]">Home</div>
              <div className="font-sans text-[#1D4D4F]">/</div>
              <div className="text-[15px] font-sans">
                {productFound.productName}
              </div>
            </div>
          </div>
          <div className="product-details-container flex gap-14 px-[9%] pb-20 pt-10">
            <div className="image-showcase-container w-[50%]">
              {productFound.picturesURL.length <= 1 && (
                <img src={productFound.picturesURL[0]} alt="" />
              )}
              {productFound.picturesURL.length > 1 && (
                <ProductImageShowcase imageListURL={productFound.picturesURL} />
              )}
            </div>
            <div className="product-details w-[43%]">
              <div className="product-title-container">
                <div className="product-title text-[1.7rem] tracking-tight">
                  {productFound.productName}
                </div>
              </div>
              <div className="price-and-stock-details border-b border-[#17888c] pb-7 flex items-center gap-4 mt-4">
                <div className="price-container flex gap-2 items-center">
                  <div className="price-currency ">
                    {returnFitCurrencyIcon()}
                  </div>
                  <div className="price-number font-sans text-[1.8rem]">
                    {selectedPrice}
                  </div>
                </div>
                <div className="stock-details-list-tags flex flex-wrap gap-4">
                  {productFound.preorder != null &&
                    productFound.preorder === true && (
                      <div className="preorder bg-black text-white p-1 font-sans font-normal">
                        Preorder
                      </div>
                    )}
                  {productFound.limited != null &&
                    productFound.limited === true && (
                      <div className="limited bg-black text-white p-1 font-sans font-normal">
                        Limited
                      </div>
                    )}
                  {productSoldOut && (
                    <div className="sold-out bg-black text-white p-1 font-sans font-normal">
                      Sold out
                    </div>
                  )}
                </div>
              </div>

              {selectedSize !== null && (
                <div className="sizes-available-container mt-8">
                  <div className="selected-size-title flex gap-2">
                    <div className="size-pointer font-sans font-medium">
                      Size:
                    </div>
                    <div className="size-name-selected font-sans font-normal">
                      {formatSizeNameWithKey(selectedSize.sizeName)}
                    </div>
                  </div>
                  <div className="sizes-tabs-list-container flex gap-2 flex-wrap mt-2">
                    {sizesList !== null &&
                      sizesList.map(
                        (
                          [sizeNameItem, sizeItemObjectValue]: any,
                          sizesIndex: number
                        ) => {
                          const sizeSelectedClass =
                            sizeNameItem === selectedSize.sizeName
                              ? "bg-white border-2 border-black font-medium"
                              : "border border-[#17888c]";
                          return (
                            <div
                              key={"sizes" + sizesIndex + useId}
                              className={`size-item font-sans cursor-pointer p-5 ${sizeSelectedClass}`}
                              onClick={() => {
                                addASelectedPriceAndSize({
                                  newSizeObject: {
                                    sizeName: sizeNameItem,
                                    sizeValue: sizeItemObjectValue,
                                  },
                                });
                              }}
                            >
                              {formatSizeNameWithKey(sizeNameItem)}
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              )}
              <div className="quantity-container flex flex-col gap-4 mt-8">
                <div className="quantity-title font-sans font-medium">
                  Quantity:
                </div>
                <div className="quantity-counter w-[25%]">
                  <QuantitySelector setQuantityRef={setNewQuantity} />
                </div>
              </div>

              <div className="add-to-cart-action-button-contianer mt-14">
                <div
                  onClick={() => {
                    addProductSelectedToCart();
                  }}
                  className="product-action-button py-4 tracking-widest font-sans text-center font-semibold fill-animation login-button button-action text-white bg-[#E22F2F]"
                >
                  {loading && (
                    <div className="loading-icon-btn flex items-center justify-center">
                      <CircularProgress color="inherit" />
                    </div>
                  )}
                  {!loading && (
                    <div className="action-btn-text py-2">
                      {productFound?.preorder != null
                        ? "PREORDER"
                        : "ADD TO CART"}
                    </div>
                  )}
                </div>
              </div>
              {typeof errorMessage === "string" ? (
                <div className="error-message-container mt-8 bg-yellow-300 p-4">
                  <div className="error-message text-red-600 text-center">
                    Could not add the product to cart!
                  </div>
                </div>
              ) : (
                <div className="error-message-container-invisible invisible">
                  <div className="error-message">error placeholder</div>
                </div>
              )}

              {productFound?.listBenefits != null && (
                <div className="benefits-list mt-8 border-b border-[#17888c] pb-4">
                  <ul className="flex flex-col gap-4">
                    {productFound.listBenefits.map(
                      (benefitItem: string, benefitIndex: number) => {
                        return (
                          <li
                            className="benefit-item flex gap-1"
                            key={benefitIndex + useId + "benefitItem"}
                          >
                            <div className="before-dot">
                              <CheckSharpIcon fontSize="small" />
                            </div>
                            <div className="text font-sans font-normal text-[1.1rem]">
                              {benefitItem}
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="recommended-products bg-black text-[#23C0C5] pb-[2.7%]">
            <div className="title-container mb-8 pt-4">
              <div className="title text-center text-[2.7rem]">
                SELECTED FOR YOU
              </div>
            </div>
            <div className="recommended-products-list flex flex-wrap gap-6 justify-center ">
              {createRecomendedProductsList()}
            </div>
          </div>
        </div>
      )}
      {productFound == null && (
        <div className="product-does-not-exists">Product does not exists</div>
      )}
    </div>
  );
};

export default ProductPage;
