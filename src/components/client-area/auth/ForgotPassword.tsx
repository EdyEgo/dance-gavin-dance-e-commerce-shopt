import * as React from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";

import handleErrorMessage from "../../../api/handleErrorMessages";

import Stack from "@mui/material/Stack";

import {
  timeoutErrorSet,
  validateEmail,
  validatePasswordFormat,
} from "../../../composables/authFormHelpers";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState<any>({
    email: "",
  });

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  async function handleSubmit(event: any) {
    event.preventDefault();

    console.log("sry but for now there is no forgot password here");

    return;
    if (loading) {
      return;
    }

    setErrorMessage(null);

    if (validateEmail(values.email) === false) {
      timeoutErrorSet(setErrorMessage, "Please enter a valid email !");
      return;
    }

    setLoading(true);

    //  add here forgot password

    // setLoading(false);

    // if (signedInUserResponse.error) {
    //   timeoutErrorSet(
    //     setErrorMessage,
    //     handleErrorMessage(signedInUserResponse.message),
    //     5000
    //   );
    //   return;
    // }

    // navigateTo("/dance-gavin-dance-edyego-clone");
  }

  return (
    <div className="login-page-container ">
      <div className="login-container flex flex-col gap-16  items-center ">
        <div className="login-container__title text-center mt-12">
          <div className="first-title  text-[1.8rem] md:text-[2.2rem] text-[#1D1D1D]">
            RECOVER PASSWORD
          </div>
          <div className="second-title mt-3 font-sans text-lg text-[#1D1D1D]">
            Please enter your e-mail:
          </div>
        </div>
        <div className="login-container__inputs flex w-full justify-center">
          <div className="inputs-container w-[90%] max-w-[36rem]">
            <div className="card">
              {errorMessage != null && (
                <div className="error-message-container flex items-center gap-2 text-[#e4ffa6] bg-[#36c7c4]  p-6 mb-7">
                  <div className="error-icon">
                    <ErrorOutlineIcon />
                  </div>
                  <div className="error-message">{errorMessage}</div>
                </div>
              )}
              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.email}
                  onChange={handleChange("email")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  E-mail
                </span>
              </label>
              <div className="invisible-line-between py-[0.86rem]"></div>

              <div
                className="login-button button-action fill-animation bg-[#E84841]  p-[0.88rem]"
                onClick={handleSubmit}
              >
                <div className="login-action-text text-white text-center">
                  {loading ? (
                    <Stack
                      sx={{
                        color: "grey.500",
                        height: "25px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "10px",
                        padding: "0 0",
                        margin: "0 0",
                      }}
                      spacing={2}
                    >
                      <CircularProgress color="inherit" />
                    </Stack>
                  ) : (
                    "RECOVER"
                  )}
                </div>
              </div>

              <div className="new-customer-link flex gap-1 text-gray-700 mt-6 justify-center mb-16">
                <div className=" font-sans">Remember your password?</div>

                <Link
                  to="/dance-gavin-dance-edyego-clone/login"
                  className="font-sans underline"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
