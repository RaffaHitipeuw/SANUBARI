import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDbMXAtkjQi6kzyfonEwo1MKH6XCMKjbuI",
  authDomain: "://firebaseapp.com",
  projectId: "sanubari-techsprint",
  storageBucket: "sanubari-techsprint.firebasestorage.app",
  messagingSenderId: "165240553784",
  appId: "1:165240553784:web:6df5f17b9f64a54da141cd",
  measurementId: "G-S77745FGM5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
