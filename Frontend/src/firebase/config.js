import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBMlP-wDPpuoonmfXhCU70LDWPyn_FJLOU",
    authDomain: "nextgen-education-68702.firebaseapp.com",
    projectId: "nextgen-education-68702",
    storageBucket: "nextgen-education-68702.firebasestorage.app",
    messagingSenderId: "872475914326",
    appId: "1:872475914326:web:e47875370349e73c7bcbf7",
    measurementId: "G-64EXR104JL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
