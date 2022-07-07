import { Link } from "react-router-dom";
import ImageWebp from "../../general-helpers/ImageWebp";
import footerImage from "../../../images/footer.webp";
import albumImage from "../../../images/album-image.webp";
import navMiddleImageWbp from "../../../images/left-nav-bar-logo.webp";
import navMiddleImagePng from "../../../images/nav-bar-middle-logo.png";
import pngPlaceholder from "../../../images/logo192.png";
import ShoppingCart from "./ShoppingCart";
import BurgetMenuMobile from "@mui/icons-material/Menu";
import SearchIconMobile from "@mui/icons-material/Search";
import UserProfileIcon from "@mui/icons-material/PersonOutline";
// import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import ArrowRightSharpIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";
import { changeDrawerStateByDirectionId } from "../../../store/drawers";

interface ClientNavBarProps {}
type Anchor = "top" | "left" | "bottom" | "right";
const ClientNavBar: React.FC<ClientNavBarProps> = () => {
  const dispatch = useDispatch();
  function openDrawerByDirection(drawerDirection: Anchor) {
    dispatch(
      changeDrawerStateByDirectionId({
        direction: drawerDirection,
        newStatus: true,
      })
    );
  }

  const generalCollectionsLink = "/dance-gavin-dance-edyego-clone/collections/";

  return (
    <nav className="nav-bar text-white">
      <div className="nav-bar-sections-container p-6 pt-9 flex  justify-between md:px-10">
        <div className="nav-bar-section-left ">
          <div className="nav-bar-section-left__mobile-version mobile flex gap-5 items-center">
            <div
              className="mobile-menu-icon-container cursor-pointer"
              onClick={() => {
                openDrawerByDirection("left");
              }}
            >
              <BurgetMenuMobile fontSize="small" />
            </div>
            <div className="mobile-serach-icon-container">
              <SearchIconMobile fontSize="small" />
            </div>
          </div>
          <div className="nav-bar-section-left__desktop-version desktop">
            <div className="band-logo-container">
              <Link to="/dance-gavin-dance-edyego-clone">
                <ImageWebp
                  srcWebp={navMiddleImageWbp}
                  src={navMiddleImagePng}
                  width="225"
                  height="auto"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="nav-bar-section-middle">
          <div className="nav-bar-section-middle__mobile-version mobile">
            <div className="mobile-phone">
              <ImageWebp
                srcWebp={navMiddleImageWbp}
                src={navMiddleImagePng}
                width="125"
                height="auto"
              />
            </div>
            <div className="mobile-tablet">
              <ImageWebp
                srcWebp={navMiddleImageWbp}
                src={navMiddleImagePng}
                width="225"
                height="auto"
              />
            </div>
          </div>
          <div className="nav-bar-section-middle__desktop-version desktop">
            <div className="nav-bar-options-list-middle-desktop text-xl font-bold flex gap-8">
              <div className="shop-container  ">
                <div className="link-container item-with-drop-down-menu-hover shop-hover-link-effect">
                  <Link
                    className=" item-link hover-underline-animation"
                    to="/dance-gavin-dance-edyego-clone"
                  >
                    Shop
                  </Link>
                </div>
                <div className="dropdown-menu-shop px-48 py-16 text-black">
                  <div className="items-list flex justify-between items-start relative">
                    <div className="animated-list-links collections flex flex-col gap-5">
                      <div className="title-container">Collections</div>
                      <div className="links-list flex flex-col gap-4 text-lg">
                        <Link to={generalCollectionsLink + "dance-gavin-dance"}>
                          SHOP ALL
                        </Link>
                        <Link to={generalCollectionsLink + "new-arrivals"}>
                          NEW ARRIVALS
                        </Link>
                        <Link to={generalCollectionsLink + "swanfest"}>
                          SWANFEST
                        </Link>
                        <Link to={generalCollectionsLink + "best-sellers"}>
                          BEST SELLERS
                        </Link>
                        <Link to={generalCollectionsLink + "sale"}>SALE</Link>
                      </div>
                    </div>
                    <div className="animated-list-links apparel flex flex-col gap-5">
                      <div className="title-container">Apparel</div>
                      <div className="links-list flex flex-col gap-4 text-lg">
                        <Link to={generalCollectionsLink + "tees"}>
                          T-SHIRTS
                        </Link>
                        <Link to={generalCollectionsLink + "outerwear"}>
                          OUTERWEAR
                        </Link>
                        <Link to={generalCollectionsLink + "athletic-wear"}>
                          ATHLETIC WEAR
                        </Link>
                        <Link to={generalCollectionsLink + "joggers"}>
                          JOGGERS
                        </Link>
                      </div>
                    </div>
                    <div className="animated-list-links accessories flex flex-col gap-4 ">
                      <Link
                        to={generalCollectionsLink + "accessories"}
                        className="title-container"
                      >
                        Accessories
                      </Link>
                      <div className="links-list text-lg">
                        <Link
                          to={generalCollectionsLink + "accessories"}
                          className="item flex items-center"
                        >
                          <div className="text ">ALL ACCESSORIES</div>
                          <ArrowRightSharpIcon className="mb-1" />
                        </Link>
                      </div>
                    </div>
                    <Link
                      to={generalCollectionsLink + "jackpot-juicer"}
                      className="animated-list-links album-container flex flex-col gap-5"
                    >
                      {/* you can extract this one from database  */}
                      <div className="picture-album-as-title feature-image-zoom">
                        <ImageWebp
                          srcWebp={albumImage}
                          width="280"
                          height="auto"
                        />
                      </div>
                      <div className="small-description flex flex-col justify-center items-center gap-3">
                        <div className="first-title text-base tracking-widest">
                          PREORDERS AVAILABLE
                        </div>
                        <div className="second-title text-md">
                          JACKPOT JUICER
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                className="item-link hover-underline-animation"
                to="/dance-gavin-dance-edyego-clone"
              >
                Music
              </Link>

              <Link
                className="item-link hover-underline-animation"
                to="/dance-gavin-dance-edyego-clone"
              >
                Tour
              </Link>

              <Link
                className="item-link hover-underline-animation"
                to="/dance-gavin-dance-edyego-clone"
              >
                Swanfest
              </Link>

              <Link
                className="item-link hover-underline-animation"
                to="/dance-gavin-dance-edyego-clone"
              >
                Tour Merch
              </Link>
            </div>
          </div>
        </div>
        <div className="nav-bar-section-right">
          <div className="nav-bar-section-right__mobile-version mobile flex items-center gap-5">
            <div className="mobile-tablet">
              <Link to="/dance-gavin-dance-edyego-clone/login">
                <UserProfileIcon fontSize="small" />
              </Link>
            </div>

            <div
              className="shoping-cart"
              onClick={() => {
                openDrawerByDirection("right");
              }}
            >
              <ShoppingCart />
            </div>
          </div>
          <div className="nav-bar-section-right__desktop-version desktop gap-4 flex">
            <SearchIconMobile fontSize="large" className="cursor-pointer" />
            <Link to="/dance-gavin-dance-edyego-clone/login">
              <UserProfileIcon fontSize="large" className="cursor-pointer" />
            </Link>

            <div
              className="shoping-cart"
              onClick={() => {
                openDrawerByDirection("right");
              }}
            >
              <ShoppingCart desktopMode={true} />
            </div>
          </div>
        </div>
      </div>
      {/* <Link
          to="/reduce-issues"
          className="logo-container flex justify-center items-center gap-1 "
        >
          <div className="logo-img-container">
            <img src="./logosite.png" alt="site logo" className="w-9" />
          </div>
          <div className="app-logo-text-container">Reduce Issues</div>
        </Link>
        <div className="link-container"></div>
        <div className="auth-container">
          <div className="auth-links-container flex items-center justify-center gap-4 font-semibold">
            <div className="sign-in-link text-blue-900 hover:text-blue-600 transition-all ease">
              <Link
                to="/dance-gavin-dance-edyego-clone/login"
                className="sign-in-button-client-area p-2 "
              >
                Log In
              </Link>
            </div>

            <Link
              to="/dance-gavin-dance-edyego-clone/signup"
              className="sign-up-button-client-area-nav text-black sign-up-link bg-blue-800   p-2 rounded-md border-transparent hover:bg-blue-600 transition-all ease"
            >
              Sign Up
            </Link>
          </div>
        </div> */}
    </nav>
  );
};

export default ClientNavBar;
