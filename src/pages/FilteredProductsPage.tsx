import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeSortBy } from "../store/productFiltersSearch";
import AccordionList from "../composables/generalHelpers/accordionList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import DashBoard from "../composables/generalHelpers/dashBoard";

interface FilteredProductsPageProps {}

const FilteredProductsPage: React.FC<FilteredProductsPageProps> = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const useId = React.useId();

  const sortBySelectedValues = useSelector(
    (state: any) => state.productFiltersSearch.sortBy
  );

  const titleUpperCase = extractParamsCollectionType();

  const sortByAnchorTitleRef = React.useRef(null);

  const [openSortByStatus, setOpenSortByStatus] = React.useState(false);

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
      <div className="content-filtered-container flex p-11 ">
        <div className="filters-container w-[20%]">
          <div className="filters-title">FILTERS</div>
          <div className="accordions-filters-list">
            <AccordionList />
          </div>
        </div>
        <div className="products-container  w-[80%]">
          <div className="filters-view-container">
            <div className="filters flex justify-between">
              <div className="total-products">x number of products</div>
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
          <div className="product-list-container"></div>
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
