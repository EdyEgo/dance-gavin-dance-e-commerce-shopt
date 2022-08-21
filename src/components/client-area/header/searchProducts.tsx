import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useId } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { changeDrawerStateByDirectionId } from "../../../store/drawers";
import ProductItem from "../../../composables/generalHelpers/productItem";

import Input from "@mui/material/Input";

interface SearchProductsProps {}

const SearchProducts: React.FC<SearchProductsProps> = () => {
  const dispatch = useDispatch();
  const useid = useId();
  const ariaLabel = { "aria-label": "description" };
  //   const[searchValue,setSearchValue] = useState("")

  const productsList = useSelector((state: any) => state.products.productsList);

  const selectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  console.log("all of my products", productsList);

  const searchValue = useRef("");
  const lastSearchTimeOut = useRef<any>(null);
  const searchRef = useRef<any>(null);

  const [foundProducts, setFoundProducts] = useState<null | any[]>(null);

  function setSearchValue(newSearchValue: string) {
    searchValue.current = newSearchValue;
  }

  function initSearchProducts(newSearchValue: string) {
    if (lastSearchTimeOut.current != null) {
      clearTimeout(lastSearchTimeOut.current);
    }
    setSearchValue(newSearchValue);
    lastSearchTimeOut.current = setTimeout(() => {
      // init search products in products list function if the user has stoppet typping
      initSearchProductsInProductsList();
    }, 1000);
  }

  function changeLeftDrawerState(newStatus: boolean, direction: string) {
    dispatch(
      changeDrawerStateByDirectionId({
        direction,
        newStatus,
      })
    );
  }

  function initSearchProductsInProductsList() {
    //searchValue
    const searchValueTrimed = searchValue.current.toLowerCase().trim();
    // lowerCase your category and product name search
    if (searchValueTrimed.length <= 0) {
      setFoundProducts(null);
      return;
    }

    const productsListFound: any[] = [];
    //  const productsIdsFound:{[productId:string]:boolean}  = {}

    productsList.forEach((productObject: any) => {
      const productNameLowercase = productObject.productName.toLowerCase();
      const productCategoryLowerCase =
        productObject.productCategory.toLowerCase();
      const productNameMatchesSearchValue =
        productNameLowercase.includes(searchValueTrimed);
      const productCategoryMatchesSearchValue =
        productCategoryLowerCase.includes(searchValueTrimed);

      if (productNameMatchesSearchValue || productCategoryMatchesSearchValue) {
        // const productWasAlreadyFound = Object.hasOwn(productsIdsFound,productObject.id)
        productsListFound.push(productObject);
      }
    });

    setFoundProducts(productsListFound);
    // return productsListFound;
  }

  console.log("i have changed somehow", foundProducts);

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
        sold: productItemObject?.sold !== null ? productItemObject.sold : 0,
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
          sold:
            sizeAutoSelected[1]?.sold !== null ? sizeAutoSelected[1].sold : 0,
          numberItemsAvailable: sizeAutoSelected[1].numberItemsAvailable,
        };
        //productsSelectedCurrency
      }

      return {
        autoSelectedSize: sizeAutoSelected[0],
        correctPriceForSelectedCurrency: parseInt(sizeAutoSelected[1].price),
        sold: sizeAutoSelected[1]?.sold !== null ? sizeAutoSelected[1].sold : 0,
        numberItemsAvailable: sizeAutoSelected[1].numberItemsAvailable,
      };
    }

    return {
      autoSelectedSize: null,
      sold: null,
      correctPriceForSelectedCurrency: null,
      numberItemsAvailable: null,
    };
  }

  return (
    <div className="search-products-container">
      <div className="search-products__header border-[#21A5AA] border-b pb-2">
        <div className="content-container flex items-center gap-10">
          <div className="search flex gap-4 items-center px-10 py-5">
            <div className="icon-search-container">
              <SearchIcon />
            </div>
            <div className="search-input-container">
              <Input
                onChange={(event) => {
                  initSearchProducts(event.target.value);
                }}
                inputRef={searchRef}
                className="text-[2rem]"
                sx={{ fontSize: "1.4rem" }}
                placeholder="What are you looking for?"
                inputProps={ariaLabel}
              />
            </div>
          </div>

          <div className="cursor-pointer close-cart-menu">
            <CloseOutlinedIcon
              onClick={() => {
                changeLeftDrawerState(false, "right");
              }}
            />
          </div>
        </div>
      </div>
      <div className="search-products__products-list ">
        <div className="products-title-container px-12 py-5 flex">
          <div className="title-product border-b-[0.2em] border-black tracking-widest">
            PRODUCTS
          </div>
        </div>

        <div className="products-list flex flex-col gap-4 items-center justify-center px-12 py-4">
          {foundProducts?.length != null && foundProducts.length <= 0 && (
            <div className="serach-result-empty flex flex-col justify-center items-center gap-8 mt-[40%]">
              <div className="first-title">No results could be found.</div>
              <div
                onClick={() => {
                  if (searchRef.current?.focus == null) {
                    return;
                  }

                  searchRef.current.focus();
                }}
                className="action-button p-5 text-white bg-[#E6433C] cursor-pointer login-button button-action fill-animation"
              >
                NEW SEARCH
              </div>
            </div>
          )}
          {foundProducts?.length != null &&
            foundProducts.length >= 1 &&
            foundProducts.map((productObject: any, index: number) => {
              const {
                numberItemsAvailable,
                sold,
                correctPriceForSelectedCurrency,
              } = returnPriceAndSizeAutoSelected(productObject);

              return (
                <ProductItem
                  key={useid + "searchProducts" + index}
                  customStyles={"flex gap-4 items-center"}
                  customStylesDetailsContainer={"w-[50%]"}
                  customStylesImageContainer={"w-[30%]"}
                  correctPriceForSelectedCurrency={
                    correctPriceForSelectedCurrency
                  }
                  numberItemsAvailable={numberItemsAvailable}
                  selectedCurrency={selectedCurrency}
                  productPropertiesValues={productObject}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
