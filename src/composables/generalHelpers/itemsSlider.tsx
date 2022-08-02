import { useState, useId } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabsList from "./tabsList";
import Tab from "@mui/material/Tab";

interface ItemsSliderProps {
  childrenItemsList: any;
  allMerchList: any;
}

const ItemsSlider: React.FC<ItemsSliderProps> = ({
  childrenItemsList,
  allMerchList,
}) => {
  const useid = useId();
  const [transformNumber, setTransformNumber] = useState(0);
  // const maximumOfSlides = childrenItemsList.length;

  const [slidesMade, setSlidesMade] = useState(0);

  const [allMerchSelectedTab, setAllMerchSelectedTab] = useState("tees");

  function selectFitTabBySlidesMade(slideValue: number) {
    const slidesNumbers: { [key: number]: () => void } = {
      0: () => {
        setAllMerchSelectedTab("tees");
      },
      1: () => {
        setAllMerchSelectedTab("outerwear");
      },
      2: () => {
        setAllMerchSelectedTab("accessories");
      },
    };
    slidesNumbers[slideValue]();
  }

  function selectTabWithItems(tabType: string) {
    const tabTypesList: { [key: string]: () => void } = {
      tees: () => {
        setTransformNumber(0);
        setSlidesMade(0);
      },
      outerwear: () => {
        setTransformNumber(-34.1);
        setSlidesMade(1);
      },
      accessories: () => {
        setTransformNumber(-68.2);
        setSlidesMade(2);
      },
    };
    tabTypesList[tabType]();
  }

  function incrementOrDecrementPercentageTransformNumber(increment: boolean) {
    if (increment) {
      if (slidesMade - 1 < 0) {
        // bigger than 24 return
        return;
      }
      const newSlideValue = slidesMade - 1;
      setTransformNumber(transformNumber + 34.1);
      setSlidesMade(newSlideValue);
      selectFitTabBySlidesMade(newSlideValue);
      return;
    }

    if (slidesMade + 1 > 2) {
      // smaller than 12 return
      return;
    }
    const newSlideValue = slidesMade + 1;
    setTransformNumber(transformNumber - 34.1);
    setSlidesMade(newSlideValue);
    selectFitTabBySlidesMade(newSlideValue);
  }

  const styles = {
    transform: `translateX(${transformNumber}%)`,
    transition: "all 600ms ease-in-out",
  };
  // let calculate the number of items we received in pairs of four so we know the number of slides
  // or just use intersections

  return (
    <section className="all-merch bg-[#25c3c8] text-black p-14">
      <div className="all-merch__title text-center">
        <div className="hero-titles__first-title tracking-widest text-[42px] ">
          ALL MERCH
        </div>
      </div>
      <div className="all-merch__tabs flex items-center justify-center my-12">
        <TabsList
          children={Object.entries(allMerchList).map(
            ([merchName, merchValues]: any, index) => {
              return (
                <Tab
                  style={{
                    fontSize: "18px",
                    color: "black",
                    fontWeight: 900,
                    fontFamily: " serif",
                    // cooper-black-std,// old font family
                  }}
                  onClick={() => {
                    selectTabWithItems(merchName);
                  }}
                  value={merchValues.type}
                  label={merchValues.siteShowedName}
                  key={useid + index + "tabItem"}
                />
              );
            }
          )}
          setValue={setAllMerchSelectedTab}
          value={allMerchSelectedTab}
        />
      </div>
      <div className="all-merch__products-list my-4">
        {/*  */}
        <div className="slider-container relative h-[469px] overflow-hidden ">
          {slidesMade !== 0 && (
            <div
              className={` arrow-left-container arrow-slider  absolute left-[0.5%] z-10 cursor-pointer top-[30%] bg-[#25c3c8]  border border-gray-600`}
              onClick={() => {
                incrementOrDecrementPercentageTransformNumber(true);
              }}
            >
              <ArrowBackIcon />
            </div>
          )}
          <div
            style={styles}
            className={`slider-items flex items-start absolute w-[305%] gap-8 `}
          >
            {childrenItemsList}
          </div>
          {slidesMade !== 2 && (
            <div
              className={` arrow-right-container arrow-slider absolute right-[0.5%] top-[30%] z-10 cursor-pointer bg-[#25c3c8]  border border-gray-600`}
              onClick={() => {
                incrementOrDecrementPercentageTransformNumber(false);
              }}
            >
              <ArrowForwardIcon />
            </div>
          )}
        </div>

        {/*  */}
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
  );
};

export default ItemsSlider;
