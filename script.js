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

document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', function() {
          const isActive = item.classList.contains('active');
          
          // Close all other items
          faqItems.forEach(function(otherItem) {
              otherItem.classList.remove('active');
              const otherQuestion = otherItem.querySelector('.faq-question');
              otherQuestion.setAttribute('aria-expanded', 'false');
          });
          
          // Toggle current item
          if (!isActive) {
              item.classList.add('active');
              question.setAttribute('aria-expanded', 'true');
          }
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Animated counter for statistics
  function animateCounter(element, target, duration = 2000) {
      let start = 0;
      const increment = target / (duration / 16);
      
      function updateCounter() {
          start += increment;
          if (start < target) {
              element.textContent = Math.floor(start);
              requestAnimationFrame(updateCounter);
          } else {
              element.textContent = target;
          }
      }
      
      updateCounter();
  }

  // Intersection Observer for animations
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              
              // Animate stat numbers when they come into view
              if (entry.target.classList.contains('stat-number')) {
                  const target = parseInt(entry.target.dataset.target);
                  animateCounter(entry.target, target);
              }
          }
      });
  }, observerOptions);

  // Observe all AI features and stats
  document.querySelectorAll('.ai-feature').forEach(feature => {
      observer.observe(feature);
  });

  document.querySelectorAll('.stat-number').forEach(stat => {
      observer.observe(stat);
  });

  // Add staggered animation to features
  document.querySelectorAll('.ai-feature').forEach((feature, index) => {
      feature.style.animationDelay = `${index * 0.2}s`;
  });

  // Interactive hover effects for features
  document.querySelectorAll('.ai-feature').forEach(feature => {
      feature.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-15px) scale(1.02)';
      });

      feature.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
      });
  });

  // Add floating animation to feature icons
  function addFloatingAnimation() {
      const icons = document.querySelectorAll('.feature-icon');
      
      icons.forEach((icon, index) => {
          // Create random floating motion
          setInterval(() => {
              const randomX = (Math.random() - 0.5) * 10;
              const randomY = (Math.random() - 0.5) * 10;
              
              icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
          }, 3000 + (index * 500));
      });
  }

  // Initialize floating animation after a delay
  setTimeout(addFloatingAnimation, 1000);

  // Add particle effect to background
  function createParticles() {
      const section = document.querySelector('.ai-section');
      const particleCount = 20;

      for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.style.cssText = `
              position: absolute;
              width: 2px;
              height: 2px;
              background: #bdb4ff;
              border-radius: 50%;
              opacity: 0.3;
              animation: float ${5 + Math.random() * 10}s linear infinite;
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
              pointer-events: none;
          `;
          
          section.appendChild(particle);
      }
  }

  // Add CSS for particle animation
  const style = document.createElement('style');
  style.textContent = `
      @keyframes float {
          0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
          }
          10% {
              opacity: 0.3;
          }
          90% {
              opacity: 0.3;
          }
          100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
          }
      }
      
      .ai-feature.animate {
          animation: fadeInUp 0.8s ease-out forwards;
      }
      
      @keyframes fadeInUp {
          from {
              opacity: 0;
              transform: translateY(30px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }
  `;
  
  document.head.appendChild(style);
  
  // Initialize particles
  createParticles();

  // Smooth scroll for CTA button
  document.querySelector('.ai-main-link').addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
          this.style.transform = 'scale(1)';
      }, 150);
      
      // You can add navigation logic here
      console.log('AI Journey started!');
  });
});