import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {} from "../../api/dataBaseCartMethods"; // add a delete method
import {
  removeProductFromCart,
  changeProductQuantityByIndex,
} from "../../store/cart"; // add a delete method
// import ImageWebp from "../../components/general-helpers/ImageWebp";

import {
  changeDrawerStateByDirectionId,
  // changeDrawerTypeMenu,
} from "../../store/drawers";

import FitCurrencyIcon from "../generalHelpers/FitCurrencyIcon";

import QuantitySelector from "./productQuantitySelector"; // add maxim to add , show a title if the maximum to add is met

interface ProductItemCartProps {
  hideActionsContainer?: true;
  imageStyles?: string;
  imageTagStyles?: string;
  showQuantityOnPictureStylesClasses?: any;
  productAdded: any;
  productCartIndex: number;
}

const ProductItemCart: React.FC<ProductItemCartProps> = ({
  hideActionsContainer,
  imageStyles,
  imageTagStyles,
  showQuantityOnPictureStylesClasses,
  productAdded,
  productCartIndex,
}) => {
  // here is the issue

  const dispatch = useDispatch();

  // removeProductFromCart
  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  //   const cartProductQuantityRef = React.useRef(productAdded.quantity);

  const { numberItemsAvailable, sizeNameTitle } =
    returnProductSelectedPriceAndAvaiabilityNumbers();

  function setQuantityByProductIndex(newQuantity: number) {
    dispatch(
      changeProductQuantityByIndex({
        productIndex: productCartIndex,
        newQuantity,
      })
    );
  }

  //   const userObject = useSelector((state: any) => state.auth.user);

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function returnProductSelectedPriceAndAvaiabilityNumbers() {
    if (productAdded?.sizeSelected != null) {
      const { sizeName, sizeValue } = productAdded.sizeSelected;
      const sizeNameSplit = sizeName.includes("_")
        ? sizeName.split("_").join("-")
        : sizeName;
      const formatSizeName = capitalizeFirstLetter(sizeNameSplit);

      const price = sizeValue.price.includes(",")
        ? parseInt(sizeValue.price.split(",")[0])
        : parseInt(sizeValue.price);

      const numberItemsAvailable = parseInt(sizeValue.numberItemsAvailable);

      return { sizeNameTitle: formatSizeName, price, numberItemsAvailable };
    }
    const numberItemsAvailable = parseInt(productAdded.numberItemsAvailable);
    if (typeof productAdded.price === "string") {
      const price = productAdded.price.includes(",")
        ? parseInt(productAdded.price.split(",")[0])
        : parseInt(productAdded.price);

      return {
        price,
        numberItemsAvailable,
      };
    }

    return {
      price: productAdded.price,
      numberItemsAvailable,
    };
  }

  function changeLeftDrawerState(newStatus: boolean, direction: string) {
    dispatch(
      changeDrawerStateByDirectionId({
        direction,
        newStatus,
      })
    );
  }

  return (
    <div className="product-item-cart-container bg-[#22BDC3] flex gap-3 justify-between">
      <div
        className={`cart-product-image ${
          imageStyles != null ? imageStyles : "w-[20%]"
        }`}
      >
        <Link
          onClick={() => {
            changeLeftDrawerState(false, "right");
          }}
          to={`/dance-gavin-dance-edyego-clone/products/${productAdded.id}`}
          className="h-full w-full relative"
        >
          {/* <ImageWebp
              className="image-main"
              srcWebp={productAdded.picturesURL[0]}
              src={productAdded.picturesURL[0]}
              height={"auto"}
            /> */}
          <img
            src={productAdded.picturesURL[0]}
            alt=""
            className={`object-cover h-full w-full  ${
              imageTagStyles != null ? imageTagStyles : ""
            }`}
          />
          {showQuantityOnPictureStylesClasses != null && (
            <div
              className={`quantity-on-picture  ${showQuantityOnPictureStylesClasses}`}
            >
              {productAdded.quantity}
            </div>
          )}
        </Link>
      </div>
      <div className="cart-product-details w-[50%] flex flex-col gap-2">
        <Link
          onClick={() => {
            changeLeftDrawerState(false, "right");
          }}
          className="cart-product-name-title font-sans font-medium text-[0.8rem]"
          to={`/dance-gavin-dance-edyego-clone/products/${productAdded.id}`}
        >
          {productAdded.productName}
        </Link>

        {sizeNameTitle != null && (
          <div className="cart-product-size-selected">
            <div className="size-selected font-sans font-normal">
              {sizeNameTitle}
            </div>
          </div>
        )}
        {hideActionsContainer == null && (
          <div className="cart-product-actions-container flex gap-4 pt-2">
            <div className="cart-product-quantity-selector w-[40%]">
              <QuantitySelector
                customStyleing=" p-1 border border-[#17888c]"
                currentQuantity={productAdded.quantity}
                setQuantityRef={setQuantityByProductIndex}
                maximQuantityAvailable={numberItemsAvailable}
              />
            </div>
            <div className="cart-product-remove flex justify-center items-center">
              <div
                onClick={() => {
                  dispatch(
                    removeProductFromCart({ productIndex: productCartIndex })
                  );
                }}
                className="text-[0.8rem] font-sans font-bold remove  border-b border-gray-400 text-gray-600 cursor-pointer hover:text-gray-500 transition-all duration-100"
              >
                Remove
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="cart-product-price flex items-start w-[20%]">
        <div className="price flex items-center gap-1 justify-center">
          <FitCurrencyIcon
            productsSelectedCurrency={productsSelectedCurrency}
          />

          <div className="price-number font-sans font-medium">
            {productAdded.totalQuantityPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemCart;
