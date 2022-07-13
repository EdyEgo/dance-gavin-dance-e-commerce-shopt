import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageWebp from "../../components/general-helpers/ImageWebp";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import DollarRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

// import {changeSelectedCurrency} from "../../store/productFiltersSearch"

interface ProductItemProps {
  productPropertiesValues: any;
  selectedCurrency: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  productPropertiesValues,
  selectedCurrency,
}) => {
  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  function returnPriceAndSizeAutoSelected() {
    // this should return the number of  items available
    const productCurrencyList: string[] =
      productPropertiesValues.productCurrencyList;

    const indexPriceForCurrentSelectedCurrencyByUser =
      productCurrencyList.findIndex(
        (currency) => currency === productsSelectedCurrency
      );
    if (productPropertiesValues.price !== null) {
      return {
        autoSelectedSize: null,
        correctPriceForSelectedCurrency: parseInt(
          productPropertiesValues.price
        ),
        numberItemsAvailable: productPropertiesValues.numberItemsAvailable,
      };
    }
    if (
      productPropertiesValues.price === null &&
      productPropertiesValues.sizesAvailable !== null
    ) {
      const sizeAutoSelected: any = Object.entries(
        productPropertiesValues.sizesAvailable
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

  const returnFitCurrencyIcon = () => {
    const iconsList: { [key: string]: any } = {
      euro: <EuroRoundedIcon fontSize="small" />,
      dollar: <DollarRoundedIcon fontSize="small" />,
    };
    return iconsList[productsSelectedCurrency];
  };

  const {
    numberItemsAvailable,
    autoSelectedSize, // no need for this one actually there are the same pictures for all sizes
    correctPriceForSelectedCurrency,
  } = returnPriceAndSizeAutoSelected();

  return (
    <Link
      to={`/dance-gavin-dance-edyego-clone/products/${productPropertiesValues.id}`}
      className="product-item w-[22%] my-2"
    >
      <div className="hero-container ">
        <div className="image-container relative">
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
      </div>
      <div className="product-details-container text-center">
        <div className="title-container my-5 font-sans font-bold tracking-wider">
          {productPropertiesValues.productName}
        </div>
        <div className="price-container flex gap-2 items-center justify-center mt-2">
          {/* <div className="currency flex items-center"> */}
          {returnFitCurrencyIcon()}
          {/* </div> */}
          <div className="price-number font-sans">
            {correctPriceForSelectedCurrency}
          </div>
        </div>
      </div>
    </Link>
  );
};

// price for now is only in euro
export default ProductItem;
