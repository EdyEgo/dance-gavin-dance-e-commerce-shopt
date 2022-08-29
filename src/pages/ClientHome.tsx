import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useState, useId } from "react";
import ProductItem from "../composables/generalHelpers/productItem";
import ItemsSlider from "../composables/generalHelpers/itemsSlider";
import AlbumSlider from "../composables/generalHelpers/albumsSlider";
import TourTable from "../composables/generalHelpers/tourTable";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HeroImage from "../images/home-page-hero.webp";
// ./images//home-page-hero.webp

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

  function returnTwentyProducts(type: "normal" | "merchSlider") {
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
      if (productIndex >= 21) {
        break;
      }
      const productItemObject = productsList[productIndex];

      const {
        numberItemsAvailable,

        correctPriceForSelectedCurrency,
      } = returnPriceAndSizeAutoSelected(productItemObject);
      productListElements.push(
        <ProductItem
          key={type + productIndex + useid}
          customStyles={"md:w-[33%]"} // test
          correctPriceForSelectedCurrency={correctPriceForSelectedCurrency}
          numberItemsAvailable={numberItemsAvailable}
          selectedCurrency={selectedCurrency}
          productPropertiesValues={productItemObject}
        />
      );
    }
    return productListElements;
  }

  return (
    <div className="container-home bg-[#E84A42] ">
      <section className="flex items-start justify-center text-white hero-section-contianer-canceled py-2 relative">
        <img src={HeroImage} alt="" className="w-full" />
        <div className="flex flex-col justify-center items-center text-center hero-titles-container gap-7 absolute w-full h-full">
          <div className="tracking-widest md:text-[1.4rem] hero-titles__first-title">
            OUT EVERYWHERE
          </div>
          <h1 className="text-[1.4rem] md:text-4xl hero-titles__second-second-title">
            JACKPOT JUICER
          </h1>
        </div>
      </section>

      <section className="albums-list text-[#F9F175] px-12">
        {/*  bg-[#25c3c8] */}
        <div className="title-container my-14">
          <div className="title text-center text-[1.4rem] md:text-[2.1rem]">
            JACKPOT JUICER
          </div>
        </div>
        <div className="jackpot-juicer-home-products-list albums-list-container flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-3 md:flex md:flex-row md:flex-wrap  md:justify-evenly">
          {returnTwentyProducts("normal")}
        </div>
        <Link
          to="collections/dance-gavin-dance"
          className="flex items-center justify-center shop-all-button-container"
        >
          <div className="shop-all-button text-[#F9F175] bg-[#1E1E1E] p-5 my-14 tracking-wider">
            SHOP ALL MERCH
          </div>
        </Link>
      </section>

      {/*  */}
      <ItemsSlider
        childrenItemsList={returnTwentyProducts("merchSlider")}
        allMerchList={allMerchList}
      />
      {/*  */}
      <section className="tour-tickets px-[3.5em] py-[3em] text-white">
        <div className="title-container text-center text-[2.7rem] my-10">
          TOUR DATES
        </div>
        <div className="table-container">
          <TourTable />
        </div>
        <div className="my-6 show-all-dates-action-button-container ">
          <div className="p-4 text-center transition-all ease-out border border-white cursor-pointer link-container hover:bg-red-600 hover:border-gray-200">
            <Link
              to="/dance-gavin-dance-edyego-clone/collections/dance-gavin-dance"
              className="show-all-dates-btn "
            >
              VISIT OUR SHOP
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black recent-releases">
        <div className="title-container text-center text-[2.7rem] py-16 text-[#27C6CB]">
          RECENT RELEASES
        </div>
        <div className="px-2 albums-slide-show-container">
          <AlbumSlider />
        </div>
        <div className="p-4 albums-tabs-container">
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
        <div className="flex items-center justify-center py-20 view-discography-container">
          <Link
            to="/dance-gavin-dance-edyego-clone/pages/music"
            className="view-music-page-link-btn text-white bg-[#22BDC3] p-5 px-12 fill-animation login-button button-action"
          >
            VIEW DISCOGRAPHY
          </Link>
        </div>
      </section>

      <div className="relative section-song-autoplay h-[40vh] md:h-[60vh] lg:h-[90vh]">
        <iframe
          title="Dance Gavin Dance video"
          className="pointer-events-none"
          allowFullScreen
          allow="autoplay"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/GvHDaSw8k74?playsinline=1&autoplay=1&controls=0&mute=1&loop=1&playlist=GvHDaSw8k74&enablejsapi=1&rel=0&modestbranding=1&origin=https%3A%2F%2Fdancegavindanceband.com"
        ></iframe>

        <div className="play-button-link-container absolute top-0 w-full h-full flex items-center justify-center">
          <a
            title="Play video"
            href="https://www.youtube.com/watch?v=GvHDaSw8k74&ab_channel=riserecords"
            className="play-button-link p-5 md:p-10 border rounded-full bg-[#ffffffd6]"
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
