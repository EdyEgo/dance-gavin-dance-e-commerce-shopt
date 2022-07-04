import { Link } from "react-router-dom";

import ShoppingCart from "./ShoppingCart";
import BurgetMenuMobile from "@mui/icons-material/Menu";
import SearchIconMobile from "@mui/icons-material/Search";

interface ClientNavBarProps {}

const ClientNavBar: React.FC<ClientNavBarProps> = () => {
  return (
    <nav className="nav-bar text-white">
      <div className="nav-bar-sections-container p-5 flex items-center justify-between">
        <div className="nav-bar-section-left">
          <div className="nav-bar-section-left__mobile-version mobile flex gap-5 items-center">
            <div className="mobile-menu-icon-container">
              <BurgetMenuMobile fontSize="small" />
            </div>
            <div className="mobile-serach-icon-container">
              <SearchIconMobile fontSize="small" />
            </div>
          </div>
          <div className="nav-bar-section-left__desktop-version"></div>
        </div>
        <div className="nav-bar-section-middle">
          <div className="nav-bar-section-middle__mobile-version mobile">
            DANCE GAVIN DANCE
          </div>
          <div className="nav-bar-section-middle__desktop-version"></div>
        </div>
        <div className="nav-bar-section-right">
          <div className="nav-bar-section-right__mobile-version mobile">
            <ShoppingCart />
          </div>
          <div className="nav-bar-section-right__desktop-version"></div>
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
