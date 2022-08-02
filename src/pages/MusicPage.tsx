import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageWebp from "../components/general-helpers/ImageWebp";
import albumImage from "../images/album-image.webp";
import AlbumSlider from "../composables/generalHelpers/albumsSlider";

interface MusicPageProps {}

const MusicPage: React.FC<MusicPageProps> = () => {
  return (
    // <div className="music-page-container">
    //   <div className="section-albums">Music page placeholder albums</div>
    //   <div className="section-album-instrumental">
    //     Music page placeholder instrumental
    //   </div>
    // </div>

    <div className="music-page-container">
      <section className="recent-releases bg-black">
        <div className="title-container text-center text-[2.2rem] py-16 text-[#27C6CB]">
          STUDIO + LIVE
        </div>
        <div className="albums-slide-show-container px-8">
          <AlbumSlider />
        </div>

        <div className="border-container flex items-center justify-center py-5 pl-4">
          <div className="border-b  border-[#27C6CB] w-[90%]"></div>
        </div>

        <div className="albums-tabs-container p-4"></div>
      </section>

      <section className="recent-releases bg-[#FBF3D5]  ">
        <div className="title-container text-center text-[2.2rem] py-16 text-[#27C6CB]">
          INSTRUMENTAL
        </div>
        <div className="albums-slide-show-container px-8">
          <AlbumSlider
            filterImagesObject={{ filter: "grayscale(100%) contrast(90%)" }}
          />
        </div>
        <div className="border-container flex items-center justify-center py-5 pl-4">
          <div className="border-b  border-[#27C6CB] w-[90%] "></div>
        </div>
        <div className="albums-tabs-container p-4 "></div>
      </section>
    </div>
  );
};

export default MusicPage;
