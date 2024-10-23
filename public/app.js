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

const googleSignInButton = document.getElementById('googleSignInButton');
googleSignInButton.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        // Check if user exists in Firestore
        const user = result.user;
        db.collection('users').doc(user.uid).get()
          .then((doc) => {
            if (!doc.exists) {
              // If new user, store user info in Firestore
              db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                profilePic: user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
            }
          });
        alert("Google sign-in successful!");
        window.location.href = "profile.html";  // Redirect to profile page
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error.message);
        alert("Error signing in with Google: " + error.message);
      });
  });


