function toggleMenu() {
    const element = document.querySelector(".navigations");
    element.classList.toggle ('visible');
}




document.addEventListener("DOMContentLoaded", function(){
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    sections.forEach(section => {
        observer.observe(section);
    });
});






let slideIndex = 0;
showSlides(slideIndex);

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.querySelectorAll(".review-container");
  if (n >= slides.length) { slideIndex = 0 }
  if (n < 0) { slideIndex = slides.length - 1 }
  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex].style.display = "block";
}

// Optional: Auto-change slides
setInterval(() => {
  changeSlide(1);
}, 5000);


function updateName(){
    const updateUsername = document.getElementById("updateUsername");
    const usernameInput = document.getElementById("usernameInput").value.toLowerCase().trim();
    if (usernameInput.length > 2) {
        updateUsername.textContent = `${usernameInput}`;
    }
}

// function submitUsernameBtn(){
//     const usernameInput = document.getElementById("usernameInput").value.toLowerCase().trim();
//     if (usernameInput.length > 2) {
//         localStorage.setItem("Username", usernameInput);
//         updateName();
//         document.getElementById("loginInputForUsername").style.display = "none";
//     } else {
//         alert("Please enter a valid username (at least 3 characters).");
//     }
// }

// window.addEventListener("load", function() {
//     const savedUsername = localStorage.getItem("Username");
//     if (savedUsername) {
//         document.getElementById("updateUsername").textContent = savedUsername;
//     } else {
//         document.getElementById("loginInputForUsername").style.display = "block";
//     }
// })

const ExistingItemInCart = JSON.parse(localStorage.getItem("cart")) || [];
const cartMessage = document.getElementById("sign");
if (ExistingItemInCart.length > 0) {
    cartMessage.style.display = 'block';
} else {
    cartMessage.style.display = 'none';
}