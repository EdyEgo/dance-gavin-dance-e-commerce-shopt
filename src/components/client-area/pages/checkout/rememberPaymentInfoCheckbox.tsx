import { useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

interface RememberPaymentInfoCheckboxProps {
  rememberMe: boolean;
  setRememberMe: (newValue: boolean) => void;
}

const RememberPaymentInfoCheckbox: React.FC<
  RememberPaymentInfoCheckboxProps
> = ({ setRememberMe, rememberMe }) => {
  const [rememberInformation, setRememberInformation] = useState(false);

  function setNewRememberMeValueAndRefreshComponent(newValue: boolean) {
    setRememberInformation(newValue);
    setRememberMe(newValue);
  }

  return (
    <div className="remember-me-container">
      <div className="remember-me__title"></div>
      <div
        className="remember-me__checkbox-container bg-white cursor-pointer flex items-center gap-2"
        onClick={() => {
          setNewRememberMeValueAndRefreshComponent(!rememberInformation);
        }}
      >
        <div className="remember-me__checkbox transition-all duration-200 ease-linear">
          {rememberInformation && (
            <CheckBoxOutlineBlankIcon className="text-[#22BDC3]  hover:text-gray-500 " />
          )}
          {!rememberInformation && <CheckBoxIcon className="text-[#22BDC3]" />}
        </div>
        <div className="remember-me__text">
          Save my information for a faster checkout
        </div>
      </div>
    </div>
  );
};

export default RememberPaymentInfoCheckbox;
