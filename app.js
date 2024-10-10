// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyBDpVjwYiXgIPxHpiovGyucpjjjUEkW0k4",
    authDomain: "volunteerconnect-19a5a.firebaseapp.com",
    databaseURL: "https://volunteerconnect-19a5a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "volunteerconnect-19a5a",
    storageBucket: "volunteerconnect-19a5a.appspot.com",
    messagingSenderId: "459465867690",
    appId: "1:459465867690:web:c3dad602925bbb7b29abd3",
    measurementId: "G-XKKEQK9F35"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = firebase.auth();
  
  // DOM Elements
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const messageDiv = document.getElementById("message");
  
  // Login function
  loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        messageDiv.innerHTML = "Login successful!";
        messageDiv.style.color = "green";
      })
      .catch(error => {
        messageDiv.innerHTML = error.message;
      });
  });
  
  // Signup function
  signupBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        messageDiv.innerHTML = "Account created successfully!";
        messageDiv.style.color = "green";
      })
      .catch(error => {
        messageDiv.innerHTML = error.message;
      });
  });
  