// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
    
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
  
