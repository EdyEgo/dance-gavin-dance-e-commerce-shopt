import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ItemsSliderProps {
  childrenItemsList: any;
}

const ItemsSlider: React.FC<ItemsSliderProps> = ({ childrenItemsList }) => {
  const [transformNumber, setTransformNumber] = useState(0);
  // const maximumOfSlides = childrenItemsList.length;

  const [slidesMade, setSlidesMade] = useState(0);

  function incrementOrDecrementPercentageTransformNumber(increment: boolean) {
    if (increment) {
      if (slidesMade - 1 < 0) {
        // bigger than 24 return
        return;
      }
      setTransformNumber(transformNumber + 34.1);
      setSlidesMade(slidesMade - 1);

      return;
    }

    if (slidesMade + 1 > 2) {
      // smaller than 12 return
      return;
    }
    setTransformNumber(transformNumber - 34.1);
    setSlidesMade(slidesMade + 1);
  }

  const styles = {
    transform: `translateX(${transformNumber}%)`,
    transition: "all 600ms ease-in-out",
  };
  // let calculate the number of items we received in pairs of four so we know the number of slides
  // or just use intersections

  return (
    <div className="slider-container relative h-[469px] overflow-hidden ">
      <div
        className={` arrow-left-container arrow-slider  absolute left-[0.5%] z-10 cursor-pointer top-[30%] bg-[#25c3c8]  border border-gray-600`}
        onClick={() => {
          incrementOrDecrementPercentageTransformNumber(true);
        }}
      >
        <ArrowBackIcon />
      </div>
      <div
        style={styles}
        className={`slider-items flex absolute w-[305%] gap-8 `}
      >
        {childrenItemsList}
      </div>
      <div
        className={` arrow-right-container arrow-slider absolute right-[0.5%] top-[30%] z-10 cursor-pointer bg-[#25c3c8]  border border-gray-600`}
        onClick={() => {
          incrementOrDecrementPercentageTransformNumber(false);
        }}
      >
        <ArrowForwardIcon />
      </div>
    </div>
  );
};

export default ItemsSlider;
