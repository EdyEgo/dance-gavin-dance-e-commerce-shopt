import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function ShoppingCart({
  desktopMode,
}: {
  desktopMode?: boolean;
}) {
  const productsAddedToCart = useSelector(
    (state: any) => state.cart.productsAddedToCart.length
  );

  return (
    <div className="cursor-pointer badge-container flex items-center">
      <Badge
        sx={{
          "& .BaseBadge-badge": {
            backgroundColor: "white",
            color: "#E6433C",
          },
        }}
        badgeContent={productsAddedToCart}
        color="info"
        invisible={productsAddedToCart <= 0}
      >
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
