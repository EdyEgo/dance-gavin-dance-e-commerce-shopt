import ClientAreaLayout from "./components/layouts/ClientArea";
import ClientArea from "./components/client-area";

import {
  changeUserStatus,
  changeUnsubscribeStatus,
  changeErrorStatus,
} from "./store/auth";
import { userState } from "./api/dataBaseAuthMethods";
import { getAllProducts } from "./api/dataBaseProductMethods";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { chageProductsListValue } from "./store/products";
import {} from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import "./styles/signButtons.css";

function App() {
  const dispatch = useDispatch();

  // const [currentUser,setCurrentUser] = useState<null | {email:string}>(null)
  const currentUser = useSelector((state: any) => state.auth.user);
  const productsList = useSelector((state: any) => state.products.productsList);

  const [loading, setLoading] = useState(true);

  async function loadProductListFromDatabase() {
    const productsListData = await getAllProducts();
    if (productsListData.error) return;
    dispatch(chageProductsListValue(productsListData.data));
  }

  useEffect(() => {
    function setStatusCurrentUser(user: { email: string; uid: string } | null) {
      // setCurrentUser(user)

      dispatch(changeUserStatus(user));
    }

    const { error, data } = userState(setStatusCurrentUser);

    if (productsList === null) {
      // load product list from database

      loadProductListFromDatabase();
    }

    if (error) {
      dispatch(changeErrorStatus(error));
      setLoading(false);
      return;
    }

    setLoading(false);
    // dispatch(changeUnsubscsribeStatus(data))
  }, [dispatch, currentUser]); // functions like dispatch are  here only because of the "Mr. eslint" is screaming his lungs of

  return (
    <div className="App">
      <ClientAreaLayout>
        <ClientArea />
      </ClientAreaLayout>
    </div>
  );
}

export default App;
