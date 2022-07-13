import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import ProductItem from "../composables/generalHelpers/productItem";
interface ClientHomeProps {}

const ClientHome: React.FC<ClientHomeProps> = () => {
  const productsList = useSelector((state: any) => state.products.productsList);
  const selectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );
  console.log(
    "my product list is ",
    productsList,
    "and selected",
    selectedCurrency
  );
  return (
    <div className="container-home bg-[#E84A42] py-4">
      <section className="hero-section-contianer text-white flex justify-center items-center ">
        <div className="hero-titles-container text-center flex flex-col gap-7 ">
          <div className="hero-titles__first-title tracking-widest">
            OUT EVERYWHERE
          </div>
          <h1 className="hero-titles__second-second-title text-4xl">
            JACKPOT JUICER
          </h1>
        </div>
      </section>

      <section className="albums-list text-[#F9F175] ">
        {/*  bg-[#25c3c8] */}
        <div className="title-container my-14">
          <div className="title text-center text-[42px]">JACKPOT JUICER</div>
        </div>
        <div className="albums-list-container flex flex-wrap  justify-evenly">
          {productsList != null &&
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
            })}
        </div>
        <Link
          to="collections/dance-gavin-dance"
          className="shop-all-button-container flex justify-center items-center"
        >
          <div className="shop-all-button text-[#F9F175] bg-[#1E1E1E] p-5 my-14 tracking-wider">
            SHOP ALL MERCH
          </div>
        </Link>
      </section>

      {/* <section className="current-album-preorders">
        <div className="current-album-preorders__title">
          JACKPOT JUICER PREORDERS
        </div>
        <div className="current-album-preorders__pruduct-list"></div>
        <div className="current-album-preorders__action-link">
          <div className="button-lik-show-all-merch">SHOP ALL MERCH</div>
        </div>
      </section> */}
    </div>
  );
};

export default ClientHome;
