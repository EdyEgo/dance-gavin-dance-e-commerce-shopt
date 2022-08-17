import { useSelector, useDispatch } from "react-redux";
import { useId, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FitCurrencyIcon from "../../../../composables/generalHelpers/FitCurrencyIcon";
import Backdrop from "../../../../composables/generalHelpers/backdrop";
import Snackbar from "../../../../composables/generalHelpers/snackbar";
import PaymentRememberMe from "./rememberPaymentInfoCheckbox";
import {
  proccessPayment,
  clearUserCart,
} from "../../../../api/dataBaseCartMethods";
import { refreshCartToDefaultStates } from "../../../../store/cart";
import { refreshCheckoutToDefaultStates } from "../../../../store/checkout";

interface PaymentInputsProps {
  totalToPayNumber: number;
}

const PaymentInputs: React.FC<PaymentInputsProps> = ({ totalToPayNumber }) => {
  const useid = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state: any) => state.auth.user);

  const [openStatusSnackbar, setOpenStatusSnackbar] = useState(false);
  const [openStatusBackdrop, setOpenStatusBackdrop] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string>("");

  const rememberMe = useRef(false);

  function setNewValueRememberMe(newValueForRememberMe: boolean) {
    rememberMe.current = newValueForRememberMe;
  }

  const shippingProtectionChecked = useSelector(
    (state: any) => state.cart.shippingProtectionChecked
  );

  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const productOrderedList = useSelector(
    (state: any) => state.cart.productsAddedToCart
  );

  const informationsCheckout = useSelector(
    (state: any) => state.checkout.informationsPage
  );

  const shippingMethodSelected = useSelector(
    (state: any) => state.checkout.shippingMethodSelected
  );

  const cardDetails = useRef({
    cardName: "",
    cardNumber: null,
    expirationDate: "",
    securityDate: "",
  });

  function informationsCheckoutAreValid() {
    //  const {
    //   address,
    //   apartament,
    //   city,
    //   company,

    //   email,
    //   firstName,
    //   lastName,
    //   region,
    //   phone,
    //   postalCode,
    //  } = informationsCheckout

    const informationsCheckoutEntries = Object.entries(informationsCheckout);

    for (const inputKeyValuePair of informationsCheckoutEntries) {
      const inputvalue = inputKeyValuePair[1];
      if (inputvalue == null) {
        return false;
      }
    }

    return true;
  }

  async function handlePayNow() {
    const informationsAreValid = informationsCheckoutAreValid();

    if (!informationsAreValid) {
      return;
    }

    // you only need the id of the product the the whole object soooooooooo productOrderedList has the products object
    setOpenStatusBackdrop(true);
    //setPaymentMessage if the payment was successfull
    // refresh the cart and checkout store

    const { error } = await proccessPayment({
      rememberMe: rememberMe.current,
      accountLoggedInUid:
        typeof authUser?.uid === "string" ? authUser?.uid : null,
      proccessPaymentObject: {
        totalToPay: { totalToPayNumber, productsSelectedCurrency },
        cardDetails: cardDetails.current,
        productOrderedList: productOrderedList.map((productObject: any) => {
          return {
            id: productObject.id,
            sizeSelected: productObject.sizeSelected,
            quantity: productObject.quantity,
            totalQuantityPrice: productObject.totalQuantityPrice,
          };
        }),
        shippingMethod: {
          name: shippingMethodSelected.name,
          priceValues: {
            currencySelected: shippingMethodSelected.currencySelected,
            priceNumber: shippingMethodSelected.priceValue,
          },
        },
        taxes: {
          currencySelected: productsSelectedCurrency,
          priceNumber: 8,
        },
        shippingProtectionChecked,
        checkoutInformation: informationsCheckout,
      },
    });

    setOpenStatusBackdrop(false);

    if (error) {
      setPaymentMessage("Error on proccessesing the order");
      setTimeout(() => {
        setPaymentMessage("");
      }, 3000);
      return;
    }

    setPaymentMessage("Order");
    setTimeout(() => {
      setPaymentMessage("Order was proccessed");
    }, 3000);
    // left here

    dispatch(refreshCartToDefaultStates());
    dispatch(refreshCheckoutToDefaultStates());

    if (typeof authUser?.uid === "string") {
      // if there is a user logged in then update his cart
      const { error } = await clearUserCart(authUser.uid);
      if (error) {
        setPaymentMessage("Error on clearing your cart");
        setTimeout(() => {
          setPaymentMessage("");
        }, 3000);
      }
    }

    navigate("/dance-gavin-dance-edyego-clone");
    // clean the cart ,the checkout, from local storage and from database if there is a user logged in
    // send an email
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
        {/* no point in adding a card really */}
        {/* <div className="card-inputs-container  rounded-md">
          <div className="card-inputs__title text-white">
            <div className="title">
              <div className="first-title font-sans font-extrabold">
                Payment
              </div>
              <div className="second-title font-sans">
                All transactions are secure and encrypted.
              </div>
            </div>
          </div>
          <div className="inputs-list bg-white rounded-md">
<div className="inputs-list__title">

</div>
          </div>
        </div> */}
        <PaymentRememberMe
          rememberMe={rememberMe.current}
          setRememberMe={setNewValueRememberMe}
        />
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

      <Snackbar
        setOpen={setOpenStatusSnackbar}
        open={openStatusSnackbar}
        message={paymentMessage}
      />
    </div>
  );
};

export default PaymentInputs;
