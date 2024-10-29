//global variable
const firebaseConfig = {
  apiKey: "AIzaSyCPkpoJZ4N4rRJ2BJB_WaZsHmt4pvInal4",
  authDomain: "volunteerconnect-19a5a.firebaseapp.com",
  databaseURL: "https://volunteerconnect-19a5a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "volunteerconnect-19a5a",
  storageBucket: "volunteerconnect-19a5a.appspot.com",
  messagingSenderId: "459465867690",
  appId: "1:459465867690:web:c3dad602925bbb7b29abd3",
  measurementId: "G-XKKEQK9F35"
};
  


  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Initialize GoogleAuthProvider
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  console.log("Firebase and Google Provider initialized successfully.");
