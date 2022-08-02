import { Link } from "react-router-dom";
import heroImage from "../images/tour/hero-picture.jpg";
import TourTable from "../composables/generalHelpers/tourTable";

interface TourPageProps {}

const TourPage: React.FC<TourPageProps> = () => {
  return (
    <div className="tour-page-container bg-[#24C1C6]">
      <div
        className="hero-container h-[80vh] flex justify-center items-center"
        style={{
          background: `url(${heroImage}) `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="tour-title-container text-white text-center text-[3.8rem] font-sans">
          TOUR DATES
        </div>
      </div>
      <div className="table-container py-[4em] px-9">
        <TourTable
          backgroundPreselected="bg-[#24C1C6]"
          hovePreselected="hover:bg-[#2DBDC2]"
          buttonsPreselectedHoverEffect="hover:bg-[#2DBDC2]"
        />
      </div>

      <div className="show-all-dates-action-button-container p-9 text-white pb-20">
        <div className="link-container border-white border text-center p-4 cursor-pointer hover:-[#2DBDC2] hover:border-gray-200 transition-all ease-out">
          <Link
            to="/dance-gavin-dance-edyego-clone/collections/dance-gavin-dance"
            className="show-all-dates-btn "
          >
            VISIT OUR SHOP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourPage;
