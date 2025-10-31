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

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
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
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Scroll animations setup
  const animatedElements = document.querySelectorAll('.fade-up');
  
  // Create scroll animations with different types for variety
  animatedElements.forEach((element, index) => {
    // Different animation types based on element type and position
    let animationType = 'fadeUp';
    
    // Determine animation type based on element class or content
    if (element.classList.contains('heading')) {
      animationType = 'fadeUp';
    } else if (element.classList.contains('video-box')) {
      animationType = 'fadeIn';
    } else if (element.classList.contains('stats')) {
      animationType = 'fadeIn';
    } else if (element.querySelector('.carousel-container')) {
      animationType = 'slideUp';
    } else if (element.classList.contains('testimonial-section')) {
      animationType = 'fadeUp';
    } else if (element.classList.contains('zoom')) {
      animationType = 'fadeUp';
    } else if (element.classList.contains('ai-container')) {
      animationType = 'fadeUp';
    } else if (element.classList.contains('team-container')) {
      animationType = 'fadeIn';
    } else if (element.classList.contains('faq-container')) {
      animationType = 'slideUp';
    } else if (element.classList.contains('about-description')) {
      animationType = 'fadeUp';
    } else if (element.classList.contains('info-faq-wrap')) {
      animationType = 'slideLeft';
    } else if (element.classList.contains('info-image')) {
      animationType = 'slideUp';
    } else if (element.classList.contains('mission-text')) {
      animationType = 'fadeUp';
    } else {
      // Default to fadeUp for other elements
      animationType = 'fadeUp';
    }

    let fromProps = {};
    let toProps = {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      // delay: index * 0.05, // Removed delay for immediate hover effects
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none none",
        once: true,
        refreshPriority: -1
      }
    };

    // Set different animation properties based on type
    switch (animationType) {
      case 'fadeUp':
        fromProps = { opacity: 0, y: 60 };
        toProps.y = 0;
        break;
      case 'slideUp':
        fromProps = { opacity: 0, y: 80 };
        toProps.y = 0;
        toProps.ease = "back.out(1.7)";
        break;
      case 'fadeIn':
        fromProps = { opacity: 0 };
        break;
      case 'slideLeft':
        fromProps = { opacity: 0, x: -60 };
        toProps.x = 0;
        break;
      default:
        fromProps = { opacity: 0, y: 40 };
        toProps.y = 0;
    }

    // Special handling for video-box to preserve its positioning
    if (element.classList.contains('video-box')) {
      fromProps = { opacity: 0 };
      toProps = {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        // delay: index * 0.05, // Removed delay for immediate hover effects
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none",
          once: true,
          refreshPriority: -1
        }
      };
    }

    // Create the animation with callback
    const animation = gsap.fromTo(element, fromProps, toProps);
    
    // Reinitialize hover effects when animation completes
    animation.eventCallback("onComplete", () => {
        if (element.classList.contains('ai-container')) {
            // Reinitialize hover effects for AI features after animation
            initializeHoverEffects();
        }
    });
  });

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

  // Interactive hover effects for features - initialize immediately
  function initializeHoverEffects() {
      document.querySelectorAll('.ai-feature').forEach(feature => {
          // Remove any existing listeners to avoid duplicates
          feature.removeEventListener('mouseenter', handleMouseEnter);
          feature.removeEventListener('mouseleave', handleMouseLeave);
          
          // Add hover event listeners
          feature.addEventListener('mouseenter', handleMouseEnter);
          feature.addEventListener('mouseleave', handleMouseLeave);
      });
  }

  // Hover effect handlers
  function handleMouseEnter() {
      this.style.transform = 'translateY(-15px) scale(1.02)';
  }

  function handleMouseLeave() {
      this.style.transform = 'translateY(0) scale(1)';
  }

  // Initialize hover effects immediately
  initializeHoverEffects();

  // Also initialize hover effects for other image elements
  function initializeImageHoverEffects() {
      // Add hover effects for team member images
      document.querySelectorAll('.member-image').forEach(img => {
          img.addEventListener('mouseenter', function() {
              this.style.transform = 'scale(1.05)';
              this.style.transition = 'transform 0.3s ease';
          });
          
          img.addEventListener('mouseleave', function() {
              this.style.transform = 'scale(1)';
          });
      });

      // Add hover effects for testimonial images
      document.querySelectorAll('.testimonial img').forEach(img => {
          img.addEventListener('mouseenter', function() {
              this.style.transform = 'scale(1.05)';
              this.style.transition = 'transform 0.3s ease';
          });
          
          img.addEventListener('mouseleave', function() {
              this.style.transform = 'scale(1)';
          });
      });

      // Add hover effects for carousel images
      document.querySelectorAll('.carousel-card img').forEach(img => {
          img.addEventListener('mouseenter', function() {
              this.style.transform = 'scale(1.05)';
              this.style.transition = 'transform 0.3s ease';
          });
          
          img.addEventListener('mouseleave', function() {
              this.style.transform = 'scale(1)';
          });
      });
  }

  // Initialize image hover effects immediately
  initializeImageHoverEffects();

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

  // Initialize floating animation immediately
  addFloatingAnimation();

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

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const cards = document.querySelectorAll(".carousel-card");
    const dots = document.querySelectorAll(".carousel-dots .dot");
  
    let currentIndex = 0;
  
    function updateCarousel(index) {
        const cardWidth = cards[0].offsetWidth + 16; // 16 = your margin-right
        let transformX;
      
        if (index === cards.length - 1) {
          // Stop fully at last card
          transformX = cardWidth * (cards.length - 1);
        } else {
          transformX = cardWidth * index;
        }
      
        track.style.transform = `translateX(-${transformX}px)`;
      
        // update dots
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
      
        currentIndex = index;
    }
      
  
    // Click listeners for dots
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index);
        updateCarousel(index);
      });
    });
  
    // Optional: autoplay with dots syncing
    setInterval(() => {
      let newIndex = (currentIndex + 1) % cards.length;
      updateCarousel(newIndex);
    }, 4000);
  });  

  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  // Adjust canvas to window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".header").offsetHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Particle setup
  const particles = [];
  const particleCount = 35; // small number for subtle effect

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
    }
  }

  function updateParticles() {
    for (let p of particles) {
      p.y -= p.speed;
      if (p.y < -10) {
        // recycle particle to bottom
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
        p.opacity = Math.random() * 0.5 + 0.2;
      }
    }
  }

  function animate() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animate);
  }

  animate();