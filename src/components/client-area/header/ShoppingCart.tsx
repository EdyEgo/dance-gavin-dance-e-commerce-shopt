import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function ShoppingCart({
  desktopMode,
}: {
  desktopMode?: boolean;
}) {
  const ItemsAddedToCart = 7; //useSelector((state:any)=>state.cart)
  return (
    <div className="badge-container cursor-pointer">
      <Badge badgeContent={ItemsAddedToCart} color="info">
        {desktopMode && (
          <ShoppingBagIcon className="text-white" fontSize="large" />
        )}
        {desktopMode == null && (
          <ShoppingBagIcon className="text-white" fontSize="small" />
        )}
        {/* color="primary" */}
      </Badge>
    </div>
  );
}
