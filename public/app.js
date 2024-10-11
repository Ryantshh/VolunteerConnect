// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign Up Logic
const signUpForm = document.getElementById('signUpForm');
if (signUpForm) {
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                document.getElementById('signUpMessage').innerText = 'Sign up successful! Redirecting to login...';
                console.log('Sign-up successful:', userCredential.user);
                setTimeout(() => {
                    window.location.href = 'login.html'; // Redirect to login page after sign-up
                }, 1000);
            })
            .catch((error) => {
                document.getElementById('signUpMessage').innerText = error.message;
                console.error('Error during sign-up:', error.message);
            });
    });
}

// Login Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                window.location.href = 'questionaire/questionnaire.html'; // Redirect to questionnaire after sign-up
                console.log('Login successful:', userCredential.user);
            })
            .catch((error) => {
                document.getElementById('loginMessage').innerText = error.message;
                console.error('Error during login:', error.message);
            });
    });
}
