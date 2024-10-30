document.addEventListener('DOMContentLoaded', function() {
    // Create container for floating hearts
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    document.body.appendChild(heartsContainer);

    // Heart creation function
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.className = 'heart ' + getRandomSize();
        
        // Random starting position
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random travel distance
        heart.style.setProperty('--heart-travel', (Math.random() * 200 - 100) + 'px');
        
        // Random opacity
        heart.style.setProperty('--heart-opacity', 0.3 + Math.random() * 0.3);
        
        // Random animation duration
        heart.style.animationDuration = 10 + Math.random() * 15 + 's';
        
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        heart.addEventListener('animationend', function() {
            heart.remove();
        });
    }

    // Get random size class
    function getRandomSize() {
        const sizes = ['small', 'medium', 'large'];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    // Create hearts periodically
    setInterval(createHeart, 3000);

    // Create initial set of hearts
    for(let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }
});


// document.addEventListener('DOMContentLoaded', function() {
//     const fileInput = document.getElementById('listing-photo');
//     const filePreview = document.querySelector('.file-preview');
//     const uploadText = document.querySelector('.upload-text');

//     fileInput.addEventListener('change', function(e) {
//         const file = e.target.files[0];
        
//         // Clear previous preview
//         filePreview.innerText = '';
        
//         if (file) {
//             // Update the upload text to show selected file name
//             uploadText.textContent = file.name;
            
//             // Only proceed if file is present
//                 const reader = new FileReader();
//                 reader.onload = function(e) {
//                     const img = document.createElement('img');
//                     img.src = e.target.result;
//                     img.style.maxWidth = '100%';
//                     img.style.maxHeight = '200px';
//                     img.style.marginTop = '10px';
//                     img.style.borderRadius = '8px';
//                     filePreview.appendChild(img);
//                 };

//                 reader.readAsDataURL(file);
//         } else {
//             uploadText.textContent = 'Choose a file';
//         }
//     });
// });


