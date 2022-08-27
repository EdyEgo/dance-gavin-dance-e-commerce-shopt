import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeShippingProtectionCheck } from "../../store/cart";
import OnOffSwitch from "./onOffSwitch";

interface SwitchShippingProtectionProps {}

const SwitchShippingProtection: React.FC<
  SwitchShippingProtectionProps
> = () => {
  const dispatch = useDispatch();

  const shippingProtectionChecked = useSelector(
    (state: any) => state.cart.shippingProtectionChecked
  );

  function setShippingProtectionChecked() {
    dispatch(changeShippingProtectionCheck(!shippingProtectionChecked));
  }

  return (
    <div className="shipping-protection-switch-container">
      <OnOffSwitch
        checked={shippingProtectionChecked}
        setChecked={setShippingProtectionChecked}
      />
    </div>
  );
};

export default SwitchShippingProtection;
