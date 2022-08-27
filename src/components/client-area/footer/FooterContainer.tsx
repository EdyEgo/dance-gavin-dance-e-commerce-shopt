import { useLocation } from "react-router-dom";
import Footer from "./index";

interface FooterContainerProps {}

const FooterContainer: React.FC<FooterContainerProps> = () => {
  const locationReact = useLocation();
  const isCheckoutPage = locationReact.pathname.includes("checkout");

  if (!isCheckoutPage) {
    return (
      <div className="footer-container">
        <Footer />
      </div>
    );
  }

  return <div></div>;
};

export default FooterContainer;
