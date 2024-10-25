// Sign Up Logic
const signUpForm = document.getElementById('signUpForm');
if (signUpForm) {
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

      // Sign up the user with email and password using Firebase Auth
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // User successfully signed up
          const user = userCredential.user;
          const uid = user.uid;
          const createdAt = firebase.firestore.FieldValue.serverTimestamp(); // Current timestamp

          // Add the user data to Firestore
          return firebase.firestore().collection('users').doc(uid).set({
            uid: uid,
            email: email,
            createdAt: createdAt
          });
        })
        .then(() => {
          // Show success message with a countdown
          showPopupAndRedirect();
        })
        .catch(error => {
          // Handle any errors
          console.error('Error signing up or saving data: ', error);
          alert(error.message);
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
                window.location.href = 'homepageafterlogin.html'; 
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
              showPopupAndRedirect();
            } else {
                alert("Google sign-in successful!");
                // insert path to profile page when created
                //window.location.href = "";
            }
          });
        
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error.message);
        alert("Error signing in with Google: " + error.message);
      });
  });

// Function to show a popup and redirect after 5 seconds
function showPopupAndRedirect() {
  // Create a div element for the popup
  const popup = document.createElement('div');
  popup.id = 'popup';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = '#4caf50';
  popup.style.color = '#fff';
  popup.style.padding = '20px';
  popup.style.borderRadius = '10px';
  popup.style.textAlign = 'center';
  popup.style.fontSize = '18px';
  popup.style.zIndex = '9999';

  // Add the message to the popup
  popup.innerHTML = 'Signup successful, redirecting in <span id="countdown">5</span> seconds...';

  // Append the popup to the body
  document.body.appendChild(popup);

  // Countdown logic
  let countdown = 5;
  const interval = setInterval(() => {
    countdown--;
    document.getElementById('countdown').textContent = countdown;

    // After 5 seconds, redirect
    if (countdown === 0) {
      clearInterval(interval);
      window.location.href = './questionnaire/questionnaire.html';
    }
  }, 1000);
}

