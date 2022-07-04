import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function ShoppingCart() {
  const ItemsAddedToCart = 7; //useSelector((state:any)=>state.cart)
  return (
    <Badge badgeContent={ItemsAddedToCart} color="info">
      <ShoppingBagIcon className="text-white" fontSize="small" />
      {/* color="primary" */}
    </Badge>
  );
}
