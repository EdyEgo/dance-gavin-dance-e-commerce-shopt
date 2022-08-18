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

  const shippingMethodSelected = useSelector(
    (state: any) => state.checkout.shippingMethodSelected
  );
  // const shippingProtectionChecked = useSelector(
  //   (state: any) => state.cart.shippingProtectionChecked
  // );

  const productsAddedToCartList = useSelector(
    (state: any) => state.cart.productsAddedToCart
  );

  const informationsCheckout = useSelector(
    (state: any) => state.checkout.informationsPage
  );

  function verifyInputsValuesValid() {
    if (
      informationsCheckout.email == null ||
      informationsCheckout.firstName == null ||
      informationsCheckout.lastName == null ||
      informationsCheckout.address == null ||
      informationsCheckout.city == null ||
      informationsCheckout.region == null
    ) {
      return false;
    }
    const email = informationsCheckout.email.trim();
    const firstName = informationsCheckout.firstName.trim();
    const lastName = informationsCheckout.lastName.trim();
    const address = informationsCheckout.address.trim();
    const city = informationsCheckout.city.trim();
    const region = informationsCheckout.region.trim();

    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      city === "" ||
      region === ""
    ) {
      return false;
    }
    return true;
  }

  const inputsAreValid = verifyInputsValuesValid();

  // if there are not information in the preceding part of the checkout then the next one can not be access

  const breadcrumbs = [
    <div className="back-to-shopping">
      <Link
        className="text-[#21B1B6] font-sans "
        to="/dance-gavin-dance-edyego-clone"
      >
        Shop
      </Link>
    </div>,
    <div className="information-link font-sans">
      {checkoutStep !== "Information" ? (
        <div
          className="text-[#21B1B6] font-sans cursor-pointer"
          onClick={() => {
            navigate(
              "/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Information"
            );
          }}
        >
          Information
        </div>
      ) : (
        <div className="text-white font-sans">Information</div>
      )}
    </div>,

    <div className="shipping-link">
      {checkoutStep !== "Shipping" ? (
        <div
          className="text-[#21B1B6] font-sans cursor-pointer"
          onClick={() => {
            if (!inputsAreValid) {
              return;
            }
            navigate(
              "/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Shipping"
            );
          }}
          title={!inputsAreValid ? "Invalid information" : ""}
        >
          Shipping
        </div>
      ) : (
        <div className="text-white font-sans">Shipping</div>
      )}
    </div>,

    <div className="payment-link font-sans">
      {checkoutStep !== "Payment" ? (
        <div
          className="text-[#21B1B6] font-sans cursor-pointer"
          onClick={() => {
            if (!inputsAreValid) {
              return;
            }
            navigate(
              "/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Payment"
            );
          }}
          title={!inputsAreValid ? "Invalid information" : ""}
        >
          Payment
        </div>
      ) : (
        <div className="text-white font-sans">Payment</div>
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

  const priceNumberWithAllTaxes =
    totalPriceWithoutTaxes + shippingTaxes + shippingMethodSelected.priceValue;

  function returnFitStepPage() {
    if (checkoutStep == null) {
      return "";
    }
    const stepsPagesTypes: { [checkoutType: string]: any } = {
      Information: <InformationInputs />,
      Shipping: <ShippingInputs />,
      Payment: <PaymentInput totalToPayNumber={priceNumberWithAllTaxes} />,
    };

    return stepsPagesTypes[checkoutStep];
  }

  return (
    <div className="checkout-page-container flex ">
      <div className="shipping-methods-container bg-[#1A1A1A] w-[60%]">
        <div className="content-container pl-[18.5%] pr-[8%]">
          <div className="content py-5 px-7">
            <div className="checkout__header pt-10">
              <div className="band-name-header">
                <div className="band-logo-container">
                  <Link to="/dance-gavin-dance-edyego-clone">
                    <ImageWebp
                      srcWebp={navMiddleImageWbp}
                      src={navMiddleImagePng}
                      width="300"
                      height="auto"
                    />
                  </Link>
                </div>
              </div>
              <div className="bread-crumbs-container py-4">
                <BreadCrums breadcrumbs={breadcrumbs} />
              </div>
            </div>
            <div className="checkout__steps-container py-8 border-b border-[#373737]">
              {returnFitStepPage()}
            </div>
            <div className="checkout__footer pt-4">
              <div className="informations-footer">
                <div className="links-list text-[#208F94] flex gap-4 ">
                  <a
                    className="hover:text-[#22BDC3] font-sans font-medium"
                    href="https://dancegavindanceband.com/43955585175/policies/refund-policy.html?locale=en-US"
                  >
                    Refund policy
                  </a>
                  <a
                    className="hover:text-[#22BDC3] font-sans font-medium"
                    href="https://dancegavindanceband.com/43955585175/policies/shipping-policy.html?locale=en-US"
                  >
                    Shipping policy
                  </a>
                  <a
                    className="hover:text-[#22BDC3] font-sans font-medium"
                    href="https://dancegavindanceband.com/43955585175/policies/privacy-policy.html?locale=en-US"
                  >
                    Privacy policy
                  </a>
                  <a
                    className="hover:text-[#22BDC3] font-sans font-medium"
                    href="https://dancegavindanceband.com/43955585175/policies/terms-of-service.html?locale=en-US"
                  >
                    Terms of service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="products-details-and-total-container bg-[#22BDC3] w-[50%] ">
        <div className="products-details-content-container pr-[22%] pt-[8%] pl-[6%]">
          <div className="products-details-content p-5">
            <div className="products-list-container text-white flex flex-col gap-4">
              {productsAddedToCartList.map(
                (productObject: any, cartProductIndex: number) => {
                  {
                    /* cart-product-image w-[20%] for cart */
                  }
                  //
                  return (
                    <ProductItemCart
                      imageStyles="w-[12%]"
                      imageTagStyles={"rounded-md"}
                      showQuantityOnPictureStylesClasses={
                        "rounded-full absolute flex justify-center items-center -top-3 -right-3 text-white font-sans bg-[#6A7A7A] w-[40%] h-[40%]"
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
            <div className="subtotal-container text-white flex flex-col gap-2 mt-10 border-y border-[#3CC5CA] py-5">
              <div className="subtotal flex justify-between items-center">
                <div className="title-left font-sans">Subtotal</div>
                <div className="price-right flex gap-1 items-center">
                  {/* totalPriceWithoutTaxes */}
                  <div className="currency ">
                    <FitCurrencyIcon
                      productsSelectedCurrency={productsSelectedCurrency}
                    />
                  </div>
                  <div className="price ">{totalPriceWithoutTaxes}</div>
                </div>
              </div>
              <div className="shipping-info flex justify-between items-center">
                <div className="title-left flex gap-2 items-center">
                  <div className="font-sans">Shipping</div>

                  <HelpOutlinedIcon fontSize="small" />
                </div>
                <div className="info-right flex gap-1">
                  <div className="currency">
                    {checkoutStep !== null &&
                      checkoutStep !== "Information" && (
                        <FitCurrencyIcon
                          productsSelectedCurrency={productsSelectedCurrency}
                        />
                      )}
                  </div>
                  <div className="price">
                    {checkoutStep === null || checkoutStep === "Information"
                      ? "Calculated at next step"
                      : shippingMethodSelected.priceValue}
                  </div>
                </div>
              </div>
              <div className="estimated-taxes flex justify-between items-center">
                <div className="title-left font-sans">
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
            <div className="total-container text-white flex justify-between   pt-5">
              <div className="title-left">Total</div>
              <div className="price-right flex gap-1 items-center">
                <div className="currency">
                  <FitCurrencyIcon
                    productsSelectedCurrency={productsSelectedCurrency}
                  />
                </div>
                <div className="price">
                  {/* if the page is at Information then don t calculate the total price with the shipping taxes */}
                  {checkoutStep !== null && checkoutStep !== "Information"
                    ? priceNumberWithAllTaxes
                    : totalPriceWithoutTaxes + shippingTaxes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
