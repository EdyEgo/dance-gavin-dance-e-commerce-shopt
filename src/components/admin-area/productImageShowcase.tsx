import * as React from "react";

import ImageWebp from "../general-helpers/ImageWebp";

interface ProductImageShowcaseProps {
  imageListURL: string[];
}

const ProductImageShowcase: React.FC<ProductImageShowcaseProps> = ({
  imageListURL,
}) => {
  const [transformNumber, setTransformNumber] = React.useState(0);
  const useid = React.useId();
  //   let counter = 1;
  const [counter, setCounter] = React.useState(1);
  const styles = {
    transform: `translateX(${transformNumber}%)`,
    transition: "all 600ms ease-in-out",
  };

  const SLIDE_NUMBER = 100.1;
  // const maximumOfSlides = childrenItemsList.length;

  const [slidesMade, setSlidesMade] = React.useState(0);

  function incrementOrDecrementPercentageTransformNumber(increment: boolean) {
    if (increment) {
      if (slidesMade - 1 < 0) {
        return;
      }
      setTransformNumber(transformNumber + SLIDE_NUMBER);
      setSlidesMade(slidesMade - 1);

      return;
    }

    if (slidesMade + 1 > imageListURL.length - 1) {
      // smaller than 12 return
      return;
    }
    setTransformNumber(transformNumber - SLIDE_NUMBER);
    setSlidesMade(slidesMade + 1);
  }

  const lastImageRef = React.useRef<any>(null);

  // test
  const [carouselSliderStyles, setCarouselSliderStyles] = React.useState({
    transition: "",
    transform: "",
  });

  //   let carouselSliderStyles: any = {
  //     transition: "",
  //     transform: "",
  //   };

  //   function transitionByClick(type: "prev" | "next") {
  //     const size = lastImageRef.current.clientWidth;

  //     const transitionsTypes: { [key: string]: () => void } = {
  //       next: () => {
  //         // if (counter >= imageListURL.length - 1) {
  //         //   return;
  //         // }

  //         setCounter(counter + 1);

  //         setCarouselSliderStyles({
  //           transition: "transform 0.4s ease-in-out",
  //           //   transform: `translateX(${-size * counter}px)`,
  //           transform: `translateX(${SLIDE_NUMBER + counter}%)`,
  //         });
  //       },
  //       prev: () => {
  //         // if (counter <= 0) {
  //         //   return;
  //         // }

  //         setCounter(counter - 1);

  //         setCarouselSliderStyles({
  //           transition: "transform 1s ease-in-out",
  //           //   transform: `translateX(${-size * counter}px)`,
  //           transform: `translateX(${SLIDE_NUMBER - counter}%)`,
  //         });
  //       },
  //     };

  //     transitionsTypes[type]();
  //   }

  function callTransitionNumberOfTimes(
    // numberOfTimes: number,
    selectedSlideIndex: number,
    increment: boolean
  ) {
    // slidesMade

    if (increment) {
      for (let i = 0; i <= imageListURL.length; i++) {
        console.log(
          "bruh",
          selectedSlideIndex,
          "i",
          i,
          "slides made",
          slidesMade
        );
        if (selectedSlideIndex === slidesMade) {
          break;
        }
        // incrementOrDecrementPercentageTransformNumber(increment);

        setTransformNumber(transformNumber + SLIDE_NUMBER);
        setSlidesMade(slidesMade - 1);
      }

      return;
    }

    for (let i = imageListURL.length; i >= 0; i--) {
      if (selectedSlideIndex === slidesMade) {
        break;
      }
      setTransformNumber(transformNumber - SLIDE_NUMBER);
      setSlidesMade(slidesMade + 1);
      //   incrementOrDecrementPercentageTransformNumber(increment);
    }
  }

  function calculateHowManyTransitionHasToBeCalled(slideIndexSelected: number) {
    // slidesMade
    //indexImageURL.length
    if (slideIndexSelected === slidesMade) {
      return;
    }

    //  i am at index 0 and i want to reach index 5 out of 10 , how many steps do i have to make
  }

  return (
    <div className="product-images-container flex gap-1">
      <div className="left-images-list flex flex-col gap-4 ">
        {imageListURL.map((imageURL, indexImageURL) => {
          const selectedStyle =
            indexImageURL === slidesMade ? "border-2 border-black" : "";
          return (
            <img
              onClick={() => {
                const incrementTransition =
                  indexImageURL >= slidesMade ? false : true;
                console.log(
                  "i was called",
                  incrementTransition,
                  "ll",
                  indexImageURL
                );

                callTransitionNumberOfTimes(indexImageURL, incrementTransition);
              }}
              src={imageURL}
              className={`w-[20%] ${selectedStyle} p-[0.15em] cursor-pointer transition-all duration-100`}
              alt=""
              key={indexImageURL + useid}
            />
          );
        })}
      </div>
      <div className="main-iamge-selector">
        <div className="carousel-container w-[40%] overflow-hidden relative">
          <div className="carousel-slider flex  " style={styles}>
            {imageListURL.map((imageURL, indexImageURL) => {
              return (
                <img
                  src={imageURL}
                  style={{ width: "100%" }}
                  alt=""
                  key={indexImageURL + useid}
                />
              );
            })}
          </div>

          <div className="outlayer-container absolute top-0 right-0 h-full w-full flex">
            <div
              onClick={() => {
                // transitionByClick("prev");
                incrementOrDecrementPercentageTransformNumber(true);
              }}
              className="overlayer-left-half  bg-transparent  w-[50%]"
              style={{ cursor: "w-resize" }}
            ></div>
            <div
              onClick={() => {
                // transitionByClick("next");

                incrementOrDecrementPercentageTransformNumber(false);
              }}
              className="overlayer-right-half bg-transparent w-[50%]"
              style={{ cursor: "w-resize" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageShowcase;
