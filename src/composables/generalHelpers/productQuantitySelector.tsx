import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface QuantityProductSelectorProps {
  setQuantityRef: (newQuantityValue: number) => void;
  currentQuantity?: number;
  maximQuantityAvailable?: number;
}

const QuantityProductSelector: React.FC<QuantityProductSelectorProps> = ({
  setQuantityRef,
  currentQuantity,
  maximQuantityAvailable,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (currentQuantity == null) {
    setQuantityRef(quantity);
  }

  return (
    <div className="quantity-product-selector-contianer">
      <div className="quantity-counter flex items-center justify-between p-3 border border-[#17888c]">
        <div
          className="decrement cursor-pointer"
          onClick={() => {
            if (quantity - 1 <= 0) {
              return;
            }
            const newValue = quantity - 1;

            if (currentQuantity) {
              setQuantityRef(newValue);
              return;
            }
            setQuantity(newValue);
          }}
        >
          <RemoveIcon fontSize="small" />
        </div>
        <div className="count-number font-sans font-medium">
          {currentQuantity == null ? quantity : currentQuantity}
        </div>
        <div
          title={
            maximQuantityAvailable != null && quantity >= maximQuantityAvailable
              ? "No more stock"
              : ""
          }
          className="increment cursor-pointer"
          onClick={() => {
            const newValue = quantity + 1;
            if (
              maximQuantityAvailable != null &&
              newValue > maximQuantityAvailable
            ) {
              return;
            }

            if (currentQuantity) {
              setQuantityRef(newValue);
              return;
            }
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
