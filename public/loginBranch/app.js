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
// Signup logic
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

        // Use Firebase Auth directly
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                sessionStorage.setItem("userId", userCredential.user.uid);
                showPopupAndRedirect(); // Redirect or show success popup
            })
            .catch(error => {
                let errorMessage;
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = 'This email is already registered. Please log in instead.';
                }else if(error.code=="auth/weak-password"){
                    errorMessage = 'Please use a password with at least 6 characters.';
                }else {
                    errorMessage = 'Error signing up. Please try again.';
                }
                console.error('Error signing up:', error.code);
                showErrorPopup(errorMessage);
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

        // Use Firebase Auth directly to log in
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                sessionStorage.setItem("userId", userCredential.user.uid);
                showPopupAndRedirect(false); // go to homepage
                console.log('Login successful:', userCredential.user);
            })
            .catch(error => {
                let errorMessage;
                if (error.code === 'auth/invalid-credential') {
                    errorMessage = 'The email address or password is not valid! Please try again.';
                } else {
                    errorMessage = 'An error occurred during login. Please try again.';
                }
                console.error('Error during login:', error);
                showErrorPopup(errorMessage);
            });
    });
}

// Google Sign-In Logic
const googleSignInButton = document.getElementById('googleSignInButton');
googleSignInButton.addEventListener('click', () => {
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            const isNewUser = result.additionalUserInfo.isNewUser;

            // Store the user ID in sessionStorage for both new and returning users
            sessionStorage.setItem("userId", user.uid);

            if (isNewUser) {
                // User is signing up for the first time
                console.log("new user")
                showPopupAndRedirect(true); // Show a welcome popup or handle sign-up flow
            } else {
                // User is logging in
                showPopupAndRedirect(false); // go to homepage

            }

         
        })
        .catch((error) => {
            console.error("Error signing in with Google:", error.message);
            showErrorPopup("Error signing in with Google.");
        });
});



// Function to show a popup and redirect after 5 seconds
function showPopupAndRedirect(isnew) {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.position = 'fixed';
    popup.style.top = '40px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = '#03fc7f';
    popup.style.color = '#fff';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.textAlign = 'center';
    popup.style.fontSize = '18px';
    popup.style.zIndex = '9999';

    popup.innerHTML = 'Signup successful, redirecting in <span id="countdown">3</span> seconds...';
    document.body.appendChild(popup);

    let countdown = 3;
    const interval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').textContent = countdown;

        if (countdown === 0 && isnew==true) {
            clearInterval(interval);
            window.location.href = 'introduction.html';
        }
        if (countdown === 0 && isnew==false) {
            clearInterval(interval);
            window.location.href = 'homepageafterlogin.html';
        }
        
    }, 1000);
}
