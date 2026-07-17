import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "maxivo-ecommerce-website.firebaseapp.com",
  projectId: "maxivo-ecommerce-website",
  storageBucket: "maxivo-ecommerce-website.firebasestorage.app",
  messagingSenderId: "540647219451",
  appId: "1:540647219451:web:09aa7faf4d47d61be9d05e",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export { auth, provider }

