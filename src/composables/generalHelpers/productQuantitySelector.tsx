import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface QuantityProductSelectorProps {
  setQuantityRef: (newQuantityValue: number) => void;
}

const QuantityProductSelector: React.FC<QuantityProductSelectorProps> = ({
  setQuantityRef,
}) => {
  const [quantity, setQuantity] = useState(1);

  setQuantityRef(quantity);

  return (
    <div className="quantity-product-selector-contianer">
      <div className="quantity-counter flex items-center justify-between p-3 border border-[#23AAAF]">
        <div
          className="decrement cursor-pointer"
          onClick={() => {
            if (quantity - 1 <= 0) {
              return;
            }
            const newValue = quantity - 1;
            setQuantity(newValue);
          }}
        >
          <RemoveIcon fontSize="small" />
        </div>
        <div className="count-number font-sans font-medium">{quantity}</div>
        <div
          className="increment cursor-pointer"
          onClick={() => {
            const newValue = quantity + 1;
            setQuantity(newValue);
          }}
        >
          <AddIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default QuantityProductSelector;
