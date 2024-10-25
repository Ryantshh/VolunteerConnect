// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore and Auth reference
const db = firebase.firestore();
const auth = firebase.auth();

// Check if the user is logged in before allowing access to the form
auth.onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid;  // The UID of the currently logged-in user

        // Check if the user has already submitted the questionnaire
        db.collection('questionnaireResponses').where('uid', '==', uid).get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // User has already submitted, redirect them to the results page immediately
                    window.location.href = 'results.html';
                } else {
                    // User has not submitted yet, allow them to fill out and submit the form
                    const questionnaireForm = document.getElementById('questionnaireForm');
                    questionnaireForm.addEventListener('submit', (event) => {
                        event.preventDefault();  // Prevent the default form submission

                        // Get user input from the form
                        const name = document.getElementById('name').value;
                        const question1 = document.getElementById('question1').value;
                        const question2 = document.getElementById('question2').value;

                        // Store the data in Firestore in the "questionnaireResponses" collection this collection is auto generated
                        db.collection('questionnaireResponses').add({
                            uid: uid,  // Store the user's UID
                            name: name,
                            satisfaction: question1,
                            recommend: question2,
                            submittedAt: firebase.firestore.FieldValue.serverTimestamp()  // Add a timestamp
                        })
                            .then(() => {
                                document.getElementById('statusMessage').textContent = 'Response submitted successfully!';
                                questionnaireForm.reset();  // Clear the form after submission

                                // Redirect to the results page 
                                window.location.href = '../homepageafterlogin.html';  
                            })
                            .catch((error) => {
                                console.error('Error submitting response: ', error);
                                document.getElementById('statusMessage').textContent = 'Error submitting response.';
                            });
                    });
                }
            })
            .catch((error) => {
                console.error('Error checking user submission: ', error);
            });
    } else {
        // If no user is logged in, redirect to the login page
        window.location.href = 'login.html';  // Redirect to login page
    }
});
