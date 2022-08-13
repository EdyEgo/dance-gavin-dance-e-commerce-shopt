import { postNewDocument } from "../composables/firebase/post/postDocument";

import { arrayUnion, serverTimestamp } from "firebase/firestore";

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
  proccessPaymentObject,
}: {
  // if an
  accountLoggedInUid?: string;
  proccessPaymentObject: any;
}) {
  try {
    const orderObject = await postNewDocument({
      useAddDocument: true,
      collectionSelected: "orders",
      inputObject: proccessPaymentObject,
    });

    if (accountLoggedInUid != null) {
      await postNewDocument({
        collectionSelected: "users",
        inputObject: {
          orders: {
            [orderObject.id]: {
              deliveredAt: null,
              orderedAt: serverTimestamp(),
            },
          },
        },
      });
    }
    // orderObject.id

    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}
