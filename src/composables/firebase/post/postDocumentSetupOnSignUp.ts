import {
  writeBatch,
  serverTimestamp,
  collection,
  doc,
} from "firebase/firestore";
import { tz } from "moment-timezone";

// postDocument
import { postNewDocument } from "../post/postDocument";

export default async function postDocumentSetupOnSignUp(
  user: any,
  userObject: {
    firstName: string;
    lastName: string;
    createdUserEmail: string | null;
    createdUidUser: string;
  }
) {
  const { createdUserEmail, firstName, lastName, createdUidUser } = userObject;

  // const batch = writeBatch(db);
  try {
    await postNewDocument({
      collectionSelected: "users",
      documentName: createdUidUser,
      inputObject: {
        emailIsVerified: false,
        email: createdUserEmail,
        firstName,
        lastName,
      },
    });
  } catch (e: any) {
    console.log("my error ", e.message);
  }
}
