import * as React from "react";
// import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import CircularProgress from "@mui/material/CircularProgress";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ShippingIcon from "../../../images/shipping/RoutePlusGray.svg";
import MenuOptionsDrawer from "./menuOptionsDrawer";

import {
  changeDrawerStateByDirectionId,
  // changeDrawerTypeMenu,
} from "../../../store/drawers";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ProductItemCart from "../../../composables/generalHelpers/productItemCart";

import ShippingSwitch from "../../../composables/generalHelpers/shippingSwitch";
import FitCurrencyIcon from "../../../composables/generalHelpers/FitCurrencyIcon";
import SearchProducts from "./searchProducts";

type Anchor = "top" | "left" | "bottom" | "right";

export default function LeftMenuDrawer() {
  const dispatch = useDispatch();
  const useid = React.useId();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const drawersState = useSelector((state: any) => state.drawers.drawers);
  const drawersMenuTypeState = useSelector(
    (state: any) => state.drawers.menuType
  );

  const productsAddedToCart = useSelector(
    (state: any) => state.cart.productsAddedToCart.length
  );

  const totalQuantityItems = useSelector(
    (state: any) => state.cart.totalQuantityItems
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

  function calculateTotalPrice() {
    // .totalQuantityPrice
    const totalPrice = productsAddedToCartList.reduce(
      (prev: any, curr: any) => {
        const prevPlusCurrentProductPrice = prev + curr.totalQuantityPrice;

        return prevPlusCurrentProductPrice;
      },
      0
    );

    return totalPrice;
  }

  async function checkOut() {
    // left here

    setLoading(true);
    if (productsAddedToCartList.length <= 0) {
      setLoading(false);

      return;
    }

    setLoading(false);
    dispatch(
      changeDrawerStateByDirectionId({
        direction: "right",
        newStatus: false,
      })
    );
    navigate(
      "/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Information"
    );
  }

  function returnFitTypeMenu() {
    const menuTypes: { [menuType: string]: () => any } = {
      cart: () => {
        return (
          <div className="cart-menu-container bg-[#22BDC3]">
            {productsAddedToCart >= 1 && (
              <div className="cart-menu-products">
                <div className="cart-menu-product-has-items">
                  <div className="flex justify-between p-7 cart-header-container border-b border-[#1B8A8E]">
                    <div className="flex items-center gap-2 cart-icon-tite">
                      <ShoppingBagOutlinedIcon fontSize="small" />
                      <div className="cart-title flex gap-1">
                        <div className="item-tittle">
                          {totalQuantityItems >= 1 ? "Items" : "Item"}
                        </div>
                        <div className="number-items">{totalQuantityItems}</div>
                      </div>
                    </div>
                    <div className="cursor-pointer close-cart-menu">
                      <CloseOutlinedIcon
                        onClick={() => {
                          changeLeftDrawerState(false, "right");
                          changeLeftDrawerState(false, "left");
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="start-shopping-action-container ">
                  <div className="product-list p-7 flex flex-col gap-7">
                    {productsAddedToCartList.map(
                      (productObject: any, cartProductIndex: number) => (
                        <ProductItemCart
                          key={cartProductIndex + "cart" + useid}
                          productCartIndex={cartProductIndex}
                          productAdded={productObject}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="cart-checkout-container border-t border-[#1B8A8E] pt-4 p-7">
                  <div className="checkout-header">
                    <div className="main-header-title font-sans">
                      Shipping & taxes calculated at checkout
                    </div>
                    <div className="shipping-protection-container ">
                      {/* p-2 */}
                      <div className="swith-container p-2 flex gap-2 items-center ">
                        <div className="shipping-protection-info flex items-center gap-2 justify-center">
                          <div className="icon-shipping-container">
                            <img src={ShippingIcon} alt="" />
                          </div>
                          <div className="second-part pt-1">
                            <div className="title font-sans font-semibold text-[0.8rem]">
                              Shipping Protection
                            </div>
                            <div className="second-title  flex gap-1">
                              <div className="second-title__text-checkout font-sans text-[0.6rem]">
                                from Damage, Loss & Theft for
                              </div>
                              <div className=" font-sans text-[0.6rem] font-bold">
                                $ 3
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="shipping-protection-switch-button">
                          <ShippingSwitch />
                        </div>
                      </div>
                      <div className="note font-sans text-[0.6rem]">
                        *By turning off package protection, Dance Gavin Dance is
                        not liable for lost, damaged, or stolen items
                      </div>
                    </div>
                  </div>

                  <div className="checkout-main-info py-10 flex flex-col gap-8">
                    <div className="first-message font-sans text-[0.9rem]">
                      If purchasing presale items with non-presale items, all
                      items will ship together when the presale is available.
                    </div>
                    <div className="secodn-message font-sans text-[0.9rem]">
                      Please place separate orders if you would like to receive
                      non-presale items first.
                    </div>
                  </div>

                  <div className="checkout-action-button-container p-7">
                    <div
                      onClick={() => {
                        checkOut();
                      }}
                      className="checkout-button-action relative fill-animation login-button button-action p-4 bg-[#E6433C] text-white "
                    >
                      {/* <LockOutlinedIcon /> */}

                      {!loading && (
                        <div className="info-button-container flex justify-center">
                          <div className="lock-icon-container absolute top-[25%] left-[3%]">
                            <LockOutlinedIcon fontSize="small" />
                          </div>

                          <div className="second-part flex items-center justify-center gap-4">
                            <div className="checkout-text-container felx items-center">
                              {/* <div className="checkout-text text-[0.8rem] tracking-widest">
                            CHECKOUT
                          </div> */}

                              <div className=" action-btn-text text-[0.8rem] tracking-widest">
                                CHECKOUT
                              </div>
                            </div>
                            <div className="square-container h-[60%]">
                              {/* <StopIcon fontSize="small" /> */}
                              <div className="square bg-white p-[2px]"></div>
                            </div>
                            <div className="total-price flex gap-1 items-center">
                              <div className="currency-selected text-[0.8rem]">
                                <FitCurrencyIcon
                                  productsSelectedCurrency={
                                    productsSelectedCurrency
                                  }
                                />
                              </div>
                              <div className="price-number text-[0.8rem]">
                                {calculateTotalPrice()}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {loading && (
                        <div className="flex items-center justify-center loading-icon-btn">
                          <CircularProgress color="inherit" size="20px" />
                        </div>
                      )}
                    </div>
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
        return (
          <div className="search-menu-container bg-[#22BDC3]">
            <SearchProducts />
          </div>
        );
      },
      menu: () => {
        return (
          <div className="options-menu-container bg-[#22BDC3]">
            <MenuOptionsDrawer />
          </div>
        );
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
                width: window.screen.width <= 1140 ? "100%" : "33%",
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
