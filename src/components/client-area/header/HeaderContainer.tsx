import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

interface HeaderContainerProps {}

const HeaderContainer: React.FC<HeaderContainerProps> = () => {
  const locationReact = useLocation();
  const isCheckoutPage = locationReact.pathname.includes("checkout");

  if (!isCheckoutPage) {
    return (
      <header className="sticky top-0 z-20 header">
        {/* was "relative" here but we need : "sticky top-0" */}
        <NavBar />
      </header>
    );
  }

  return <div></div>;
};

export default HeaderContainer;
