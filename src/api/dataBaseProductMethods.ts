import { postNewDocument } from "../composables/firebase/post/postDocument";
import { getDocuments } from "../composables/firebase/get/getDocuments";
import { serverTimestamp } from "firebase/firestore";

export async function postProduct({
  creatorId,
  productObject,
}: {
  creatorId: string;
  productObject: any;
}) {
  try {
    const postedProduct = await postNewDocument({
      useAddDocument: true,
      collectionSelected: "collections",
      inputObject: { ...productObject, creatorId },
    });

    return { error: false, data: postedProduct };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function updatePostedProduct({
  updatedByUserId,
  productIdToUpdate,
  productObject,
}: {
  updatedByUserId: string;
  productIdToUpdate: string;
  productObject: any;
}) {
  try {
    const postedProduct = await postNewDocument({
      collectionSelected: "collections",
      documentName: productIdToUpdate,
      inputObject: {
        ...productObject,
        updatedByUserId,
        updatedAt: serverTimestamp(),
      },
      noRegister: true,
    });
    return { error: false, data: postedProduct };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}

export async function getAllProducts() {
  try {
    const products: any = await getDocuments({
      path: "collections",
      orderByKey: "registeredAt",
    });

    const data = products.docs.map((product: any) => {
      return { id: product.id, ...product.data() };
    });
    return { error: false, data };
  } catch (e: any) {
    return { error: true, message: e.message };
  }
}
