import * as React from "react";
// import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeDrawerStateByDirectionId,
  // changeDrawerTypeMenu,
} from "../../../store/drawers";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ProductItemCart from "../../../composables/generalHelpers/productItemCart"

type Anchor = "top" | "left" | "bottom" | "right";

export default function LeftMenuDrawer() {
  const dispatch = useDispatch();
  const useid = React.useId()
  const drawersState = useSelector((state: any) => state.drawers.drawers);
  const drawersMenuTypeState = useSelector(
    (state: any) => state.drawers.menuType
  );

  const productsAddedToCart = useSelector(
    (state: any) => state.cart.productsAddedToCart.length
  );

  const productsAddedToCartList = useSelector(
    (state: any) => state.cart.productsAddedToCart
  );



  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      changeLeftDrawerState(open, anchor);
    };

  function changeLeftDrawerState(newStatus: boolean, direction: string) {
    dispatch(
      changeDrawerStateByDirectionId({
        direction,
        newStatus,
      })
    );
  }

  // const list = (anchor: Anchor) => (
  //   <Box
  //     sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List>
  //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {["All mail", "Trash", "Spam"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );
console.log('bruh ',productsAddedToCart,"run forest",productsAddedToCartList)
  function returnFitTypeMenu() {
    // drawersMenuTypeState

    const menuTypes: { [menuType: string]: () => any } = {
      cart: () => {
        return (
          <div className="cart-menu-container">
            {productsAddedToCart >= 1 && (
              <div className="cart-menu-products">
              <div className="cart-menu-product-has-items">
                                <div className="flex justify-between p-7 cart-header-container border-b border-[#1B8A8E]">
                  <div className="flex items-center gap-2 cart-icon-tite">
                    <ShoppingBagOutlinedIcon fontSize="small" />
                    <div className="cart-title flex gap-1">
                      <div className="item-tittle">{productsAddedToCart >= 1 ? "Items" : "Item"}</div>
                      <div className="number-items">{productsAddedToCart}</div>
                    </div>
                  </div>
                  <div className="cursor-pointer close-cart-menu">
                    <CloseOutlinedIcon
                      onClick={() => {
                        changeLeftDrawerState(false, "right");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="start-shopping-action-container">
                <div className="product-list p-7">
                {productsAddedToCartList.map((productObject:any,cartProductIndex:number)=><ProductItemCart key={cartProductIndex + "cart" + useid} productCartIndex={cartProductIndex} productAdded={productObject}/>)}

                </div>
              </div>
              </div>

            )}

            {productsAddedToCart <= 0 && (
              <div className="cart-menu-empty">
                <div className="flex justify-between p-7 cart-header-container border-b border-[#1B8A8E]">
                  <div className="flex items-center gap-2 cart-icon-tite">
                    <ShoppingBagOutlinedIcon fontSize="small" />
                    <div className="cart-title">CART</div>
                  </div>
                  <div className="cursor-pointer close-cart-menu">
                    <CloseOutlinedIcon
                      onClick={() => {
                        changeLeftDrawerState(false, "right");
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center pt-[14em] start-shopping-action-container">
                  <div className="flex flex-col gap-4 cart-is-empty-info-action">
                    <div className="font-sans font-medium text-center info-empty-cart">
                      Your cart is empty
                    </div>
                    <Link
                      onClick={() => {
                        changeLeftDrawerState(false, "right");
                      }}
                      to="/dance-gavin-dance-edyego-clone/collections/dance-gavin-dance"
                      className=" text-white tracking-wider start-shopping-buton-action fill-animation login-button button-action p-4 bg-[#E6433C]"
                    >
                      START SHOPPIMNG
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      },
      search: () => {
        return <div className="search-menu-container">search placeholder</div>;
      },
    };
    return menuTypes[drawersMenuTypeState]();
  }

  return (
    <div className="w-0 h-0">
      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={drawersState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              "& .MuiPaper-root": {
                width: "33%",
              },
            }}
          >
            <div className="h-full bg-[#22BDC3] menu-container ">
              {returnFitTypeMenu()}
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
