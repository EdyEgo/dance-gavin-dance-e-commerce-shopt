import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import DollarRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

interface FitCurrencyIconProps {
  productsSelectedCurrency: "euro" | "dollar";
  size?: "medium" | "small" | "inherit" | "large" | undefined;
}

const FitCurrencyIcon: React.FC<FitCurrencyIconProps> = ({
  productsSelectedCurrency,
  size,
}) => {
  const iconsList: { [key: string]: any } = {
    euro: <EuroRoundedIcon fontSize={size ? size : "small"} />,
    dollar: <DollarRoundedIcon fontSize={size ? size : "small"} />,
  };

  return iconsList[productsSelectedCurrency];
};

export default FitCurrencyIcon;
