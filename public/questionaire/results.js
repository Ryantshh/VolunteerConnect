// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore and Auth reference
const db = firebase.firestore();
const auth = firebase.auth();

// Check if the user is logged in before showing their data
auth.onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid;  // The UID of the currently logged-in user
        console.log('User is logged in with UID:', uid);

        // Reference to the results list in HTML
        const resultsList = document.getElementById('resultsList');

        // Fetch questionnaire responses for the current user only
        db.collection('questionnaireResponses')
            .where('uid', '==', uid)  // Query for documents where 'uid' matches the current user
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const response = doc.data();
                    const li = document.createElement('li');
                    li.innerText = `${response.name}: Satisfaction - ${response.satisfaction}, Recommend - ${response.recommend}`;
                    resultsList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error('Error fetching questionnaire responses:', error);
            });
    } else {
        // If no user is logged in, redirect to the login page
        window.location.href = 'login.html';  // Redirect to login page
    }
});
