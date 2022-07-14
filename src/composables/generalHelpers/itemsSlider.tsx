import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ItemsSliderProps {
  childrenItemsList: any;
}

const ItemsSlider: React.FC<ItemsSliderProps> = ({ childrenItemsList }) => {
  const [transformNumber, setTransformNumber] = useState(0);

  function incrementOrDecrementPercentageTransformNumber(increment: boolean) {
    if (increment) {
      setTransformNumber(transformNumber + 10);
      return;
    }
    setTransformNumber(transformNumber - 10);
  }

  const styles = {
    transform: `translateX(${transformNumber}%)`,
    transition: "all 600ms ease-in-out",
  };

  return (
    <div className="slider-container relative h-[600px] overflow-hidden ">
      <div
        className={` arrow-left-container arrow-slider  absolute left-0 z-10 cursor-pointer top-[20%] bg-[#25c3c8]  border border-gray-600`}
        onClick={() => {
          incrementOrDecrementPercentageTransformNumber(true);
        }}
      >
        <ArrowBackIcon />
      </div>
      <div
        style={styles}
        className={`slider-items flex absolute w-[220%] gap-8 `}
      >
        {childrenItemsList}
      </div>
      <div
        className={` arrow-right-container arrow-slider absolute right-0 top-[20%] z-10 cursor-pointer bg-[#25c3c8]  border border-gray-600`}
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
