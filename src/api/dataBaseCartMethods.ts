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
  rememberMe,
  proccessPaymentObject,
}: {
  // if an
  accountLoggedInUid?: string;
  rememberMe: boolean;
  proccessPaymentObject: any;
}) {
  try {
    const orderObject = await postNewDocument({
      useAddDocument: true,
      collectionSelected: "orders",
      inputObject: proccessPaymentObject,
    });

    if (accountLoggedInUid != null) {
      // rememberMe

      const postInUserObjectDatabase: {
        orders: any;
        paymentInforamtion?: any;
      } = {
        orders: {
          [orderObject.id]: {
            deliveredAt: null,
            orderedAt: serverTimestamp(),
          },
        },
      };

      if (rememberMe) {
        const copyPaymentIformation = {
          email: proccessPaymentObject.email,

          country: proccessPaymentObject.country,
          firstName: proccessPaymentObject.firstName,
          lastName: proccessPaymentObject.lastName,
          company: proccessPaymentObject.company,
          address: proccessPaymentObject.address,
          apartament: proccessPaymentObject.apartament,
          postalCode: proccessPaymentObject.postalCode,
          city: proccessPaymentObject.city,
          region: proccessPaymentObject.region,
          phone: proccessPaymentObject.phone,
          shippingMethod: proccessPaymentObject.shippingMethod,
          cardDetails: proccessPaymentObject.cardDetails,
          taxes: proccessPaymentObject.taxes,
        };
        postInUserObjectDatabase["paymentInforamtion"] = copyPaymentIformation;
      }

      await postNewDocument({
        collectionSelected: "users",
        inputObject: postInUserObjectDatabase,
      });
    }
    // orderObject.id

    return { error: false };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}
