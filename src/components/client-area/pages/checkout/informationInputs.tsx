import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import CheckoutInput from "../../../../composables/generalHelpers/checkoutInput";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { changeInformationsPage } from "../../../../store/checkout";

interface InformationInputsProps {}

const InformationInputs: React.FC<InformationInputsProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuaerys = useLocation().search;

  const informationsCheckout = useSelector(
    (state: any) => state.checkout.informationsPage
  );

  const {
    email,
    country,
    firstName,
    lastName,
    company,
    address,
    apartament,
    postalCode,
    city,
    region,
    phone,
  } = informationsCheckout;

  const changeInput = new URLSearchParams(searchQuaerys).get("changeInput");

  const inputsValues = React.useRef<any>({
    email,
    country,
    firstName,
    lastName,
    company,
    address,
    apartament,
    postalCode,
    city,
    region,
    phone,
  });

  // inputName

  function changeInputsValues(newValue: any, inputName: string) {
    inputsValues.current[inputName] = newValue;
  }

  // function setCheckoutStoreValues(event:any,typeInput: | "email"
  // | "country"
  // | "firstName"
  // | "lastName"
  // | "company"
  // | "address"
  // | "apartament"
  // | "postcode"
  // | "region"
  // | "city"
  // | "phone") {

  //   // const typesCheckoutInformationStore = {
  //   //   email: () => {},
  //   //   country: () => {},
  //   //   firstName: () => {},
  //   //   lastName: () => {},
  //   //   company: () => {},
  //   //   apartament: () => {},
  //   //   postalCode: () => {},
  //   //   city: () => {},
  //   //   region: () => {},
  //   //   phone: () => {},
  //   // };

  // dispatch(
  //   changeInformationsPage({
  //     informationType:typeInput,
  //     newInformationValue:event.target.value
  //   })
  // )

  // }

  const adreessInputRef = React.useRef<any>(null);

  const emailInputRef = React.useRef<any>(null);

  function focusInputsOnChangeQueryURL() {
    if (changeInput == null) {
      return;
    }

    const queryTypes: { [queryType: string]: () => void } = {
      email: () => {
        if (emailInputRef.current?.focus == null) {
          return;
        }
        emailInputRef.current.focus();
      },
      address: () => {
        if (adreessInputRef.current?.focus == null) {
          return;
        }
        adreessInputRef.current.focus();
      },
    };
    const queryTypeExist = Object.hasOwn(queryTypes, changeInput);
    if (!queryTypeExist) {
      return;
    }

    queryTypes[changeInput]();
  }

  React.useEffect(() => {
    focusInputsOnChangeQueryURL();
  }, []);

  function verifyInputsValuesValid() {
    const email = inputsValues.current.email.trim();
    const firstName = inputsValues.current.firstName.trim();
    const lastName = inputsValues.current.lastName.trim();
    const address = inputsValues.current.address.trim();
    const city = inputsValues.current.city.trim();
    const region = inputsValues.current.region.trim();

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

  function addInformationsToCheckoutStore() {
    Object.entries(inputsValues.current).forEach(
      ([inputName, inputValue]: any) => {
        dispatch(
          changeInformationsPage({
            informationType: inputName,
            newInformationValue: inputValue,
          })
        );
      }
    );
  }

  return (
    <div className="informations-container text-white">
      <div className="contact-informations-container">
        <div className="contact-informations__header">
          <div>Contact Information</div>
          <div>
            Already have an account?
            <Link to="/dance-gavin-dance-edyego-clone/login">Log in</Link>
          </div>
        </div>
        <div className="email-input-container">
          <CheckoutInput
            labelName={"Email"}
            inputRef={emailInputRef}
            setValue={changeInputsValues}
            inputName={"email"}
            type={"email"}
            value={inputsValues.current.email}
          />
        </div>

        <div className="shipping-informations-container">
          <div className="shipping-informations__title">
            <div className="title">Shipping address</div>
          </div>
          <div className="shipping-informations__inputs-container">
            <div className="country-container">
              <CheckoutInput
                labelName={"Country"}
                setValue={changeInputsValues}
                inputName={"country"}
                type={"text"}
                value={inputsValues.current.country}
              />
            </div>

            <div className="full-name-container flex gap-1 justify-center">
              <div className="first-name">
                <CheckoutInput
                  labelName={"First name"}
                  setValue={changeInputsValues}
                  inputName={"firstName"}
                  type={"text"}
                  value={inputsValues.current.firstName}
                />
              </div>
              <div className="last-name">
                <CheckoutInput
                  labelName={"Last name"}
                  setValue={changeInputsValues}
                  inputName={"lastName"}
                  type={"text"}
                  value={inputsValues.current.lastName}
                />
              </div>
            </div>

            <div className="company-name-container">
              <CheckoutInput
                labelName={"Company (optional)"}
                setValue={changeInputsValues}
                inputName={"company"}
                type={"text"}
                value={inputsValues.current.company}
              />
            </div>

            <div className="address-container">
              <CheckoutInput
                labelName={"Address"}
                inputRef={adreessInputRef}
                setValue={changeInputsValues}
                inputName={"address"}
                type={"text"}
                value={inputsValues.current.address}
              />
            </div>

            <div className="apartament-container">
              <CheckoutInput
                labelName={"Apartament, suite, etc.(optional)"}
                setValue={changeInputsValues}
                inputName={"apartament"}
                type={"text"}
                value={inputsValues.current.apartament}
              />
            </div>
            <div className="address-city-container flex gap-1 justify-center">
              <div className="postal-code">
                <CheckoutInput
                  labelName={"Postal code"}
                  setValue={changeInputsValues}
                  inputName={"postalCode"}
                  type={"text"}
                  value={inputsValues.current.postalCode}
                />
              </div>
              <div className="city">
                <CheckoutInput
                  labelName={"City"}
                  setValue={changeInputsValues}
                  inputName={"city"}
                  type={"text"}
                  value={inputsValues.current.city}
                />
              </div>
              <div className="region">
                <CheckoutInput
                  labelName={"Region"}
                  setValue={changeInputsValues}
                  inputName={"region"}
                  type={"text"}
                  value={inputsValues.current.region}
                />
              </div>
            </div>

            <div className="phone-container">
              <CheckoutInput
                labelName={"Phone (optional)"}
                setValue={changeInputsValues}
                inputName={"phone"}
                type={"number"}
                value={inputsValues.current.phone}
              />
            </div>
          </div>
        </div>

        <div className="actions-buttons-container flex justify-between items-center">
          <div className="return-to-shop-button">
            <Link
              className="return-shop-button font-sans flex items-center gap-2 text-[#21A7AC] hover:text-[#22BDC3]"
              to="/dance-gavin-dance-edyego-clone"
            >
              <div>
                <KeyboardArrowLeftIcon />
              </div>
              <div> Return to shop</div>
            </Link>
          </div>
          <div className="continue-to-shipping">
            <div
              onClick={() => {
                const inputsAreValid = verifyInputsValuesValid();

                if (!inputsAreValid) {
                  return;
                }

                addInformationsToCheckoutStore();

                navigate(
                  "/dance-gavin-dance-edyego-clone/checkout?checkoutStep=Shipping"
                );
              }}
              className="continue-to-shipping cursor-pointer font-sans font-medium p-5 bg-[#22BDC3] hover:bg-[#21A7AC] transition-all duration-150 rounded-md"
            >
              Continue to shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationInputs;
