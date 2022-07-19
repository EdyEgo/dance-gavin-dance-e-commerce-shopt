import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useState, useId } from "react";
import ProductItem from "../composables/generalHelpers/productItem";
import TabsList from "../composables/generalHelpers/tabsList";
import ItemsSlider from "../composables/generalHelpers/itemsSlider";
import AlbumSlider from "../composables/generalHelpers/albumsSlider";
import TourTable from "../composables/generalHelpers/tourTable";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Tab from "@mui/material/Tab";
interface ClientHomeProps {}

const ClientHome: React.FC<ClientHomeProps> = () => {
  const productsList = useSelector((state: any) => state.products.productsList);
  const selectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );
  const useid = useId();

  const allMerchList = {
    tees: {
      typeDatabaseName: "t-shirt",
      siteShowedName: "TEES",
      type: "tees",
    },
    outerwear: {
      typeDatabaseName: "Long Sleeve Shirt",
      siteShowedName: "OUTERWEAR",
      type: "outerwear",
    },
    accessories: {
      typeDatabaseName: "Misc. Accessory",
      siteShowedName: "ACCESSORIES",
      type: "accessories",
    },
  };

  // const albumsYearsList = {
  //   2020: {
  //     typeDatabaseName: "2020",
  //     siteShowedName: "2020",
  //     type: "2020",
  //   },
  //   "2020_sec": {
  //     typeDatabaseName: "2020",
  //     siteShowedName: "2020",
  //     type: "2020_sec",
  //   },
  //   2018: {
  //     typeDatabaseName: "2018",
  //     siteShowedName: "2018",
  //     type: "2018",
  //   },
  //   2016: {
  //     typeDatabaseName: "2016",
  //     siteShowedName: "2016",
  //     type: "2016",
  //   },
  //   2015: {
  //     typeDatabaseName: "2015",
  //     siteShowedName: "2015",
  //     type: "2015",
  //   },
  // };

  const [allMerchSelectedTab, setAllMerchSelectedTab] = useState("tees");

  function returnTwentyProducts() {
    if (productsList == null || productsList.length <= 0) {
      return [];
    }
    const productListElements: any[] = [];
    for (
      let productIndex = 0;
      productIndex < productsList.length;
      productIndex++
    ) {
      if (productIndex >= 21) {
        break;
      }
      const productItemObject = productsList[productIndex];
      productListElements.push(
        <ProductItem
          selectedCurrency={selectedCurrency}
          productPropertiesValues={productItemObject}
        />
      );
    }
    return productListElements;
  }

  return (
    <div className="container-home bg-[#E84A42] ">
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

      <section className="albums-list text-[#F9F175] px-12">
        {/*  bg-[#25c3c8] */}
        <div className="title-container my-14">
          <div className="title text-center text-[42px]">JACKPOT JUICER</div>
        </div>
        <div className="albums-list-container flex flex-wrap  justify-evenly">
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
          {returnTwentyProducts()}
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

      <section className="all-merch bg-[#25c3c8] text-black p-14">
        <div className="all-merch__title text-center">
          <div className="hero-titles__first-title tracking-widest text-[42px] ">
            ALL MERCH
          </div>
        </div>
        <div className="all-merch__tabs flex items-center justify-center my-12">
          <TabsList
            children={Object.entries(allMerchList).map(
              ([merchName, merchValues], index) => {
                return (
                  <Tab
                    style={{
                      fontSize: "18px",
                      color: "black",
                      fontWeight: 900,
                      fontFamily: " serif",
                      // cooper-black-std,// old font family
                    }}
                    value={merchValues.type}
                    label={merchValues.siteShowedName}
                    key={useid + index}
                  />
                );
              }
            )}
            setValue={setAllMerchSelectedTab}
            value={allMerchSelectedTab}
          />
        </div>
        <div className="all-merch__products-list my-4">
          <ItemsSlider childrenItemsList={returnTwentyProducts()} />
        </div>
        <Link
          to="collections/dance-gavin-dance"
          className="shop-all-button-container flex justify-center items-center"
        >
          <div className="shop-all-button text-white bg-[#1E1E1E] p-5 my-14 tracking-wider">
            SHOP ALL
          </div>
        </Link>
      </section>

      <section className="tour-tickets px-[3.5em] py-[3em] text-white">
        <div className="title-container text-center text-[2.7rem] my-10">
          TOUR DATES
        </div>
        <div className="table-container">
          <TourTable />
        </div>
        <div className="show-all-dates-action-button-container my-6 ">
          <div className="link-container border-white border text-center p-4 cursor-pointer hover:bg-red-600 hover:border-gray-200 transition-all ease-out">
            <Link
              to="/dance-gavin-dance-edyego-clone/collections/dance-gavin-dance"
              className="show-all-dates-btn "
            >
              VISIT OUR SHOP
            </Link>
          </div>
        </div>
      </section>

      <section className="recent-releases bg-black">
        <div className="title-container text-center text-[2.7rem] py-16 text-[#27C6CB]">
          RECENT RELEASES
        </div>
        <div className="albums-slide-show-container px-8">
          <AlbumSlider />
        </div>
        <div className="albums-tabs-container p-4">
          {/* <TabsList
            children={Object.entries(albumsYearsList).map(
              ([merchName, merchValues], index) => {
                return (
                  <Tab
                    style={{
                      width: "16%",
                      fontSize: "18px",
                      color: "#25C3C8",
                      fontWeight: 900,
                      fontFamily: " serif",
                      // cooper-black-std,// old font family
                    }}
                    value={merchValues.type}
                    label={merchValues.siteShowedName}
                    key={useid + index}
                  />
                );
              }
            )}
            setValue={setAllMerchSelectedTab}
            value={allMerchSelectedTab}
          /> */}
        </div>
        <div className="view-discography-container py-20 flex items-center justify-center">
          <Link
            to="/dance-gavin-dance-edyego-clone/pages/music"
            className="view-music-page-link-btn text-white bg-[#22BDC3] p-5 px-12 fill-animation login-button button-action"
          >
            VIEW DISCOGRAPHY
          </Link>
        </div>
      </section>

      <div className="section-song-autoplay relative">
        <iframe
          className="pointer-events-none"
          allowFullScreen
          width="100%"
          height="655"
          src="https://www.youtube.com/embed/GvHDaSw8k74?autoplay=1&mute=1&controls=0&loop=0"
        ></iframe>

        <div className="play-button-link-container absolute top-[40%] right-[46%] flex items-center justify-center">
          <a
            title="Play video"
            href="https://www.youtube.com/watch?v=GvHDaSw8k74&ab_channel=riserecords"
            className="play-button-link p-10 border rounded-full bg-[#ffffffd6]"
          >
            <PlayArrowIcon fontSize="large" />
          </a>
        </div>
      </div>

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
