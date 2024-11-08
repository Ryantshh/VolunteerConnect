const fs = require('fs');

// Generate Firebase configuration and initialization script
const combinedContent = `
// Firebase Configuration
const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
  databaseURL: "${process.env.FIREBASE_DATABASE_URL}",
  projectId: "${process.env.FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.FIREBASE_APP_ID}",
  measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"
};

const GOOGLE_MAPS_API_KEY = "${process.env.GOOGLE_MAPS_API_KEY}";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage(); // Firebase Storage initialization
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Make Firebase and Google Maps configuration accessible globally
window.APP_CONFIG = {
  firebaseConfig,
  GOOGLE_MAPS_API_KEY,
  auth,
  db,
  storage, // Expose storage globally
  googleProvider
};

console.log("Firebase, Google Maps API, and Storage initialized successfully.");
`;

// Write the content to main.js
fs.writeFileSync('config.js', combinedContent);
console.log("main.js with Firebase config and initialization generated successfully.");
