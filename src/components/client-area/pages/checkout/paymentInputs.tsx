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
import { updateUserOrderObject } from "../../../../store//users";
import { refreshCheckoutToDefaultStates } from "../../../../store/checkout";
import { sendEmail } from "../../../../composables/emailSender"; // testing email sender

interface PaymentInputsProps {
  totalToPayNumber: number;
}

const PaymentInputs: React.FC<PaymentInputsProps> = ({ totalToPayNumber }) => {
  // when you place an order that product must have the productQuantityAvailable decremented and the sold property incremented !!!!
  // and add to the user object in the orders property the order that he made in store

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

  const totalQuantityItems = useSelector(
    (state: any) => state.cart.totalQuantityItems
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
  const checkoutOrderProcessedMadeEmailMessage = useSelector(
    (state: any) => state.checkout.orderProcessedMadeEmailMessage
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
    const informationsCheckoutEntries = Object.entries(informationsCheckout);

    for (const inputKeyValuePair of informationsCheckoutEntries) {
      const inputvalue = inputKeyValuePair[1];
      if (
        inputvalue == null &&
        inputKeyValuePair[0] !== "phone" &&
        inputKeyValuePair[0] !== "company"
      ) {
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

    const { error, data } = await proccessPayment({
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
        totalQuantityItems,
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

    // updateUserOrderObject , totalQuantityItems
    if (data) {
      // add order
      dispatch(
        updateUserOrderObject({
          orderId: data.orderId,
          orderObject: data.orderObject,
        })
      );
    }

    setPaymentMessage("Order");
    setTimeout(() => {
      setPaymentMessage("Order was proccessed");
    }, 3000);
    // left here

    if (typeof authUser?.uid === "string") {
      // if there is a user logged in then update his cart
      const { error } = await clearUserCart(authUser.uid);

      if (error) {
        setPaymentMessage("Error on clearing your cart");
        setTimeout(() => {
          setPaymentMessage("");
        }, 3000);
        return;
      }
      // send logged user email
      // totalToPayNumber, productsSelectedCurrency,productOrderedList.length
      //totalQuantityItems
      await sendEmail({
        emailNameReceiver: authUser.email,
        message: `${checkoutOrderProcessedMadeEmailMessage} , you have ordered ${totalQuantityItems} products with a 
        total of  ${totalToPayNumber} ${productsSelectedCurrency}s to pay`,
        userNameReceiver: informationsCheckout.firstName, // here use authUser.firstName
      });
      dispatch(refreshCartToDefaultStates());
      dispatch(refreshCheckoutToDefaultStates());
      navigate("/dance-gavin-dance-edyego-clone");
      return;
    }
    // send not logged user email with payment been proccessed
    await sendEmail({
      emailNameReceiver: informationsCheckout.email,
      message: `${checkoutOrderProcessedMadeEmailMessage} , you have ordered ${productOrderedList.length} products with a 
        total of  ${totalToPayNumber} ${productsSelectedCurrency}s to pay`,
      userNameReceiver: informationsCheckout.firstName,
    });

    dispatch(refreshCartToDefaultStates());
    dispatch(refreshCheckoutToDefaultStates());

    navigate("/dance-gavin-dance-edyego-clone");

    // clean the cart ,the checkout, from local storage and from database if there is a user logged in
    // send an email
  }

  return (
    <div className="payment-inputs-container h-[100vh]">
      <div className="payment-list">
        <div className="payment-informations-and-contact-container">
          <div className="payment-information-and-contact bg-white rounded-md">
            <div className="contact flex justify-between p-2">
              <div className="title-contact font-sans font-bold">Contact</div>
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
            <div className="ship-to flex justify-between border-t border-[#D9D9D9] p-2">
              <div className="title-ship-to font-sans font-bold">Ship to</div>
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

            <div className="ship-method flex justify-between border-t border-[#D9D9D9] p-2">
              <div className="title-shipping-to font-sans font-bold">
                Method
              </div>
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
        {typeof authUser?.uid === "string" && (
          <PaymentRememberMe
            rememberMe={rememberMe.current}
            setRememberMe={setNewValueRememberMe}
          />
        )}
      </div>
      <div className="actions-buttons-container flex justify-between items-center mt-12">
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
              if (openStatusBackdrop) {
                // if there is a payment in proccess then don t start another one
                return;
              }
              handlePayNow();
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
