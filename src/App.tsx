import ClientAreaLayout from "./components/layouts/ClientArea";
import ClientArea from "./components/client-area";
import { changeCurrentUser } from "./store/users";
import {
  changeUserStatus,
  changeUnsubscribeStatus,
  changeErrorStatus,
} from "./store/auth";
import { userState, signOut } from "./api/dataBaseAuthMethods";
import { getUser } from "./api/dataBaseUsersMethods";
import { getAllProducts } from "./api/dataBaseProductMethods";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { chageProductsListValue } from "./store/products";
import {} from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import "./styles/signButtons.css";

function App() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.auth.user); // pointless ,delete
  const productsList = useSelector((state: any) => state.products.productsList);

  const [loading, setLoading] = useState(true);

  async function loadProductListFromDatabase() {
    const productsListData = await getAllProducts();
    if (productsListData.error) return;
    dispatch(chageProductsListValue(productsListData.data));
  }

  async function writeUserObjectToUsersStore(userId: string) {
    const { error, data } = await getUser({ userId });

    if (error) {
      await signOut();
      return;
    }

    dispatch(changeCurrentUser({ id: userId, ...data }));
  }

  useEffect(() => {
    function setStatusCurrentUser(user: { email: string; uid: string } | null) {
      // add auth user object
      dispatch(changeUserStatus(user));
      if (typeof user?.uid === "string") {
        writeUserObjectToUsersStore(user.uid);
      }
      if (user?.uid == null) {
        dispatch(changeCurrentUser(null));
      }
      // add user object from users collection database
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
