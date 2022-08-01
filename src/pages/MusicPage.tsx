import { useState, useRef, useEffect } from "react";
import ImageWebp from "../components/general-helpers/ImageWebp";
import albumImage from "../images/album-image.webp";

interface MusicPageProps {}

const MusicPage: React.FC<MusicPageProps> = () => {
  return (
    <div className="music-page-container">
      <div className="section-albums">Music page placeholder albums</div>
      <div className="section-album-instrumental">
        Music page placeholder instrumental
      </div>
    </div>
  );
};

export default MusicPage;
