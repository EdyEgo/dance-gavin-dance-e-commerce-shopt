import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const useId = React.useId();
  const productId = params?.productId;

  const productsList = useSelector((state: any) => state.products.productsList);

  const productFound = findProductById();

  function findProductById() {
    const foundProduct = productsList.find(
      (product: any) => product.id === productId
    );
    if (typeof foundProduct === "object") {
      return foundProduct;
    }

    return null;
  }

  console.log("my product id ", productId, "and product list", productsList);

  return (
    <div className="product-page-container">
      {productFound != null && (
        <div className="product-exists">
          <div className="product-page__header">
            <div className="font-sans text-[#1D4D4F]">Home</div>
            <div className="font-sans text-[#1D4D4F]">/</div>
            <div className="text-[15px] font-sans">{}</div>
          </div>
        </div>
      )}
      {productFound == null && (
        <div className="product-does-not-exists">Product does not exists</div>
      )}
    </div>
  );
};

export default ProductPage;
