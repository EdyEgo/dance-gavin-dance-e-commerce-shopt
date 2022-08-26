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
    <div className="menu-options-container">
      <div className="flex justify-between p-3 cart-header-container">
        <div className="cursor-pointer close-cart-menu">
          <CloseOutlinedIcon
            onClick={() => {
              changeLeftDrawerState(false, "right");
              changeLeftDrawerState(false, "left");
            }}
          />
        </div>
      </div>
      <div className="options-list flex flex-col gap-4 text-[1.5rem] p-5">
        <Link
          onClick={() => {
            closeDrawer();
          }}
          className="item-link pb-2 border-b border-[#21A5AA]"
          to="/dance-gavin-dance-edyego-clone/collections/dance-gavin-dance"
        >
          Shop
        </Link>
        <Link
          onClick={() => {
            closeDrawer();
          }}
          className="item-link pb-2 border-b border-[#21A5AA]"
          to="/dance-gavin-dance-edyego-clone/pages/music"
        >
          Music
        </Link>

        <Link
          onClick={() => {
            closeDrawer();
          }}
          className="item-link  pb-2 border-b border-[#21A5AA]"
          to="/dance-gavin-dance-edyego-clone/pages/tour"
        >
          Tour
        </Link>

        <Link
          onClick={() => {
            closeDrawer();
          }}
          className="item-link  pb-2 border-b border-[#21A5AA]"
          to="/dance-gavin-dance-edyego-clone/pages/swanfest"
        >
          Swanfest
        </Link>

        <Link
          onClick={() => {
            closeDrawer();
          }}
          className="item-link  pb-2 "
          to="/dance-gavin-dance-edyego-clone/collections/tour-merch"
        >
          Tour Merch
        </Link>
      </div>
      <div className="options-menu-drawer__footer border-t border-[#21A5AA] mt-10">
        {/* <div className="account-container flex items-center gap-4 py-5 px-2">
          <UserProfileIcon />
          <div className="font-sans font-semibold">Account</div>
        </div> */}
        <Link
          onClick={() => {
            closeDrawer();
          }}
          className="account-container flex items-center gap-4 py-5 px-2"
          to="/dance-gavin-dance-edyego-clone/login"
        >
          <UserProfileIcon fontSize="large" />
          <div className="font-sans font-semibold text-[1.4rem]">Account</div>
        </Link>
      </div>
    </div>
  );
};

export default MenuDrawerOptions;
