import React, { useState, useId } from "react";
import ImageWebp from "../../components/general-helpers/ImageWebp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AlbumAfterBurner from "../../images/albums/dgd-afterburner_1000x.webp";
import AlbumArtificialSelection from "../../images/albums/dgd-artificial-selection_640x.jpg";
import AlbumInstantGratification from "../../images/albums/dgd-instant-gratification_640x.jpg";
import AlbumMotherShip from "../../images/albums/dgd-mothership_640x.jpg";
import TreeCitySessions from "../../images/albums/dgd-tree-city-sessions-2_640x.jpg";

interface ItemsSliderProps {}

const ItemsSlider: React.FC<ItemsSliderProps> = () => {
  const useid = useId();
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

  function createAlbumsElements() {
    const albumsNames = [
      "dgd-afterburner_1000x.webp",
      "dgd-artificial-selection_640x.jpg",
      "dgd-instant-gratification_640x.jpg",
      "dgd-mothership_640x.jpg",
      "dgd-tree-city-sessions-2_640x.jpg",
    ];

    return albumsNames.map((imageName, index) => {
      //   const imageImport = await import(`../../images/albums/${imageName}`);
      const imageImport = React.lazy(
        () => import(`../../images/albums/${imageName}`)
      );
      return (
        <React.Suspense fallback={<p>loading...</p>}>
          <ImageWebp
            key={useid + index}
            srcWebp={imageImport}
            src={imageImport}
            width="225"
            height="auto"
          />
        </React.Suspense>
      );
    });

    //     <ImageWebp
    // key={useid + index}
    //     srcWebp={navMiddleImageWbp}
    //     src={navMiddleImagePng}
    //     width="225"
    //     height="auto"
    //   />
  }

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
        {/* {createAlbumsElements()} */}

        <div className="album-show-container">
          <div className="image-container">
            <ImageWebp
              srcWebp={AlbumAfterBurner}
              src={AlbumAfterBurner}
              width="225"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB]"></div>
        </div>

        <div className="album-show-container">
          <div className="image-container">
            <ImageWebp
              srcWebp={AlbumArtificialSelection}
              src={AlbumArtificialSelection}
              width="225"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB]"></div>
        </div>

        <div className="album-show-container">
          <div className="image-container">
            <ImageWebp
              srcWebp={AlbumInstantGratification}
              src={AlbumInstantGratification}
              width="225"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB]"></div>
        </div>

        <div className="album-show-container">
          <div className="image-container">
            <ImageWebp
              srcWebp={AlbumMotherShip}
              src={AlbumMotherShip}
              width="225"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB]"></div>
        </div>

        <div className="album-show-container">
          <div className="image-container">
            <ImageWebp
              srcWebp={TreeCitySessions}
              src={TreeCitySessions}
              width="225"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB]"></div>
        </div>
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
