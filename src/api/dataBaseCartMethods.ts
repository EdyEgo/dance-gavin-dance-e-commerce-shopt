import { postNewDocument } from "../composables/firebase/post/postDocument";

import { serverTimestamp } from "firebase/firestore";

export async function addToUserCart({
  userUid,
  productObject,
}: {
  userUid: string;
  productObject: any;
}) {
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
