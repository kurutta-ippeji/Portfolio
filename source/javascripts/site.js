// Smooth scrolling and interactive features
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links and hero buttons
  const navLinks = document.querySelectorAll('.nav-link');
  const heroButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

  function handleSmoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navbarHeight = 20; // Very minimal offset to get closer to section titles
      let targetPosition = targetSection.offsetTop - navbarHeight;

      // Add extra offset for contact section
      if (targetId === '#contact') {
        targetPosition += 40; // Move contact section down a bit more
      }

      // Ensure projects section uses consistent positioning
      if (targetId === '#projects') {
        targetPosition = targetSection.offsetTop - 20; // Consistent offset for projects
      }

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });

  heroButtons.forEach(button => {
    button.addEventListener('click', handleSmoothScroll);
  });

  // Active section highlighting
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => item.classList.remove('active'));
        if (navItems[index]) {
          navItems[index].classList.add('active');
        }
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener('scroll', updateActiveNav);

  // Initial call
  updateActiveNav();

  // Project card hover effects
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Skill items animation
  const skillItems = document.querySelectorAll('.skill-item');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    skillObserver.observe(item);
  });

  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 200);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
  });

  // Contact links hover effect
  const contactLinks = document.querySelectorAll('.contact-link');

  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Scroll progress indicator
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');

  if (scrollProgressBar) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      scrollProgressBar.style.width = scrollPercent + '%';
    });
  }

  // Theme toggle functionality (toggle rustic <-> light)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const body = document.body;

  function applyTheme(theme) {
    body.classList.remove('light-mode', 'rustic-mode');
    if (theme === 'light') body.classList.add('light-mode');
    if (theme === 'rustic') body.classList.add('rustic-mode');
  }

  const storedTheme = localStorage.getItem('theme') || 'rustic';
  applyTheme(storedTheme);

  themeToggleBtn.addEventListener('click', function() {
    const current = localStorage.getItem('theme') || 'rustic';
    const next = current === 'rustic' ? 'light' : 'rustic';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
});
