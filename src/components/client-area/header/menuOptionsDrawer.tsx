import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeDrawerStateByDirectionId } from "../../../store/drawers";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import UserProfileIcon from "@mui/icons-material/PersonOutline";

interface MenuDrawerOptionsProps {}

const MenuDrawerOptions: React.FC<MenuDrawerOptionsProps> = () => {
  const dispatch = useDispatch();

  function changeLeftDrawerState(newStatus: boolean, direction: string) {
    dispatch(
      changeDrawerStateByDirectionId({
        direction,
        newStatus,
      })
    );
  }

  function closeDrawer() {
    changeLeftDrawerState(false, "right");
    changeLeftDrawerState(false, "left");
  }

  return (
    <div className="menu-options-container h-full flex flex-col justify-between">
      <div className="upper-half pl-5">
        <div className="flex justify-between py-3 cart-header-container">
          <div className="cursor-pointer close-cart-menu">
            <CloseOutlinedIcon
              onClick={() => {
                changeLeftDrawerState(false, "right");
                changeLeftDrawerState(false, "left");
              }}
            />
          </div>
        </div>
        <div className="options-list flex flex-col gap-4 text-[1.3rem] mt-2">
          <Link
            onClick={() => {
              closeDrawer();
            }}
            className="item-link pb-4 border-b border-[#21A5AA]"
            to="/dance-gavin-dance-edyego-clone/collections/dance-gavin-dance"
          >
            Shop
          </Link>
          <Link
            onClick={() => {
              closeDrawer();
            }}
            className="item-link pb-4 border-b border-[#21A5AA]"
            to="/dance-gavin-dance-edyego-clone/pages/music"
          >
            Music
          </Link>

          <Link
            onClick={() => {
              closeDrawer();
            }}
            className="item-link  pb-4 border-b border-[#21A5AA]"
            to="/dance-gavin-dance-edyego-clone/pages/tour"
          >
            Tour
          </Link>

          <Link
            onClick={() => {
              closeDrawer();
            }}
            className="item-link  pb-4 border-b border-[#21A5AA]"
            to="/dance-gavin-dance-edyego-clone/pages/swanfest"
          >
            Swanfest
          </Link>

          <Link
            onClick={() => {
              closeDrawer();
            }}
            className="item-link  pb-4 "
            to="/dance-gavin-dance-edyego-clone/collections/tour-merch"
          >
            Tour Merch
          </Link>
        </div>
      </div>

      <div className="options-menu-drawer__footer border-t border-[#21A5AA] pl-5">
        {/* <div className="account-container flex items-center gap-4 py-5 px-2">
          <UserProfileIcon />
          <div className="font-sans font-semibold">Account</div>
        </div> */}
        <Link
          onClick={() => {
            closeDrawer();
          }}
          className="account-container flex items-center gap-4 py-5 "
          to="/dance-gavin-dance-edyego-clone/login"
        >
          <UserProfileIcon fontSize="medium" />
          <div className="font-sans font-light text-[1.3rem]">Account</div>
        </Link>
      </div>
    </div>
  );
};

export default MenuDrawerOptions;
