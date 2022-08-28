import { useSelector, useDispatch } from "react-redux";
import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeShippingMethodSelected } from "../../../../store/checkout";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FitCurrencyIcon from "../../../../composables/generalHelpers/FitCurrencyIcon";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface ShippingInputsProps {}

const ShippingInputs: React.FC<ShippingInputsProps> = () => {
  const useid = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const informationsCheckout = useSelector(
    (state: any) => state.checkout.informationsPage
  );

  const shippingMethodSelected = useSelector(
    (state: any) => state.checkout.shippingMethodSelected
  );
  const shippingMethodsList = useSelector(
    (state: any) => state.checkout.shippingMethodsList
  );

  const { name, priceValue, currencySelected, indexValue } =
    shippingMethodSelected;

  return (
    <div className="shipping-inputs-container h-[100vh]">
      <div className="shipping-inputs">
        <div className="shipping-informations-and-contact-container">
          <div className="shipping-information-and-contact bg-white rounded-md mb-12">
            <div className="contact flex flex-wrap justify-between p-2 items-center ">
              <div className="first-half w-[63%] flex flex-col lg:flex-col xl:flex-row lg:items-start gap-1 sm:gap-0 sm:flex-row sm:justify-between sm:items-center">
                <div className="title-contact font-sans font-bold">Contact</div>
                <div className="email-text font-sans">
                  {informationsCheckout.email}
                </div>
              </div>

              <Link
                className="text-[#39C4C9] font-sans font-medium text-right"
                to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Information&changeInput=email"
              >
                Change
              </Link>
            </div>
            <div className="ship-to flex flex-wrap justify-between items-center  border-t border-[#D9D9D9] p-2">
              <div className="first-half w-[73%] flex flex-col lg:flex-col xl:flex-row lg:items-start gap-1 sm:gap-0 sm:flex-row sm:justify-between sm:items-center">
                <div className="title-ship-to font-sans font-bold">Ship to</div>
                <div className="shipt-to-text font-sans">
                  {informationsCheckout.address}, {informationsCheckout.city},
                  {informationsCheckout.postalCode},
                  {informationsCheckout.country}
                </div>
              </div>

              <Link
                className="text-[#39C4C9] font-sans font-medium text-right"
                to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Information&changeInput=address"
              >
                Change
              </Link>
            </div>
          </div>
        </div>
        <div className="shipping-method-selector-container bg-white rounded-md mb-12">
          {shippingMethodsList.map(
            (shippingMethodObject: any, indexShippingMethod: number) => {
              const previousElementFromTheListIsNotExisting =
                shippingMethodsList[indexShippingMethod - 1] == null;
              // if previous element does not exist do not add a border on top

              return (
                <div
                  className={`first shipping method flex justify-between cursor-pointer py-4 px-2 ${
                    previousElementFromTheListIsNotExisting
                      ? ""
                      : "border-t border-[#D9D9D9]"
                  }`}
                  key={useid + indexShippingMethod}
                  onClick={() => {
                    dispatch(
                      changeShippingMethodSelected({
                        ...shippingMethodObject,
                        indexValue: indexShippingMethod,
                      })
                    );
                  }}
                >
                  <div className="info-shipping-method-package flex gap-2">
                    <div className="selected-icon">
                      {indexShippingMethod === indexValue && (
                        <RadioButtonCheckedIcon />
                      )}
                      {indexShippingMethod !== indexValue && (
                        <RadioButtonUncheckedIcon />
                      )}
                    </div>
                    <div className="title-packeage font-sans font-medium">
                      {shippingMethodObject.name}
                    </div>
                  </div>
                  <div className="price flex gap-2 items-center">
                    <div className="price-currency">
                      <FitCurrencyIcon
                        productsSelectedCurrency={
                          shippingMethodObject.currencySelected
                        }
                      />
                    </div>
                    <div className="price-number font-sans font-medium">
                      {shippingMethodObject.priceValue}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="actions-buttons-container flex flex-wrap  gap-4 sm:gap-0 lg:gap-4 justify-between items-center px-10">
        <div className="return-to-shop-button">
          <Link
            className="return-shop-button font-sans flex items-center gap-2 text-[#21A7AC] hover:text-[#22BDC3]"
            to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Information"
          >
            <div>
              <KeyboardArrowLeftIcon />
            </div>
            <div> Return to information</div>
          </Link>
        </div>
        <div className="continue-to-shipping">
          <div
            onClick={() => {
              navigate(
                "/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Payment"
              );
            }}
            className="continue-to-shipping text-white cursor-pointer font-sans font-medium p-5 bg-[#22BDC3] hover:bg-[#21A7AC] transition-all duration-150 rounded-md"
          >
            Continue to payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInputs;
