import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAPl_8nC1-7r5RfmUnLOM_FnZ6GW6lV6vk",
  authDomain: "ecommerce-3b33a.firebaseapp.com",
  projectId: "ecommerce-3b33a",
  storageBucket: "ecommerce-3b33a.appspot.com",
  messagingSenderId: "621093490709",
  appId: "1:621093490709:web:cda041e5ea6335d3b63e1c",
  measurementId: "G-J1G94ELJVM",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
