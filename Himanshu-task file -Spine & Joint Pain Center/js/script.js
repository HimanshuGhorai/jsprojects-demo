// Mobile Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav_links");
  const dropdownLinks = document.querySelectorAll(".has-dropdown");

  // Toggle mobile menu
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Change menu icon
      const icon = this.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Handle dropdown menus in mobile view
  dropdownLinks.forEach((item) => {
    const link = item.querySelector("a");
    const dropdown = item.querySelector(".dropdown-menu");

    if (link && dropdown) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle("active");

          // Rotate arrow icon
          const arrow = this.querySelector(".down_arrow");
          if (arrow) {
            arrow.style.transform = dropdown.classList.contains("active")
              ? "rotate(180deg)"
              : "rotate(0)";
          }
        }
      });
    }
  });

  // Close mobile menu and dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".nav_links") &&
      !e.target.closest(".mobile-nav-toggle")
    ) {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");

        // Reset menu icon
        mobileNavToggle.querySelector("i").classList.remove("fa-times");
        mobileNavToggle.querySelector("i").classList.add("fa-bars");

        // Close dropdowns
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.classList.remove("active");
        });

        // Reset all arrow rotations
        document.querySelectorAll(".down_arrow").forEach((arrow) => {
          arrow.style.transform = "rotate(0)";
        });
      }
    }
  });

  // Move contact buttons inside mobile menu in mobile view
  function updateLayout() {
    const contactBtns = document.querySelector(".contact-btns");

    if (window.innerWidth <= 768) {
      if (!document.querySelector(".nav_links .mobile-contact-btns")) {
        const mobileContactBtns = document.createElement("div");
        mobileContactBtns.className = "mobile-contact-btns";

        // Clone and move buttons inside mobile menu
        if (contactBtns) {
          const clonedBtns = contactBtns.cloneNode(true);
          mobileContactBtns.appendChild(clonedBtns);
          navLinks.appendChild(mobileContactBtns);
          contactBtns.style.display = "none";
        }
      }
    } else {
      // Restore original buttons
      const mobileContactBtns = document.querySelector(
        ".nav_links .mobile-contact-btns"
      );
      if (mobileContactBtns) {
        mobileContactBtns.remove();
      }

      if (contactBtns) {
        contactBtns.style.display = "flex";
      }
    }
  }

  // Handle screen resizing
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");

      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("active");
      });

      document.querySelectorAll(".down_arrow").forEach((arrow) => {
        arrow.style.transform = "rotate(0)";
      });

      mobileNavToggle.querySelector("i").classList.remove("fa-times");
      mobileNavToggle.querySelector("i").classList.add("fa-bars");
    }

    updateLayout();
  });

  updateLayout(); // Run on page load
});
// JavaScript for the testimonials slider

// Fix CORS stylesheet access issues
function safelyAccessStylesheets() {
  const stylesheets = document.styleSheets;
  for (let i = 0; i < stylesheets.length; i++) {
    try {
      // Try to access the rules
      const rules = stylesheets[i].cssRules;
      // If successful, you can do something with the rules
    } catch (e) {
      // If there's a security error, just skip this stylesheet
      if (e.name === "SecurityError") {
        console.log(
          "Skipping stylesheet due to CORS policy:",
          stylesheets[i].href
        );
        continue;
      }
      // Re-throw any other errors
      throw e;
    }
  }
}

// Only call this if you need to access stylesheet rules
// safelyAccessStylesheets();
// Sample testimonials data - you would replace this with your actual data
const testimonials = [
  {
    image: "./images/Vector (1).png",
    content:
      "Dr. Alhamrawy does a great job at listening to the patients needs. He showed me so much care and concern at a time when I didn't know what to do. I would refer him to anyone that has consistent spine and back pain without any gains. Walking into his office, I noticed that he runs a clean and compassionate office that's not like any of the spine and back dr.'s office I've ever been to.",
    name: "Michael Novellino",
    ratingImage: "./images/Untitled-15 2.png",
  },
  {
    image: "./images/Vector (1).png",
    content:
      "I had chronic back pain for years until I met Dr. Alhamrawy. His approach to treatment is holistic and effective. He took the time to explain everything to me and created a personalized treatment plan. After just a few sessions, I noticed significant improvement. The office staff is also incredibly friendly and professional.",
    name: "Sarah Johnson",
    ratingImage: "./images/Untitled-15 2.png",
  },
  {
    image: "./images/Vector (1).png",
    content:
      "The level of care I received from Dr. Alhamrawy was exceptional. He's not only knowledgeable but also genuinely cares about his patients' well-being. I've been to many doctors for my back issues, but none have helped me as much as he has. His office is modern, clean, and the appointments are always on time.",
    name: "Robert Martinez",
    ratingImage: "./images/Untitled-15 2.png",
  },
];

// Get DOM elements
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const contentBox = document.querySelector(".content_box");

// Initialize current slide index
let currentIndex = 0;

// Function to render a testimonial
function renderTestimonial(index) {
  const testimonial = testimonials[index];

  // Create HTML structure for the testimonial
  const testimonialHTML = `
      <div class="review_box active">
        <div class="review_img">
          <img src="${testimonial.image}" alt="testimonial image" />
        </div>
        <p>${testimonial.content}</p>
        <div class="review_text">
          <h3>${testimonial.name}</h3>
          <img src="${testimonial.ratingImage}" alt="rating" />
        </div>
      </div>
    `;

  // Add fade-out class first (if needed)
  const currentReviewBox = contentBox.querySelector(".review_box");
  if (currentReviewBox) {
    currentReviewBox.classList.add("fade-out");

    // After animation completes, update content
    setTimeout(() => {
      contentBox.innerHTML = testimonialHTML;
      // Add fade-in class to new content
      contentBox.querySelector(".review_box").classList.add("fade-in");
    }, 300);
  } else {
    contentBox.innerHTML = testimonialHTML;
    contentBox.querySelector(".review_box").classList.add("fade-in");
  }
}

// Function to go to the next slide
function goToNextSlide() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  renderTestimonial(currentIndex);
}

// Function to go to the previous slide
function goToPrevSlide() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial(currentIndex);
}

// Event listeners for the buttons
nextBtn.addEventListener("click", goToNextSlide);
prevBtn.addEventListener("click", goToPrevSlide);

// Auto-play functionality
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Start auto-play
startAutoPlay();

// Pause auto-play when hovering over the slider
contentBox.addEventListener("mouseenter", stopAutoPlay);
contentBox.addEventListener("mouseleave", startAutoPlay);

// Pause auto-play when pressing navigation buttons
nextBtn.addEventListener("mousedown", stopAutoPlay);
prevBtn.addEventListener("mousedown", stopAutoPlay);
nextBtn.addEventListener("mouseup", startAutoPlay);
prevBtn.addEventListener("mouseup", startAutoPlay);

// Handle touch events for mobile
contentBox.addEventListener("touchstart", stopAutoPlay, { passive: true });
contentBox.addEventListener("touchend", startAutoPlay, { passive: true });

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    stopAutoPlay();
    goToPrevSlide();
    setTimeout(startAutoPlay, 1000);
  } else if (e.key === "ArrowRight") {
    stopAutoPlay();
    goToNextSlide();
    setTimeout(startAutoPlay, 1000);
  }
});

// Initialize the first testimonial
renderTestimonial(currentIndex);

// Add swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

contentBox.addEventListener(
  "touchstart",
  function (e) {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

contentBox.addEventListener(
  "touchend",
  function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left
    goToNextSlide();
  } else if (touchEndX > touchStartX + 50) {
    // Swipe right
    goToPrevSlide();
  }
}
