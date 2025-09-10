const images = [
  "images/format.jpg",
  "images/benefit.jpg",
  "images/reward.jpg",
  "images/certificate.jpg",
];

// Preload images
images.forEach((src) => {
  const img = new Image();
  img.src = src;
});

const accordions = document.querySelectorAll(".info-accordion");
const infoImage = document.querySelector(".info-image");

// Initialize page with first accordion open and its image
window.addEventListener("DOMContentLoaded", () => {
  if (accordions.length > 0) {
    accordions[0].classList.add("active");
    accordions[0].nextElementSibling.classList.add("active");
    infoImage.style.backgroundImage = `url('${images[0]}')`;
    infoImage.style.transition = "background-image 0.5s ease-in-out";
  }
});

accordions.forEach((accordion, index) => {
  accordion.addEventListener("click", function () {
    const isActive = this.classList.contains("active");

    // Close all panels
    accordions.forEach((acc) => {
      acc.classList.remove("active");
      acc.nextElementSibling.classList.remove("active");
    });

    let newIndex;

    if (!isActive) {
      this.classList.add("active");
      this.nextElementSibling.classList.add("active");
      newIndex = index;
    } else {
      newIndex = (index + 1) % accordions.length;
      accordions[newIndex].classList.add("active");
      accordions[newIndex].nextElementSibling.classList.add("active");
    }

    // Update the background image
    infoImage.style.backgroundImage = `url('${images[newIndex]}')`;
  });
});

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // adjust this value as needed
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
