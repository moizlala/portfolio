// Import GSAP and ScrollTrigger
// Note: We're loading these from CDN links in the HTML file

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the page
  initLoader();
  initAnimations();
  initMoodToggle();
  initScrollToTop();
});

// Page loader animation
function initLoader() {
  const loader = document.querySelector(".loader");
  const progressNumber = document.querySelector(".progress-number");

  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1;
    if (progress > 100) progress = 100;

    progressNumber.textContent = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);

      // Hide loader after a short delay
      setTimeout(() => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            loader.classList.add("hidden");
            // Show background name after loader is hidden
            document.querySelector(".background-name").classList.add("visible");
          },
        });
      }, 500);
    }
  }, 100);
}

// Initialize all GSAP animations
function initAnimations() {
  // Hero section animations
  animateHero();

  // Typing animation
  typeText();

  // About section animations
  animateSection(".about", ".about .section-title");

  // Paragraph section animations
  animateSection(".paragraph-section", ".paragraph-column p");

  // Skills section animations
  animateSection(
    ".skills",
    ".skills .section-title span",
    ".skills-description p",
    ".skill"
  );

  // Initialize skill bars
  initSkillBars();

  // Projects section animations
  animateSection(
    ".projects",
    ".projects-title",
    ".projects-description",
    ".project-item"
  );

  // Animate project title decorations
  gsap.from(".projects-title-decoration", {
    scrollTrigger: {
      trigger: ".projects-title-container",
      start: "top 80%",
    },
    width: 0,
    duration: 1.5,
    ease: "power3.out",
    stagger: 0.2,
  });

  // Personal section animations
  animateSection(
    ".personal",
    ".paragraph-title",
    ".personal-column p",
    ".contact-message"
  );

  // Animate contact arrow
  gsap.from(".contact-arrow", {
    scrollTrigger: {
      trigger: ".contact-wrapper",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1,
    ease: "power3.out",
  });
}

// Hero section animations
function animateHero() {
  const tl = gsap.timeline({ delay: 1 });

  tl.to(".year", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  })
    .to(
      ".hero-title h2",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .to(
      ".subtitle",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .to(
      ".social-links",
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

  // Animate the year number
  gsap.to(".animated-number", {
    duration: 2,
    textContent: 2024,
    snap: { textContent: 1 },
    stagger: 1,
    ease: "power3.out",
  });
}

// Generic section animation function
function animateSection(sectionSelector, ...elements) {
  elements.forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: sectionSelector,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  });
}

// Dark mode toggle functionality
function initMoodToggle() {
  const moodToggleBtn = document.getElementById("mood-toggle-btn");
  const htmlElement = document.documentElement;
  let isDarkMode = false;

  // Check for saved user preference
  if (localStorage.getItem("theme") === "dark") {
    htmlElement.setAttribute("data-theme", "dark");
    isDarkMode = true;
  }

  moodToggleBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
      htmlElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }

    // Add transition effect
    gsap.to("body", {
      backgroundColor: isDarkMode ? "var(--secondary-color)" : "#fff",
      color: isDarkMode ? "var(--primary-color)" : "#000",
      duration: 0.5,
      ease: "power3.out",
    });
  });
}

// Initialize skill bars animation
function initSkillBars() {
  const skillLevels = document.querySelectorAll(".skill-level");

  // Create a ScrollTrigger for each skill bar
  skillLevels.forEach((skill) => {
    const level = skill.getAttribute("data-level");
    const skillName = skill.parentElement.previousElementSibling;

    // Add percentage to skill name
    skillName.setAttribute("data-percent", `${level}%`);

    // Animate the skill bar when it comes into view
    ScrollTrigger.create({
      trigger: skill,
      start: "top 80%",
      onEnter: () => {
        gsap.to(skill, {
          width: `${level}%`,
          duration: 1.5,
          ease: "power3.out",
        });
      },
      once: true,
    });
  });
}

// Typing animation function
function typeText() {
  const textElement = document.querySelector(".typing-text");
  const phrases = [
    "Software Engineering student",
    "WordPress Developer",
    "Full-Stack Developer",
    "UI/UX Enthusiast",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Deleting text
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // If finished typing the phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at the end of phrase
    }
    // If finished deleting the phrase
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typing animation after a delay
  setTimeout(type, 2000);
}

// Initialize scroll to top button
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  const scrollTopContainer = document.querySelector(".scroll-to-top");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopContainer.classList.add("visible");
    } else {
      scrollTopContainer.classList.remove("visible");
    }
  });

  // Scroll to top when button is clicked
  scrollTopBtn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: 0,
      },
      ease: "power3.inOut",
    });
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 50,
        },
        ease: "power3.inOut",
      });
    }
  });
});
