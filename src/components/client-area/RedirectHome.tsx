import { useNavigate } from "react-router-dom";

interface RedirectToHomePageProps {}

const RedirectToHomePage: React.FC<RedirectToHomePageProps> = () => {
  const navigate = useNavigate();

  navigate("/dance-gavin-dance-edyego-clone");
  return <div></div>;
};

export default RedirectToHomePage;
