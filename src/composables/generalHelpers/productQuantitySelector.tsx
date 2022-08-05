import { useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface QuantityProductSelectorProps {
  setQuantityRef: (newQuantityValue: number) => void;
  currentQuantity?: number;
  customStyleing?: string;
  maximQuantityAvailable?: number;
}

const QuantityProductSelector: React.FC<QuantityProductSelectorProps> = ({
  setQuantityRef,
  currentQuantity,
  customStyleing,
  maximQuantityAvailable,
}) => {
  const [quantity, setQuantity] = useState(1);

  const popperRef = useRef<any>(null);

  if (currentQuantity == null) {
    setQuantityRef(quantity);
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const noMoreStockLastTimeout = useRef<any>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);

    if (noMoreStockLastTimeout.current != null) {
      // if there are multiple clicks and there are other timeouts that waiting to be triggered then cancel them
      clearTimeout(noMoreStockLastTimeout.current);
    }

    noMoreStockLastTimeout.current = setTimeout(() => {
      setAnchorEl(null);
    }, 2000);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // test

  return (
    <div className="quantity-product-selector-contianer">
      <div
        className={`quantity-counter flex items-center justify-between ${
          customStyleing != null
            ? customStyleing
            : " p-3 border border-[#17888c]"
        } `}
      >
        <div
          className="decrement cursor-pointer"
          onClick={() => {
            if (currentQuantity) {
              const newCurrentValue = currentQuantity - 1;
              if (newCurrentValue <= 0) {
                return;
              }
              setQuantityRef(newCurrentValue);
              return;
            }

            if (quantity - 1 <= 0) {
              return;
            }
            const newValue = quantity - 1;

            setQuantity(newValue);
          }}
        >
          <RemoveIcon fontSize="small" />
        </div>
        <div className="count-number font-sans font-medium">
          {currentQuantity == null ? quantity : currentQuantity}
        </div>
        <Popover
          sx={{ top: "-5.9%", left: "-2%" }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Typography
            sx={{
              p: 1,
              color: "#22BDC3",
              backgroundColor: "black",
            }}
          >
            No more stock
          </Typography>
        </Popover>

        <div
          title={
            maximQuantityAvailable != null &&
            currentQuantity != null &&
            currentQuantity >= maximQuantityAvailable
              ? "No more stock"
              : ""
          }
          className="increment cursor-pointer"
          ref={popperRef}
          onClick={(event: any) => {
            if (currentQuantity) {
              const newCurrentValue = currentQuantity + 1;

              if (
                maximQuantityAvailable != null &&
                newCurrentValue > maximQuantityAvailable
              ) {
                handleClick(event);
                return;
              }
              setQuantityRef(newCurrentValue);
              return;
            }

            const newValue = quantity + 1;
            if (
              maximQuantityAvailable != null &&
              newValue > maximQuantityAvailable
            ) {
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
