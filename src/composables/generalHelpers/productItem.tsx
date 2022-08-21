import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToUserCart } from "../../api/dataBaseCartMethods";
import { addProductToCart } from "../../store/cart";

import {
  changeDrawerStateByDirectionId,
  changeDrawerTypeMenu,
} from "../../store/drawers";
import ImageWebp from "../../components/general-helpers/ImageWebp";

import AddIcon from "@mui/icons-material/Add";
import FitCurrencyIcon from "./FitCurrencyIcon";

// import {changeSelectedCurrency} from "../../store/productFiltersSearch"

interface ProductItemProps {
  addToCartButton?: any;
  customStyles?: string;
  customStylesDetailsContainer?: string;
  customStylesImageContainer?: string;
  productPropertiesValues: any;
  selectedCurrency: string;
  numberItemsAvailable: number;
  correctPriceForSelectedCurrency: any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  addToCartButton,
  productPropertiesValues,
  customStyles,
  customStylesDetailsContainer,
  customStylesImageContainer,
  selectedCurrency,
  numberItemsAvailable,
  correctPriceForSelectedCurrency,
}) => {
  const dispatch = useDispatch();

  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );
  const [loading, setLoading] = React.useState(false);

  const userObject = useSelector((state: any) => state.auth.user);

  // function returnPriceAndSizeAutoSelected() {
  //   // this should return the number of  items available
  //   const productCurrencyList: string[] =
  //     productPropertiesValues.productCurrencyList;

  //   const indexPriceForCurrentSelectedCurrencyByUser =
  //     productCurrencyList.findIndex(
  //       (currency) => currency === productsSelectedCurrency
  //     );
  //   if (productPropertiesValues.price !== null) {
  //     return {
  //       autoSelectedSize: null,
  //       correctPriceForSelectedCurrency: parseInt(
  //         productPropertiesValues.price
  //       ),
  //       numberItemsAvailable: productPropertiesValues.numberItemsAvailable,
  //     };
  //   }
  //   if (
  //     productPropertiesValues.price === null &&
  //     productPropertiesValues.sizesAvailable !== null
  //   ) {
  //     const sizeAutoSelected: any = Object.entries(
  //       productPropertiesValues.sizesAvailable
  //     )[0];

  //     if (sizeAutoSelected[1].price.includes(",")) {
  //       const splitedPrices = sizeAutoSelected[1].price.split(",");
  //       const correctPriceForSelectedCurrency = parseInt(
  //         splitedPrices[indexPriceForCurrentSelectedCurrencyByUser]
  //       );
  //       return {
  //         autoSelectedSize: sizeAutoSelected[0],
  //         correctPriceForSelectedCurrency,
  //         numberItemsAvailable: sizeAutoSelected[1].numberItemsAvailable,
  //       };
  //       //productsSelectedCurrency
  //     }

  //     return {
  //       autoSelectedSize: sizeAutoSelected[0],
  //       correctPriceForSelectedCurrency: parseInt(sizeAutoSelected[1].price),
  //       numberItemsAvailable: sizeAutoSelected[1].numberItemsAvailable,
  //     };
  //   }

  //   return {
  //     autoSelectedSize: null,
  //     correctPriceForSelectedCurrency: null,
  //     numberItemsAvailable: null,
  //   };
  // }

  // const {
  //   numberItemsAvailable,
  //   autoSelectedSize, // no need for this one actually there are the same pictures for all sizes
  //   correctPriceForSelectedCurrency,
  // } = returnPriceAndSizeAutoSelected();

  async function addProductSelectedToCart() {
    // set error message if there was any error
    if (loading) {
      return;
    }
    setLoading(true);

    const productToAddToCart = {
      quantity: 1,
      sizeSelected: null,
      ...productPropertiesValues,
    };
    if (userObject?.uid != null) {
      // user is  logged in
      console.log("remember to  fetch the user object from users");
      const { error, message } = await addToUserCart({
        userUid: userObject.uid,
        userCurrentCart: [],
        productObject: productToAddToCart,
      });

      if (error) {
        // here you can set a popover to show an error
        setLoading(false);
      }

      dispatch(
        changeDrawerStateByDirectionId({
          direction: "right",
          newStatus: true,
        })
      );

      dispatch(changeDrawerTypeMenu({ menuTypeSelected: "cart" }));
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

    dispatch(changeDrawerTypeMenu({ menuTypeSelected: "cart" }));
  }

  // calculate the price by the selected quantity and make it posibble to change the quantity // left here !!!!!

  return (
    <div
      className={`product-item ${
        customStyles != null ? customStyles : " w-[22%] my-2"
      }`}
    >
      <Link
        onClick={() => {
          dispatch(
            changeDrawerStateByDirectionId({
              direction: "right",
              newStatus: false,
            })
          );
        }}
        to={`/dance-gavin-dance-edyego-clone/products/${productPropertiesValues.id}`}
        className={`hero-container ${
          customStylesImageContainer != null ? customStylesImageContainer : ""
        }`}
      >
        <div className="relative image-container">
          <div className="figure">
            <ImageWebp
              className="image-main"
              srcWebp={productPropertiesValues.picturesURL[0]}
              src={productPropertiesValues.picturesURL[0]}
              //   width="225"
              //   height="auto"
            />

            {productPropertiesValues.picturesURL[1] != null && (
              <ImageWebp
                className="image-hover"
                srcWebp={productPropertiesValues.picturesURL[1]}
                src={productPropertiesValues.picturesURL[0]}
              />
            )}
            {productPropertiesValues?.preorder != null &&
              productPropertiesValues.preorder === true && (
                <div className="preorder absolute top-[3%] left-[3%] p-1 bg-[#22BDC3] text-white font-sans font-medium">
                  PREORDER
                </div>
              )}

            {numberItemsAvailable != null && numberItemsAvailable <= 0 && (
              <div className="sold-out absolute top-[14%] left-[3%] p-1 bg-[#1A1A1A] text-white font-sans font-medium">
                SOLD OUT
              </div>
            )}

            {productPropertiesValues?.limited != null &&
              productPropertiesValues.limited === true && (
                <div className="preorder absolute tracking-wider top-[3%] right-[3%] border border-gray-500 p-1 bg-[#BF1E1F] text-white font-sans font-medium">
                  LIMITED
                </div>
              )}
          </div>
        </div>
      </Link>
      <div
        className={`pt-5 text-center product-details-container ${
          customStylesDetailsContainer != null
            ? customStylesDetailsContainer
            : ""
        }`}
      >
        <Link
          onClick={() => {
            dispatch(
              changeDrawerStateByDirectionId({
                direction: "right",
                newStatus: false,
              })
            );
          }}
          to={`/dance-gavin-dance-edyego-clone/products/${productPropertiesValues.id}`}
          className="my-5 font-sans font-bold tracking-wider title-container"
        >
          {productPropertiesValues.productName}
        </Link>
        <Link
          onClick={() => {
            dispatch(
              changeDrawerStateByDirectionId({
                direction: "right",
                newStatus: false,
              })
            );
          }}
          to={`/dance-gavin-dance-edyego-clone/products/${productPropertiesValues.id}`}
          className="flex items-center justify-center gap-2 mt-2 price-container"
        >
          <FitCurrencyIcon
            productsSelectedCurrency={productsSelectedCurrency}
          />
          <div className="font-sans price-number">
            {correctPriceForSelectedCurrency}
          </div>
        </Link>

        {addToCartButton != null &&
          productPropertiesValues?.sizesAvailable == null && (
            <div className="flex items-center justify-center pt-4 quik-add-to-cart-container">
              <div
                className="flex items-center gap-1 p-4 quik-add-to-cart-button fill-animation login-button button-action"
                style={addToCartButton}
                onClick={() => {
                  addProductSelectedToCart();
                }}
              >
                <AddIcon fontSize="small" />
                <div className="text-btn">ADD TO CART</div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

// price for now is only in euro
export default ProductItem;
