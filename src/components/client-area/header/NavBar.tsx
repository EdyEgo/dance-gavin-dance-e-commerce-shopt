import { Link } from "react-router-dom";
import ImageWebp from "../../general-helpers/ImageWebp";
import footerImage from "../../../images/footer.webp";
import albumImage from "../../../images/album-image.webp";
import navMiddleImageWbp from "../../../images/left-nav-bar-logo.webp";
import navMiddleImagePng from "../../../images/nav-bar-middle-logo.png";
import ShoppingCart from "./ShoppingCart";
import BurgetMenuMobile from "@mui/icons-material/Menu";
import SearchIconMobile from "@mui/icons-material/Search";
import UserProfileIcon from "@mui/icons-material/PersonOutline";
// import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import ArrowRightSharpIcon from "@mui/icons-material/PlayArrow";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDrawerStateByDirectionId,
  changeDrawerTypeMenu,
} from "../../../store/drawers";

interface ClientNavBarProps {}
type Anchor = "top" | "left" | "bottom" | "right";
const ClientNavBar: React.FC<ClientNavBarProps> = () => {
  const authUser = useSelector((state: any) => state.auth.user);
  console.log("my user is not auth bruh", authUser);

  const dispatch = useDispatch();
  function openDrawerByDirection(
    drawerDirection: Anchor,
    typeDrawerMenu: string
  ) {
    dispatch(
      changeDrawerStateByDirectionId({
        direction: drawerDirection,
        newStatus: true,
      })
    );

    dispatch(changeDrawerTypeMenu({ menuTypeSelected: typeDrawerMenu }));
  }

  const generalCollectionsLink = "/dance-gavin-dance-edyego-clone/collections/";

  return (
    <nav className="relative text-white nav-bar">
      <div className="flex justify-between p-6 nav-bar-sections-container pt-9 md:px-10">
        <div className="nav-bar-section-left ">
          <div className="flex items-center gap-5 nav-bar-section-left__mobile-version mobile">
            <div
              className="cursor-pointer mobile-menu-icon-container"
              onClick={() => {
                openDrawerByDirection("left", "cart");
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
            <div className="flex gap-8 text-xl font-bold nav-bar-options-list-middle-desktop">
              <div className="shop-container ">
                <div className="link-container item-with-drop-down-menu-hover shop-hover-link-effect">
                  <Link
                    className=" item-link hover-underline-animation"
                    to="/dance-gavin-dance-edyego-clone/collections/dance-gavin-dance"
                  >
                    Shop
                  </Link>
                </div>
                <div className="px-48 py-16 text-black shadow-2xl dropdown-menu-shop">
                  <div className="relative flex items-start justify-between items-list">
                    <div className="flex flex-col gap-5 animated-list-links collections">
                      <div className="title-container">Collections</div>
                      <div className="flex flex-col gap-4 text-lg links-list">
                        <Link
                          to={generalCollectionsLink + "dance-gavin-dance"}
                          className="hover:text-gray-700"
                        >
                          SHOP ALL
                        </Link>
                        <Link
                          to={generalCollectionsLink + "new-arrivals"}
                          className="hover:text-gray-700"
                        >
                          NEW ARRIVALS
                        </Link>
                        <Link
                          to={generalCollectionsLink + "swanfest"}
                          className="hover:text-gray-700"
                        >
                          SWANFEST
                        </Link>
                        <Link
                          to={generalCollectionsLink + "best-sellers"}
                          className="hover:text-gray-700"
                        >
                          BEST SELLERS
                        </Link>
                        <Link
                          to={generalCollectionsLink + "sale"}
                          className="hover:text-gray-700"
                        >
                          SALE
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 animated-list-links apparel">
                      <div className="title-container">Apparel</div>
                      <div className="flex flex-col gap-4 text-lg links-list">
                        <Link
                          to={generalCollectionsLink + "tees"}
                          className="hover:text-gray-700"
                        >
                          T-SHIRTS
                        </Link>
                        <Link
                          to={generalCollectionsLink + "outerwear"}
                          className="hover:text-gray-700"
                        >
                          OUTERWEAR
                        </Link>
                        <Link
                          to={generalCollectionsLink + "athletic-wear"}
                          className="hover:text-gray-700"
                        >
                          ATHLETIC WEAR
                        </Link>
                        <Link
                          to={generalCollectionsLink + "joggers"}
                          className="hover:text-gray-700"
                        >
                          JOGGERS
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 animated-list-links accessories ">
                      <Link
                        to={generalCollectionsLink + "accessories"}
                        className="title-container"
                      >
                        Accessories
                      </Link>
                      <div className="text-lg links-list">
                        <Link
                          to={generalCollectionsLink + "accessories"}
                          className="flex items-center item"
                        >
                          <div className="text ">ALL ACCESSORIES</div>
                          <ArrowRightSharpIcon className="mb-1" />
                        </Link>
                      </div>
                    </div>
                    <Link
                      to={generalCollectionsLink + "jackpot-juicer"}
                      className="flex flex-col gap-5 animated-list-links album-container"
                    >
                      {/* you can extract this one from database  */}
                      <div className="picture-album-as-title feature-image-zoom">
                        <ImageWebp
                          srcWebp={albumImage}
                          width="280"
                          height="auto"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center gap-3 small-description">
                        <div className="text-base tracking-widest first-title">
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
                to="/dance-gavin-dance-edyego-clone/pages/music"
              >
                Music
              </Link>

              <Link
                className="item-link hover-underline-animation"
                to="/dance-gavin-dance-edyego-clone/pages/tour"
              >
                Tour
              </Link>

              <Link
                className="item-link hover-underline-animation"
                to="/dance-gavin-dance-edyego-clone/pages/swanfest"
              >
                Swanfest
              </Link>

              <Link
                className="item-link hover-underline-animation"
                to="/dance-gavin-dance-edyego-clone/collections/tour-merch"
              >
                Tour Merch
              </Link>
            </div>
          </div>
        </div>
        <div className="nav-bar-section-right">
          <div className="flex items-center gap-5 nav-bar-section-right__mobile-version mobile">
            <div className="mobile-tablet">
              <Link to="/dance-gavin-dance-edyego-clone/login">
                <UserProfileIcon fontSize="small" />
              </Link>
            </div>

            <div
              className="shoping-cart"
              onClick={() => {
                openDrawerByDirection("right", "cart");
              }}
            >
              <ShoppingCart />
            </div>
          </div>
          <div className="flex gap-4 nav-bar-section-right__desktop-version desktop">
            <SearchIconMobile
              fontSize="large"
              className="cursor-pointer"
              onClick={() => {
                openDrawerByDirection("right", "search");
              }}
            />
            <Link to="/dance-gavin-dance-edyego-clone/login">
              <UserProfileIcon fontSize="large" className="cursor-pointer" />
            </Link>

            <div
              className="shoping-cart"
              onClick={() => {
                openDrawerByDirection("right", "cart");
              }}
            >
              <ShoppingCart desktopMode={true} />
            </div>
          </div>
        </div>
      </div>
      {/* <Link
          to="/reduce-issues"
          className="flex items-center justify-center gap-1 logo-container "
        >
          <div className="logo-img-container">
            <img src="./logosite.png" alt="site logo" className="w-9" />
          </div>
          <div className="app-logo-text-container">Reduce Issues</div>
        </Link>
        <div className="link-container"></div>
        <div className="auth-container">
          <div className="flex items-center justify-center gap-4 font-semibold auth-links-container">
            <div className="text-blue-900 transition-all sign-in-link hover:text-blue-600 ease">
              <Link
                to="/dance-gavin-dance-edyego-clone/login"
                className="p-2 sign-in-button-client-area "
              >
                Log In
              </Link>
            </div>

            <Link
              to="/dance-gavin-dance-edyego-clone/signup"
              className="p-2 text-black transition-all bg-blue-800 border-transparent rounded-md sign-up-button-client-area-nav sign-up-link hover:bg-blue-600 ease"
            >
              Sign Up
            </Link>
          </div>
        </div> */}
    </nav>
  );
};

export default ClientNavBar;
