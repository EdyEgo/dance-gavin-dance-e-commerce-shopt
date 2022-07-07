import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./header/NavBar";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import ClientHome from "./ClientHome";
import Footer from "./footer/index";
import MenuDrawer from "./header/MenuDrawer";

interface ClientAreaProps {}

const ClientArea: React.FC<ClientAreaProps> = () => {
  return (
    <div>
      <Router>
        <header className="header relative">
          <NavBar />
        </header>

        <div className="routes-container">
          <Routes>
            <Route
              path="/dance-gavin-dance-edyego-clone"
              element={<ClientHome />}
            />
            <Route
              path="/dance-gavin-dance-edyego-clone/signup"
              element={<SignUp />}
            />
            <Route
              path="/dance-gavin-dance-edyego-clone/login"
              element={<SignIn />}
            />

            <Route
              path="*"
              element={
                <div>
                  Ops this page was not so lucky as the rest of them , 404 Error
                  , page not found
                </div>
              }
            />
          </Routes>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
        <MenuDrawer />
      </Router>
    </div>
  );
};

export default ClientArea;
