import { useSelector, useDispatch } from "react-redux";
import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FitCurrencyIcon from "../../../../composables/generalHelpers/FitCurrencyIcon";
import Backdrop from "../../../../composables/generalHelpers/backdrop";
import Snackbar from "../../../../composables/generalHelpers/snackbar";

interface PaymentInputsProps {}

const PaymentInputs: React.FC<PaymentInputsProps> = () => {
  const useid = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openStatusSnackbar, setOpenStatusSnackbar] = useState(false);
  const [openStatusBackdrop, setOpenStatusBackdrop] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string>("");

  const informationsCheckout = useSelector(
    (state: any) => state.checkout.informationsPage
  );

  const shippingMethodSelected = useSelector(
    (state: any) => state.checkout.shippingMethodSelected
  );

  async function handlePayNow() {
    setOpenStatusBackdrop(true);
    //setPaymentMessage if the payment was successfull
    // refresh the cart and checkout store
  }

  return (
    <div className="payment-inputs-container">
      <div className="payment-list">
        <div className="payment-informations-and-contact-container">
          <div className="payment-information-and-contact bg-white rounded-md">
            <div className="contact flex justify-between">
              <div className="title-contact">Contact</div>
              <div className="email-text font-sans font-medium">
                {informationsCheckout.email}
              </div>
              <Link
                className="text-[#39C4C9] font-sans font-medium"
                to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Information&changeInput=email"
              >
                Change
              </Link>
            </div>
            <div className="ship-to flex justify-between border-t border-[#D9D9D9]">
              <div className="title-ship-to">Ship to</div>
              <div className="ship-to-text font-sans font-medium">
                {informationsCheckout.address}, {informationsCheckout.city},{" "}
                {informationsCheckout.postalCode},{" "}
                {informationsCheckout.country}
              </div>
              <Link
                className="text-[#39C4C9] font-sans font-medium"
                to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Shipping"
              >
                Change
              </Link>
            </div>

            <div className="ship-method flex justify-between border-t border-[#D9D9D9]">
              <div className="title-shipping-to">Method</div>
              <div className="shipping-method-container flex gap-2">
                <div className="name font-sans font-medium">
                  {shippingMethodSelected.name}
                </div>
                <div className="price-container flex items-center gap-1">
                  <FitCurrencyIcon
                    productsSelectedCurrency={
                      shippingMethodSelected.currencySelected
                    }
                  />

                  <div className="price-number font-sans font-medium">
                    {shippingMethodSelected.priceValue}
                  </div>
                </div>
              </div>
              <Link
                className="text-[#39C4C9] font-sans font-medium"
                to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Shipping"
              >
                Change
              </Link>
            </div>
          </div>
        </div>
        <div className="shipping-method-selector-container bg-white rounded-md"></div>
      </div>
      <div className="actions-buttons-container flex justify-between items-center">
        <div className="return-to-shop-button">
          <Link
            className="return-shop-button font-sans flex items-center gap-2 text-[#21A7AC] hover:text-[#22BDC3]"
            to="/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Shipping"
          >
            <div>
              <KeyboardArrowLeftIcon />
            </div>
            <div> Return to shipping</div>
          </Link>
        </div>
        <div className="continue-to-shipping">
          <div
            onClick={() => {
              handlePayNow();
              // add backdrop from material ui https://mui.com/material-ui/react-backdrop/
              // add a snack bar to show that you order has been processed https://mui.com/material-ui/react-snackbar/
            }}
            className="continue-to-shipping text-white font-medium cursor-pointer font-sans p-5 bg-[#22BDC3] hover:bg-[#21A7AC] transition-all duration-150 rounded-md"
          >
            Pay now
          </div>
        </div>
      </div>
      <Backdrop setOpen={setOpenStatusBackdrop} open={openStatusBackdrop} />
      ,
      <Snackbar
        setOpen={setOpenStatusSnackbar}
        open={openStatusSnackbar}
        message={paymentMessage}
      />
    </div>
  );
};

export default PaymentInputs;
