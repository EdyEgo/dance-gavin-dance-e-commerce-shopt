import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../composables/generalHelpers/productItem";

interface SwanfestPageProps {}

const SwanfestPage: React.FC<SwanfestPageProps> = () => {
  const useid = React.useId();

  const dispatch = useDispatch();

  const selectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const productsList = useSelector((state: any) => state.products.productsList);

  function returnSwanfestProducts(type: "normal" | "merchSlider") {
    if (productsList == null || productsList.length <= 0) {
      return [];
    }
    // the slider is not really sorting by merch type but for now let it be this way
    const productListElements: any[] = [];
    for (
      let productIndex = 0;
      productIndex < productsList.length;
      productIndex++
    ) {
      const productItemObject = productsList[productIndex];
      if (productItemObject?.swanfest == null) {
        continue;
      }

      const {
        numberItemsAvailable,

        correctPriceForSelectedCurrency,
      } = returnPriceAndSizeAutoSelected(productItemObject);

      const productIsAbbleToBeAddedToCart =
        numberItemsAvailable >= 1
          ? { backgroundColor: "#E94B43", color: "white" }
          : null;
      productListElements.push(
        <ProductItem
          addToCartButton={productIsAbbleToBeAddedToCart}
          key={type + productIndex + useid}
          correctPriceForSelectedCurrency={correctPriceForSelectedCurrency}
          numberItemsAvailable={numberItemsAvailable}
          selectedCurrency={selectedCurrency}
          productPropertiesValues={productItemObject}
        />
      );
    }
    return productListElements;
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

  return (
    <div className="swanfest-page-container bg-[#28C9CE]">
      <div className="title-container py-14">
        <div className="title text-center text-[2.5rem] font-sans font-bold">
          SWANFEST MERCHANDISE
        </div>
      </div>
      <div className="flex flex-wrap px-16 albums-list-container justify-evenly pb-14">
        {/* {productsList != null &&
            productsList.length >= 1 &&
            // <ProductItem
            //   selectedCurrency={selectedCurrency}
            //   productPropertiesValues={productsList[0]}
            // />

            productsList.map((productItemObject: any) => {
              return (
                <ProductItem
                  selectedCurrency={selectedCurrency}
                  productPropertiesValues={productItemObject}
                />
              );
            })} */}
        {returnSwanfestProducts("normal")}
      </div>
    </div>
  );
};

export default SwanfestPage;
