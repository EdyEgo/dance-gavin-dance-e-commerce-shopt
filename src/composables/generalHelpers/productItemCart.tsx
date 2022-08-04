import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {} from "../../api/dataBaseCartMethods"; // add a delete method
import { removeProductFromCart } from "../../store/cart"; // add a delete method
import ImageWebp from "../../components/general-helpers/ImageWebp";

import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import DollarRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

import QuantitySelector from "./productQuantitySelector"; // add maxim to add , show a title if the maximum to add is met

interface ProductItemCartProps {
  productAdded: any;
  productCartIndex: number;
}

const ProductItemCart: React.FC<ProductItemCartProps> = ({
  productAdded,
  productCartIndex,
}) => {
  const dispatch = useDispatch();
  // removeProductFromCart
  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const cartProductQuantityRef = React.useRef(productAdded.quantity);

  const { numberItemsAvailable, price, sizeNameTitle } =
    returnProductSelectedPriceAndAvaiabilityNumbers();

  function setQuantityRef(newQuantity: number) {
    cartProductQuantityRef.current = newQuantity;
  }

  console.log("product added", productAdded);

  const userObject = useSelector((state: any) => state.auth.user);

  const returnFitCurrencyIcon = () => {
    const iconsList: { [key: string]: any } = {
      euro: <EuroRoundedIcon fontSize="small" />,
      dollar: <DollarRoundedIcon fontSize="small" />,
    };
    return iconsList[productsSelectedCurrency];
  };

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

  return (
    <div className="product-item-cart-container bg-[#22BDC3] flex gap-2 items-center justify-center">
      <div className="cart-product-image">
        <Link
          to={`/dance-gavin-dance-edyego-clone/products/${productAdded.id}`}
        >
          <ImageWebp
            className="image-main"
            srcWebp={productAdded.picturesURL[0]}
            src={productAdded.picturesURL[0]}
          />
        </Link>
      </div>
      <div className="cart-product-details">
        <div className="cart-product-name-title">
          {productAdded.productName}
        </div>
        {sizeNameTitle != null && (
          <div className="cart-product-size-selected">
            <div className="size-selected">{sizeNameTitle}</div>
          </div>
        )}
        <div className="cart-product-actions-container">
          <div className="cart-product-quantity-selector">
            <QuantitySelector
              setQuantityRef={setQuantityRef}
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
              className="remove  border-b border-gray-400 text-gray-600 cursor-pointer hover:text-gray-500 transition-all duration-100"
            >
              Remove
            </div>
          </div>
        </div>
      </div>
      <div className="cart-product-price flex items-start">
        <div className="price flex">
          <div className="price-currency">{returnFitCurrencyIcon()}</div>
          <div className="price-number">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemCart;
