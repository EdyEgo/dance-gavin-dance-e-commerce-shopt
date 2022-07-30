import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";

import ImageWebp from "../components/general-helpers/ImageWebp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import DollarRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import QuantitySelector from "../composables/generalHelpers/productQuantitySelector";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const useId = React.useId();

  const productId = params?.productId;

  const productsList = useSelector((state: any) => state.products.productsList);

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

  function setNewQuantity(newQuantityValue: number) {
    selectedQuantity.current = newQuantityValue;
  }

  const productSoldOut = findIfProductIsSoldOut();

  React.useEffect(() => {
    addASelectedPriceAndSize();
    selectedQuantity.current = 1;
  }, []);

  const productHasSizes = Object.hasOwn(productFound, "sizesAvailable");
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
      euro: <EuroRoundedIcon fontSize="small" />,
      dollar: <DollarRoundedIcon fontSize="small" />,
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

  return (
    <div className="product-page-container bg-[#25c3c8]">
      {productFound != null && (
        <div className="product-exists">
          <div className="product-page__header flex gap-2 items-center ">
            <div className="bread flex gap-2 items-center  ">
              <div className="font-sans text-[#1D4D4F]">Home</div>
              <div className="font-sans text-[#1D4D4F]">/</div>
              <div className="text-[15px] font-sans">
                {productFound.productName}
              </div>
            </div>
          </div>
          <div className="product-details-container flex justify-between">
            <div className="product-image-showcase">
              <div className="image-list-select-container"></div>
              <div className="image-selected"></div>
            </div>
            <div className="product-details">
              <div className="product-title-container">
                <div className="product-title">{productFound.productName}</div>
              </div>
              <div className="price-and-stock-details border-b border-[#23AAAF] pb-7">
                <div className="price-container flex gap-2 items-center">
                  <div className="price-currency ">
                    {returnFitCurrencyIcon()}
                  </div>
                  <div className="price-number font-sans">{selectedPrice}</div>
                </div>
                <div className="stock-details-list-tags flex flex-wrap gap-4">
                  {productFound.preorder != null &&
                    productFound.preorder === true && (
                      <div className="preorder bg-black text-white p-1 font-sans font-medium">
                        Preorder
                      </div>
                    )}
                  {productFound.limited != null &&
                    productFound.limited === true && (
                      <div className="limited bg-black text-white p-1 font-sans font-medium">
                        Limited
                      </div>
                    )}
                  {productSoldOut && (
                    <div className="sold-out bg-black text-white p-1 font-sans font-medium">
                      Sold out
                    </div>
                  )}
                </div>
              </div>

              {selectedSize !== null && (
                <div className="sizes-available-container">
                  <div className="selected-size-title flex gap-2">
                    <div className="size-pointer font-sans">Size:</div>
                    <div className="size-name-selected font-sans">
                      {formatSizeNameWithKey(selectedSize.sizeName)}
                    </div>
                  </div>
                  <div className="sizes-tabs-list-container flex gap-2 flex-wrap">
                    {sizesList !== null &&
                      sizesList.map(
                        ([sizeNameItem, sizeItemObjectValue]: any) => {
                          const sizeSelectedClass =
                            sizeNameItem === selectedSize.sizeName
                              ? "bg-white border border-black font-medium"
                              : "border border-[#23AAAF]";
                          return (
                            <div
                              className={`size-item font-sans cursor-pointer p-4 ${sizeSelectedClass}`}
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
              <div className="quantity-container flex flex-col gap-2">
                <div className="quantity-title">Quantity:</div>
                <div className="quantity-counter w-[70%]">
                  <QuantitySelector setQuantityRef={setNewQuantity} />
                </div>
              </div>

              <div className="add-to-cart-action-button-contianer">
                <div className="product-action-button font-sans text-center font-semibold fill-animation login-button button-action text-white bg-[#E22F2F]">
                  {productFound?.preorder != null ? "PREORDER" : "ADD TO CART"}
                </div>
              </div>

              {productFound?.listBenefits != null && (
                <div className="benefits-list ">
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
        </div>
      )}
      {productFound == null && (
        <div className="product-does-not-exists">Product does not exists</div>
      )}
    </div>
  );
};

export default ProductPage;
