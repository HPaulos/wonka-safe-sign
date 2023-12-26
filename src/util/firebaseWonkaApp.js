import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";


const firebaseWonkaApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
// console out the firebase app and app name
export default firebaseWonkaApp;