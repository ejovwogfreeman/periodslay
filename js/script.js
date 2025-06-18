// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeLoadingSpinner();
  initializeNavigation();
  initializeHeroSlider();
  initializeTestimonialsSlider();
  initializeScrollAnimations();
  initializeBackToTop();
  initializeNewsletterForm();
  initializeScrollEffects();
});

// Loading Spinner
function initializeLoadingSpinner() {
  const loadingSpinner = document.getElementById("loadingSpinner");

  // Simulate loading time
  setTimeout(() => {
    loadingSpinner.classList.add("hidden");
    // Remove spinner from DOM after animation
    setTimeout(() => {
      loadingSpinner.style.display = "none";
    }, 500);
  }, 2000);
}

// Navigation Functionality
function initializeNavigation() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active navigation link based on scroll position
  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);
}

// Update active navigation link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const headerHeight = document.querySelector(".header").offsetHeight;
  const scrollPosition = window.scrollY + headerHeight + 100;

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Hero Slider
function initializeHeroSlider() {
  const heroSlider = document.getElementById("heroSlider");
  const slides = heroSlider.querySelectorAll(".hero-slide");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  const indicators = document.querySelectorAll(".indicator");

  let currentSlide = 0;
  let slideInterval;

  // Show specific slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });

    currentSlide = index;

    // Trigger animation for text elements
    const activeSlide = slides[currentSlide];
    const textElements = activeSlide.querySelectorAll(".animate-text");
    textElements.forEach((element, i) => {
      element.style.animation = "none";
      setTimeout(() => {
        element.style.animation = `slideInUp 1s ease forwards ${i * 0.3}s`;
      }, 50);
    });
  }

  // Next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  // Previous slide
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  // Auto-play slider
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopSlideshow();
    startSlideshow();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopSlideshow();
    startSlideshow();
  });

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      stopSlideshow();
      startSlideshow();
    });
  });

  // Pause on hover
  heroSlider.addEventListener("mouseenter", stopSlideshow);
  heroSlider.addEventListener("mouseleave", startSlideshow);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      stopSlideshow();
      startSlideshow();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      stopSlideshow();
      startSlideshow();
    }
  });

  // Initialize
  showSlide(0);
  startSlideshow();
}

// Testimonials Slider
function initializeTestimonialsSlider() {
  const testimonialsSlider = document.getElementById("testimonialsSlider");
  const testimonials = testimonialsSlider.querySelectorAll(".testimonial-card");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  let currentTestimonial = 0;
  let testimonialInterval;

  // Show specific testimonial
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("active", i === index);
    });
    currentTestimonial = index;
  }

  // Next testimonial
  function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
  }

  // Previous testimonial
  function prevTestimonial() {
    const prev =
      (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prev);
  }

  // Auto-play testimonials
  function startTestimonialSlideshow() {
    testimonialInterval = setInterval(nextTestimonial, 4000);
  }

  function stopTestimonialSlideshow() {
    clearInterval(testimonialInterval);
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextTestimonial();
    stopTestimonialSlideshow();
    startTestimonialSlideshow();
  });

  prevBtn.addEventListener("click", () => {
    prevTestimonial();
    stopTestimonialSlideshow();
    startTestimonialSlideshow();
  });

  // Pause on hover
  testimonialsSlider.addEventListener("mouseenter", stopTestimonialSlideshow);
  testimonialsSlider.addEventListener("mouseleave", startTestimonialSlideshow);

  // Initialize
  showTestimonial(0);
  startTestimonialSlideshow();
}

// Scroll Animations
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right"
  );

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Add classes to elements for animation
  const sections = document.querySelectorAll(".section");
  sections.forEach((section, index) => {
    const elements = section.querySelectorAll(
      ".service-card, .project-card, .team-card, .partner-card"
    );
    elements.forEach((element, i) => {
      // Add appropriate animation class
      if (i % 3 === 0) {
        element.classList.add("fade-in");
      } else if (i % 3 === 1) {
        element.classList.add("slide-in-left");
      } else {
        element.classList.add("slide-in-right");
      }

      // Add delay for staggered animation
      element.style.animationDelay = `${i * 0.1}s`;
    });
  });

  // Observe all animated elements
  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
    .forEach((element) => {
      observer.observe(element);
    });
}

// Back to Top Button
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  // Scroll to top
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Listen for scroll events
  window.addEventListener("scroll", toggleBackToTop);

  // Initial check
  toggleBackToTop();
}

// Newsletter Form
function initializeNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm");

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const submitBtn = this.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();

    if (email) {
      // Disable form during submission
      submitBtn.disabled = true;
      submitBtn.textContent = "Subscribing...";

      // Simulate API call
      setTimeout(() => {
        // Reset form
        emailInput.value = "";
        submitBtn.disabled = false;
        submitBtn.textContent = "SignUp";

        // Show success message
        showNotification(
          "Thank you for subscribing to our newsletter!",
          "success"
        );
      }, 1000);
    }
  });
}

// Scroll Effects
function initializeScrollEffects() {
  const header = document.getElementById("header");

  function handleScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class to header
    if (scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);

  // Initial check
  handleScroll();
}

// Notification System
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#28a745"
            : type === "error"
            ? "#dc3545"
            : "#007bff"
        };
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  const notificationContent = notification.querySelector(
    ".notification-content"
  );
  notificationContent.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    `;

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove notification
  function removeNotification() {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Close button event
  closeBtn.addEventListener("click", removeNotification);

  // Auto remove after 5 seconds
  setTimeout(removeNotification, 5000);
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Optimize scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Scroll-based functions are already handled individually
    // This is just for any additional scroll optimizations
  }, 16)
);

// Handle window resize
window.addEventListener(
  "resize",
  debounce(() => {
    // Close mobile menu on resize
    const navMenu = document.getElementById("navMenu");
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");

    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  }, 250)
);

// Error handling for missing elements
function safeQuerySelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
  return element;
}

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const navMenu = document.getElementById("navMenu");
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");

    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});

// Performance optimization - lazy load images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading if there are data-src images
if (document.querySelectorAll("img[data-src]").length > 0) {
  initializeLazyLoading();
}

console.log("PeriodSlay website initialized successfully! 🌟");
