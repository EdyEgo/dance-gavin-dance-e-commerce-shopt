import { useSelector } from "react-redux";

interface ShippingInputsProps {}

const ShippingInputs: React.FC<ShippingInputsProps> = () => {
  const informationsCheckout = useSelector(
    (state: any) => state.checkout.informationsPage
  );

  return (
    <div className="shipping-inputs">
      <div className="shipping-informations-and-contact-container">
        <div className="shipping-information-and-contact bg-white rounded-md">
          <div className="contact"></div>
          <div className="ship-to"></div>
        </div>
      </div>
      <div className="shipping-method-selector-container"></div>
    </div>
  );
};

export default ShippingInputs;
