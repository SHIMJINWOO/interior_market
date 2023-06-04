var images = Array.from(document.querySelectorAll('#banner img'));
var currentImageIndex = 0;

setInterval(function() {
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = 'block';
}, 5000);  // change image every 5 seconds
