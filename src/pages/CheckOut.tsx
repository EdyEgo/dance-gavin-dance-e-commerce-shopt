import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import ProductItemCart from "../composables/generalHelpers/productItemCart";
// import {  } from "react-router-dom";

interface CheckOutPageProps {}

const CheckOutPage: React.FC<CheckOutPageProps> = () => {
  // reset cart at the end
  const dispatch = useDispatch();
  const useid = useId();

  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const shippingProtectionChecked = useSelector(
    (state: any) => state.cart.shippingProtectionChecked
  );

  const productsAddedToCartList = useSelector(
    (state: any) => state.cart.productsAddedToCart
  );

  return (
    <div className="checkout-page-container flex ">
      <div className="shipping-methods-container bg-[#1A1A1A] w-[60%]">
        <div className="content-container">
          <div className="products-list-container text-white">
            {productsAddedToCartList.map(
              (productObject: any, cartProductIndex: number) => {
                return (
                  <ProductItemCart
                    showQuantityOnPictureStylesClasses={
                      "p-1 rounded-full absolute top-0 left-0 text-white font-sans bg-gray-700"
                    }
                    hideActionsContainer={true}
                    key={cartProductIndex + "checkout" + useid}
                    productCartIndex={cartProductIndex}
                    productAdded={productObject}
                  />
                );
              }
            )}
          </div>
          <div className="subtotal-container"></div>
        </div>
      </div>
      <div className="products-details-and-total-container bg-[#22BDC3] w-[50%]"></div>
    </div>
  );
};

export default CheckOutPage;
