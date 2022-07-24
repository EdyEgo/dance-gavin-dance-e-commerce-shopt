import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addFilteredProducts,
  resetAppliedFilters,
  changeSortBy,
  changeAvailabilitySelected,
  changePriceRangeNumberSelected,
  changeProductTypeFiltersSelected,
  changeSizeFiltersSelected,
  addAvailabilitySelected,
  addPriceRangeNumberSelected,
  addPriceRangeAvailableToSelect,
  addProductTypeFiltersSelected,
  addSizeFiltersSelected,
} from "../store/productFiltersSearch";

import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import DollarRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ProductItem from "../composables/generalHelpers/productItem";
import AccordionList from "../composables/generalHelpers/accordionList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import DashBoard from "../composables/generalHelpers/dashBoard";
import ClearIcon from "@mui/icons-material/Clear";
import ProductListByFilter from "../composables/pages/filteredProductsPage/ProductsListByFilter";
import {
  productsAvailableFilters,
  findFitFilteringType,
} from "../composables/generalHelpers/filterProductsByDetails";

interface FilteredProductsPageProps {}

const FilteredProductsPage: React.FC<FilteredProductsPageProps> = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const useId = React.useId();

  const selectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const sortBySelectedValues = useSelector(
    (state: any) => state.productFiltersSearch.sortBy
  );
  const productsList = useSelector((state: any) => state.products.productsList);

  const filteredProducts: any = useSelector(
    (state: any) => state.productFiltersSearch.filteredProducts
  );

  const appliedFilters: any = useSelector(
    (state: any) => state.productFiltersSearch.appliedFilters
  );

  const priceRangeAvailable = useSelector(
    (state: any) => state.productFiltersSearch.priceRangeAvailableToSelect
  );

  const priceRangeSelected = useSelector(
    (state: any) => state.productFiltersSearch.priceRangeNumberSelected
  );

  const titleUpperCase = extractParamsCollectionType();

  const sortByAnchorTitleRef = React.useRef(null);

  const [openSortByStatus, setOpenSortByStatus] = React.useState(false);

  useEffect(() => {
    dispatch(resetAppliedFilters());

    const {
      availabilityOptions,
      priceRange,
      productTypeOptions,
      sizeOptions,
      filteredProducts,
    } = productsAvailableFilters(productFilterType, productsList);
    // return the number of products too mate

    dispatch(changePriceRangeNumberSelected({ newPriceRange: priceRange }));

    dispatch(addFilteredProducts(filteredProducts));

    dispatch(addAvailabilitySelected(availabilityOptions));
    dispatch(addPriceRangeNumberSelected(priceRange));
    dispatch(addPriceRangeAvailableToSelect(priceRange));

    dispatch(addProductTypeFiltersSelected(productTypeOptions));

    dispatch(addSizeFiltersSelected(sizeOptions));
  }, []);

  function extractParamsCollectionType() {
    if (params?.collectionType == null) return null;

    if (params.collectionType.includes("-")) {
      return params.collectionType.toUpperCase().split("-").join(" ");
    }
    return params.collectionType.toUpperCase();
  }

  const sortByOptions = [
    {
      name: "Featured",
      type: "featured",
    },
    {
      name: "Best selling",
      type: "bestSelling",
    },
    {
      name: "Alphabetically, A-Z",
      type: "fromAtoZ",
    },
    {
      name: "Alphabetically, Z-A",
      type: "fromZtoA",
    },
    {
      name: "Price, low to high",
      type: "fromLowtoHigh",
    },
    {
      name: "Price, high to low",
      type: "fromHightoLow",
    },
    {
      name: "Date, old to new",
      type: "fromOldtoNew",
    },
    {
      name: "Date, new to old",
      type: "fromNewtoOld",
    },
  ];

  const productFilterType =
    params?.collectionType != null
      ? findFitFilteringType(params?.collectionType)
      : "all";

  function cancelFilterByTabData(filterNameSelected: any, type: any) {
    const types: { [key: string]: () => void } = {
      availability: () => {
        const availabilityTypes: { [key: string]: () => void } = {
          inStock: () => {
            dispatch(
              changeAvailabilitySelected({
                type: "inStock",
                newValue: !filterNameSelected.selected,
              })
            );
          },
          outOfStock: () => {
            dispatch(
              changeAvailabilitySelected({
                type: "outOfStock",
                newValue: !filterNameSelected.selected,
              })
            );
          },
        };
        availabilityTypes[filterNameSelected.typeSelected]();
      },
      size: () => {
        dispatch(
          changeSizeFiltersSelected({
            productTypeName: filterNameSelected.name,
            productTypeNewValue: !filterNameSelected.selected,
          })
        );
      },
      productType: () => {
        dispatch(
          changeProductTypeFiltersSelected({
            productTypeName: filterNameSelected.name,
            productTypeNewValue: !filterNameSelected.selected,
          })
        );
      },
    };

    types[type]();
  }

  function productObjectPassesAllFilters(productItemObject: any) {
    // appliedFilters

    const passesByFiltersCategories: { [key: string]: any } = {
      availability: true,
      size: true,
      price: true,
      productType: true,
    };

    // const priceRangeFit: { maxFit: boolean; minFit: boolean } = {
    //   maxFit: false,
    //   minFit: false,
    // };

    if (appliedFilters.availability.list.length > 0) {
      //numberItemsAvailable , if null and has size search for the first positive number of items
    }
    if (appliedFilters.size.list.length > 0) {
      passesByFiltersCategories.size = false;

      const productHasSizes = Object.hasOwn(
        productItemObject,
        "sizesAvailable"
      );

      if (!productHasSizes) {
        return false;
      }

      const enteriesProductSizes = Object.entries(
        productItemObject.sizesAvailable
      );

      // let hasIncludeASizeBefore: null | boolean = null;

      for (const [sizeName, sizeValueObject] of enteriesProductSizes) {
        let objectValue: any = sizeValueObject;

        // const numberOfSize = parseInt(objectValue.numberItemsAvailable)

        // const priceNumber = parseInt(objectValue.price);

        // if (priceNumber <= priceRangSelected[1]) {
        //   priceRangeFit.maxFit = true;
        // }

        // if (priceNumber >= priceRangSelected[0]) {
        //   priceRangeFit.minFit = true;
        // }

        const listIncludesSize = appliedFilters.size.list.findIndex(
          (itemObject: any) => {
            if (itemObject.name.trim() === sizeName.trim()) {
              return true;
            }
          }
        );
        const includesSize = listIncludesSize !== -1;
        if (includesSize) {
          passesByFiltersCategories.size = true;
          break;
        }
        //   if (includesSize === true) {
        //     hasIncludeASizeBefore = true;
        //   }

        //   if (hasIncludeASizeBefore === null) {
        //     // gurad so the included size to remain
        //     passesByFiltersCategories.size = includesSize;
        //   }
      }
    }

    // better make an showned price on the product object

    // if (
    //   productItemObject.price != null &&
    //   productItemObject?.sizesAvailable == null
    // ) {
    //   const fitMax = productItemObject.price <= priceRangSelected[1];
    //   const fitMin = productItemObject.price >= priceRangSelected[0];

    //   priceRangeFit.maxFit = fitMax;
    //   priceRangeFit.minFit = fitMin;
    // }

    if (appliedFilters.productType.list.length > 0) {
      // productCategory
      const productItemIncludesCategory =
        appliedFilters.productType.list.findIndex((productTypeName: any) => {
          if (productTypeName.name === productItemObject.productCategory) {
            return true;
          }
        });

      passesByFiltersCategories.productType =
        productItemIncludesCategory !== -1;
    }

    // const productContainsACorrectPrice =
    //   priceRangeFit.maxFit === true || priceRangeFit.minFit === true;

    if (
      passesByFiltersCategories.availability === false ||
      passesByFiltersCategories.size === false ||
      passesByFiltersCategories.price === false ||
      passesByFiltersCategories.productType === false
      // ||
      // productContainsACorrectPrice === false
    ) {
      return false;
    }

    return true;
  }

  const returnFitCurrencyIcon = () => {
    const iconsList: { [key: string]: any } = {
      euro: <EuroRoundedIcon fontSize="small" />,
      dollar: <DollarRoundedIcon fontSize="small" />,
    };
    return iconsList[selectedCurrency];
  };

  const displayPriceFilterSelected =
    priceRangeSelected[0] !== priceRangeAvailable[0] ||
    priceRangeSelected[1] !== priceRangeAvailable[1];

  console.log("filtered products", filteredProducts);

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
    <div className="filtered-products-page bg-[#25c3c8]">
      <div className="bread-container p-8">
        <div className="bread flex gap-2 items-center  ">
          <div className="font-sans text-[#1D4D4F]">Home</div>
          <div className="font-sans text-[#1D4D4F]">/</div>
          <div className="text-[15px] font-sans">{titleUpperCase}</div>
        </div>
      </div>
      <div className="title text-center text-[45px] my-8 font-bold">
        {titleUpperCase}
      </div>
      <div className="content-filtered-container flex p-11 gap-8">
        <div className="filters-container w-[20%]">
          <div className="filters-title">FILTERS</div>
          <div className="accordions-filtcorrectPriceForSelectedCurrencyers-list">
            <div className="applied-filters flex flex-col gap-4 p-2 ">
              {displayPriceFilterSelected && (
                <div className="filter-item flex gap-2 items-center bg-[#1fafb4] p-4 ">
                  <div
                    className="cancel-filter cursor-pointer"
                    onClick={() => {
                      // make the selected price be equal with the available price
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </div>
                  <div className="filter-item__details flex gap-1">
                    <div className="name-filter font-sans">Price:</div>
                    {/* <div className="space-between font-sans">:</div> */}
                    <div className="filter-selected font-sans flex gap-2">
                      <div className="min-price flex gap-2">
                        <div className="currency">
                          {returnFitCurrencyIcon()}
                        </div>
                        <div className="price-number font-sans">
                          {priceRangeSelected[0]}
                        </div>
                      </div>
                      <div className="line-between-range">-</div>
                      <div className="max-range flex gap-2">
                        <div className="currency">
                          {returnFitCurrencyIcon()}
                        </div>
                        <div className="price-number font-sans">
                          {priceRangeSelected[1]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {appliedFilters != null &&
                Object.entries(appliedFilters).map(
                  ([nameFilter, valueFilter]: any, index) => {
                    return valueFilter.list.map(
                      (filterNameSelected: any, indexValueFilter: number) => {
                        return (
                          <div
                            className="filter-item flex gap-2 items-center bg-[#1fafb4] p-4 "
                            key={
                              useId + index + "filter-item" + indexValueFilter
                            }
                          >
                            <div
                              className="cancel-filter cursor-pointer"
                              onClick={() => {
                                cancelFilterByTabData(
                                  filterNameSelected,
                                  nameFilter
                                );

                                // dispatch(
                                //   changeAppliedFilters({
                                //     filterName: nameFilter,
                                //     filterValue: filterNameSelected,
                                //   })
                                // );
                              }}
                            >
                              <ClearIcon fontSize="small" />
                            </div>
                            <div className="filter-item__details flex gap-1">
                              <div className="name-filter font-sans">
                                {filterNameSelected.typeSelected}:
                              </div>
                              {/* <div className="space-between font-sans">:</div> */}
                              <div className="filter-selected font-sans">
                                {filterNameSelected.name.includes("_")
                                  ? filterNameSelected.name.split("_").join(" ")
                                  : filterNameSelected.name}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    );
                  }
                )}
            </div>

            <div className="accordion-container">
              <AccordionList />
            </div>
          </div>
        </div>
        <div className="products-container  w-[80%]">
          <div className="filters-view-container">
            <div className="filters flex justify-between">
              <div className="total-products">
                {filteredProducts.length > 0 && (
                  <div className="contains-products flex gap-2 ">
                    <div className="font-sans">{filteredProducts.length}</div>
                    <div className="font-sans">
                      {filteredProducts.length > 1 ? "products" : "product"}
                    </div>
                  </div>
                )}

                {filteredProducts.length <= 0 && (
                  <div className="no-products flex gap-2">
                    <div className="font-sans">no</div>
                    <div className="font-sans">products</div>
                  </div>
                )}
              </div>
              <div className="filter-by-list flex gap-2 ">
                <div className="title text-gray-600 font-sans">Sort by</div>
                <div
                  className="selected-sort flex items-center cursor-pointer"
                  onClick={() => {
                    setOpenSortByStatus(true);
                  }}
                  ref={sortByAnchorTitleRef}
                >
                  <div className="name-sort font-sans">
                    {sortBySelectedValues.name}
                  </div>
                  <div className="carret-down ">
                    <ExpandMoreIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-list-container">
            {params?.collectionType != null && (
              <ProductListByFilter type={params.collectionType} />
            )}
            <div className="product-list flex flex-wrap gap-8  justify-evenly ">
              {filteredProducts.length != null &&
                filteredProducts.length > 0 &&
                filteredProducts.map((productItemObject: any) => {
                  const productPassesAllFilters =
                    productObjectPassesAllFilters(productItemObject);

                  // const productPassesPriceFilter =

                  if (!productPassesAllFilters) {
                    return "";
                  }

                  const {
                    numberItemsAvailable,

                    correctPriceForSelectedCurrency,
                  } = returnPriceAndSizeAutoSelected(productItemObject);

                  const fitMax =
                    correctPriceForSelectedCurrency != null &&
                    correctPriceForSelectedCurrency <= priceRangeSelected[1];
                  const fitMin =
                    correctPriceForSelectedCurrency != null &&
                    correctPriceForSelectedCurrency >= priceRangeSelected[0];
                  if (fitMax && fitMin) {
                    return (
                      <ProductItem
                        correctPriceForSelectedCurrency={
                          correctPriceForSelectedCurrency
                        }
                        numberItemsAvailable={numberItemsAvailable}
                        selectedCurrency={selectedCurrency}
                        productPropertiesValues={productItemObject}
                      />
                    );
                  }
                  return "";
                })}
            </div>
          </div>
        </div>
      </div>

      <DashBoard
        open={openSortByStatus}
        anchorRef={sortByAnchorTitleRef}
        setOpen={setOpenSortByStatus}
        children={sortByOptions.map(({ name, type }, index) => {
          return (
            <MenuItem
              key={useId + index}
              onClick={() => {
                dispatch(changeSortBy({ name, type }));
                setOpenSortByStatus(false);
              }}
            >
              <div className="option-name">{name}</div>
              {sortBySelectedValues.type === type && (
                <div className="option-checked">
                  <CheckIcon />
                </div>
              )}

              {sortBySelectedValues.type !== type && (
                <div className="option-checked invisible">
                  <CheckIcon />
                </div>
              )}
            </MenuItem>
          );
        })}
      />
    </div>
  );
};

export default FilteredProductsPage;
