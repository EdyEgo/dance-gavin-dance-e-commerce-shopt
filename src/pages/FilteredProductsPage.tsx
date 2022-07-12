import { useParams } from "react-router-dom";
import AccordionList from "../composables/generalHelpers/accordionList";

interface FilteredProductsPageProps {}

const FilteredProductsPage: React.FC<FilteredProductsPageProps> = () => {
  const params = useParams();

  const titleUpperCase = extractParamsCollectionType();

  function extractParamsCollectionType() {
    if (params?.collectionType == null) return null;

    if (params.collectionType.includes("-")) {
      return params.collectionType.toUpperCase().split("-").join(" ");
    }
    return params.collectionType.toUpperCase();
  }

  console.log("my params are", params);

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
              <div className="filter-by-list">filter by drop down menu</div>
            </div>
          </div>
          <div className="product-list-container"></div>
        </div>
      </div>
    </div>
  );
};

export default FilteredProductsPage;
