import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageWebp from "../components/general-helpers/ImageWebp";
import { useId } from "react";
import ProductItemCart from "../composables/generalHelpers/productItemCart";
import navMiddleImageWbp from "../images/left-nav-bar-logo.webp";
import navMiddleImagePng from "../images/nav-bar-middle-logo.png";
import BreadCrums from "../composables/pages/breadCrumb";
import FitCurrencyIcon from "../composables/generalHelpers/FitCurrencyIcon";

import InformationInputs from "../components/client-area/pages/checkout/informationInputs";
import ShippingInputs from "../components/client-area/pages/checkout/shippingInputs";
import PaymentInput from "../components/client-area/pages/checkout/paymentInputs";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";

interface CheckOutPageProps {}

const CheckOutPage: React.FC<CheckOutPageProps> = () => {
  // reset cart at the end
  const dispatch = useDispatch();
  const useid = useId();
  const searchQuaerys = useLocation().search;
  const navigate = useNavigate();

  const checkoutStep = new URLSearchParams(searchQuaerys).get("checkoutStep");

  if (checkoutStep == null) {
    navigate(
      "/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Information"
    );
  }

  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const shippingProtectionChecked = useSelector(
    (state: any) => state.cart.shippingProtectionChecked
  );

  const productsAddedToCartList = useSelector(
    (state: any) => state.cart.productsAddedToCart
  );

  function returnFitStepPage() {
    if (checkoutStep == null) {
      return "";
    }
    const stepsPagesTypes: { [checkoutType: string]: any } = {
      Information: <InformationInputs />,
      Shipping: <ShippingInputs />,
      Payment: <PaymentInput />,
    };

    return stepsPagesTypes[checkoutStep];
  }

  // if there are not information in the preceding part of the checkout then the next one can not be access

  const breadcrumbs = [
    <div className="back-to-shopping ">
      <Link to="/dance-gavin-dance-edyego-clone">Shop</Link>
    </div>,
    <div className="information-link">
      {checkoutStep !== "Information" ? (
        <Link to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Information">
          Information
        </Link>
      ) : (
        "Information"
      )}
    </div>,

    <div className="shipping-link">
      {checkoutStep !== "Shipping" ? (
        <Link to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Shipping">
          Shipping
        </Link>
      ) : (
        "Shipping"
      )}
    </div>,

    <div className="payment-link">
      {checkoutStep !== "Payment" ? (
        <Link to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Payment">
          Payment
        </Link>
      ) : (
        "Payment"
      )}
    </div>,
  ];

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

  const totalPriceWithoutTaxes = calculateTotalPrice();
  const shippingTaxes = 8;

  return (
    <div className="checkout-page-container flex ">
      <div className="shipping-methods-container bg-[#1A1A1A] w-[60%]">
        <div className="content-container">
          <div className="checkout__header">
            <div className="band-name-header">
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
            <div className="bread-crumbs-container ">
              <BreadCrums breadcrumbs={breadcrumbs} />
            </div>
          </div>
          <div className="checkout__steps-container">{returnFitStepPage()}</div>
        </div>
      </div>
      <div className="products-details-and-total-container bg-[#22BDC3] w-[50%]">
        <div className="products-list-container text-white">
          {productsAddedToCartList.map(
            (productObject: any, cartProductIndex: number) => {
              return (
                <ProductItemCart
                  showQuantityOnPictureStylesClasses={
                    "p-1 rounded-full absolute top-0 left-0 text-white font-sans bg-gray-700"
                  }
                  hideActionsContainer={true}
                  key={cartProductIndex + "checkout" + useid}
                  productCartIndex={cartProductIndex}
                  productAdded={productObject}
                />
              );
            }
          )}
        </div>
        <div className="subtotal-container text-white">
          <div className="subtotal flex justify-between items-center">
            <div className="title-left">Subtotal</div>
            <div className="price-right flex gap-1 items-center">
              {/* totalPriceWithoutTaxes */}
              <div className="currency">
                <FitCurrencyIcon
                  productsSelectedCurrency={productsSelectedCurrency}
                />
              </div>
              <div className="price">{totalPriceWithoutTaxes}</div>
            </div>
          </div>
          <div className="shipping-info flex justify-between items-center">
            <div className="title-left flex gap-2 items-center">
              <div>Shipping</div>
              <HelpOutlinedIcon fontSize="small" />
            </div>
            <div className="info-right">Calculated at next step</div>
          </div>
          <div className="estimated-taxes flex justify-between items-center ">
            <div className="title-left">
              Taxes {"("}estimated{")"}
            </div>
            <div className="price-right flex gap-1 items-center">
              <div className="currency">
                <FitCurrencyIcon
                  productsSelectedCurrency={productsSelectedCurrency}
                />
              </div>
              <div className="price">{shippingTaxes}</div>
            </div>
          </div>
        </div>
        <div className="total-container text-white">
          <div className="title-left">Total</div>
          <div className="price-right flex gap-1 items-center">
            <div className="currency">
              <FitCurrencyIcon
                productsSelectedCurrency={productsSelectedCurrency}
              />
            </div>
            <div className="price">
              {totalPriceWithoutTaxes + shippingTaxes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
