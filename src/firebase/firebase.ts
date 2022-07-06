import { store } from "@/main";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});