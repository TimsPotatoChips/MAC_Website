const accordions = document.querySelectorAll(".info-accordion");

// Open first FAQ by default
if (accordions.length > 0) {
  accordions[0].classList.add("active");
  accordions[0].nextElementSibling.classList.add("active");
}

accordions.forEach((accordion, index) => {
  accordion.addEventListener("click", function () {
    const isActive = this.classList.contains("active");

    // Close all panels
    accordions.forEach((acc) => {
      acc.classList.remove("active");
      acc.nextElementSibling.classList.remove("active");
    });

    if (!isActive) {
      // Open clicked accordion
      this.classList.add("active");
      this.nextElementSibling.classList.add("active");
    } else {
      // If clicked the active one, open the next accordion (wrap around if last)
      let nextIndex = (index + 1) % accordions.length;
      accordions[nextIndex].classList.add("active");
      accordions[nextIndex].nextElementSibling.classList.add("active");
    }
  });
});

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // adjust value as needed
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

const track = document.querySelector(".carousel-track");
const carouselContainer = document.querySelector(".carousel-container");
const cards = document.querySelectorAll(".carousel-card");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 16;
const maxIndex = cards.length - Math.floor(window.innerWidth / cardWidth);

// Wrap carousel in a high-z container
carouselContainer.style.position = "relative";
carouselContainer.style.zIndex = 9999;

// Update carousel
function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

// Dot click
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Auto-slide
setInterval(() => {
  currentIndex++;
  if (currentIndex > maxIndex) currentIndex = 0;
  updateCarousel();
}, 4000);
