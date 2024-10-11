// Import Firebase configuration from config.js
import firebaseConfig from './config.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth
const auth = firebase.auth();

// Form submission handler
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Login Successful');
            console.log(userCredential);
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById('errorMessage').innerText = errorMessage;
            console.error(errorMessage);
        });
});
