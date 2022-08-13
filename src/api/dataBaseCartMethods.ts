import { postNewDocument } from "../composables/firebase/post/postDocument";

import { serverTimestamp } from "firebase/firestore";

export async function addToUserCart({
  userUid,
  userCurrentCart,
  productObject,
}: {
  userUid: string;
  userCurrentCart: any[];
  productObject: any;
}) {
  const productIsAlreadyInCart = userCurrentCart.findIndex(
    (product: any) => product.id === productObject.id
  );
  if (productIsAlreadyInCart !== -1) {
    return { error: true, message: "This product is already in your cart" };
  }
  try {
    await postNewDocument({
      documentName: userUid,
      collectionSelected: "users",
      inputObject: {
        addedToCart: { productObject, registeredAt: serverTimestamp() },
      },
    });

    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function proccessPayment({
  accountLoggedInUid,
}: {
  // if an
  accountLoggedInUid?: string;
}) {}
