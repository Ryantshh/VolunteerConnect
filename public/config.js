// Initialize configuration object
// Initialize configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const GOOGLE_MAPS_API_KEY = "AIzaSyDOhAYVrKn0zlhOfXz-fkUETN16K1RiG0Q";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Initialize Firebase Storage
// const storage = firebase.storage();

// Make everything accessible globally
window.APP_CONFIG = {
    firebaseConfig,
    GOOGLE_MAPS_API_KEY,
    auth,
    db,
    googleProvider
};

console.log("Firebase and Google Provider initialized successfully.");