// Function to show an error popup
function showErrorPopup(message) {
    const errorPopup = document.createElement('div');
    errorPopup.id = 'errorPopup';
    errorPopup.style.position = 'fixed';
    errorPopup.style.top = '20px';
    errorPopup.style.left = '50%';
    errorPopup.style.transform = 'translateX(-50%)';
    errorPopup.style.backgroundColor = '#f44336'; // Red color for error
    errorPopup.style.color = '#fff';
    errorPopup.style.padding = '20px';
    errorPopup.style.borderRadius = '10px';
    errorPopup.style.textAlign = 'center';
    errorPopup.style.fontSize = '18px';
    errorPopup.style.zIndex = '9999';
    errorPopup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';

    // Add the message to the popup
    errorPopup.innerHTML = message;

    // Append the popup to the body
    document.body.appendChild(errorPopup);

    const fieldsToClear = ['loginEmail', 'loginPassword', 'signUpPassword', 'cfm_password'];
    fieldsToClear.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) field.value = ''; // Clear the field if it exists
    });

    // Remove the popup after 3 seconds
    setTimeout(() => {
        if (document.body.contains(errorPopup)) {
            document.body.removeChild(errorPopup);
        }
    }, 3000);
}

// Sign Up Logic
const signUpForm = document.getElementById('signUpForm');
if (signUpForm) {
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const cfm_password = document.getElementById('cfm_password').value;

        if (cfm_password !== password) {
            showErrorPopup('Passwords do not match. Please try again.');
            return;
        }

        // Check if the email already exists in Firestore
        firebase.firestore().collection('users').where('email', '==', email).get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    showErrorPopup('This email is already registered. Please log in instead.');
                } else {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(userCredential => {
                            const user = userCredential.user;
                            const uid = user.uid;
                            sessionStorage.setItem('userId', user.uid)
                            const createdAt = firebase.firestore.FieldValue.serverTimestamp();

                            return firebase.firestore().collection('users').doc(uid).set({
                                uid: uid,
                                email: email,
                                createdAt: createdAt
                            });
                        })
                        .then(() => {
                            showPopupAndRedirect();
                        })
                        .catch(error => {
                            console.error('Error signing up or saving data:', error);
                            showErrorPopup('Error signing up. Please try again.');
                        });
                }
            })
            .catch(error => {
                console.error('Error checking email in Firestore:', error);
                showErrorPopup('An error occurred while checking the email. Please try again.');
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

        // Check if the email exists in Firestore before attempting to log in
        firebase.firestore().collection('users').where('email', '==', email).get()
            .then(querySnapshot => {
                if (querySnapshot.empty) {
                    // No user found with this email in Firestore
                    showErrorPopup('No user found with this email address. Please sign up.');
                } else {
                    // Email found, attempt to sign in
                    auth.signInWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            sessionStorage.setItem("userId", userCredential.user.uid);
                            window.location.href = 'homepageafterlogin.html';
                            console.log('Login successful:', userCredential.user);
                        })
                        .catch((error) => {
                            let errorMessage;
                            if (error.code === 'auth/invalid-email') {
                                errorMessage = 'The email address is not valid.';
                            } else if (error.code === 'auth/user-not-found') {
                                errorMessage = 'No user found with this email address.';
                            } else if (error.code === 'auth/wrong-password') {
                                errorMessage = 'Incorrect password. Please try again.';
                            } else {
                                errorMessage = 'An error occurred during login. Please try again.';
                            }
                            showErrorPopup(errorMessage);
                        });
                }
            })
            .catch(error => {
                console.error('Error checking email in Firestore:', error);
                showErrorPopup('An error occurred while checking the email. Please try again.');
            });
    });
}

// Google Sign-In Logic
const googleSignInButton = document.getElementById('googleSignInButton');
googleSignInButton.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (!doc.exists) {
                        db.collection('users').doc(user.uid).set({
                            uid: user.uid,
                            email: user.email,
                            name: user.displayName,
                            profilePic: user.photoURL,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                        showPopupAndRedirect();
                    } else {
                        showErrorPopup("Google sign-in successful!");
                        sessionStorage.setItem("userId", user.uid);
                        window.location.href = "homepageafterlogin.html";
                    }
                });
        })
        .catch((error) => {
            console.error("Error signing in with Google:", error.message);
            showErrorPopup("Error signing in with Google.");
        });
});

// Function to show a popup and redirect after 5 seconds
function showPopupAndRedirect() {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = '#4caf50';
    popup.style.color = '#fff';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.textAlign = 'center';
    popup.style.fontSize = '18px';
    popup.style.zIndex = '9999';

    popup.innerHTML = 'Signup successful, redirecting in <span id="countdown">5</span> seconds...';
    document.body.appendChild(popup);

    let countdown = 5;
    const interval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').textContent = countdown;

        if (countdown === 0) {
            clearInterval(interval);
            window.location.href = 'introduction.html';
        }
    }, 1000);
}
