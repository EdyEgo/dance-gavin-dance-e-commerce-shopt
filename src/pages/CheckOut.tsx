import { useDispatch, useSelector } from "react-redux";

interface CheckOutPageProps {}

const CheckOutPage: React.FC<CheckOutPageProps> = () => {
  const dispatch = useDispatch();

  const shippingProtectionChecked = useSelector(
    (state: any) => state.cart.shippingProtectionChecked
  );

  return (
    <div className="checkout-page-container">checkout page placeholder</div>
  );
};

export default CheckOutPage;
