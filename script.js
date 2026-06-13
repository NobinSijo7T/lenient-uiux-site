document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Tracking Glow Effect
  const mouseGlow = document.getElementById('mouse-glow');
  if (mouseGlow) {
    document.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = `${e.clientX}px`;
      mouseGlow.style.top = `${e.clientY}px`;
    });
  }

  // 2. Floating Dust / Particle System (Canvas)
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * -0.5 - 0.1; // Float upwards
        this.color = this.getRandomColor();
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      getRandomColor() {
        const colors = [
          'rgba(255, 0, 127, ',  // Hot Pink
          'rgba(160, 32, 240, ', // Neon Purple
          'rgba(179, 0, 27, ',   // Blood Red
          'rgba(255, 255, 255, '  // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.xSpeedOffset() + this.speedX;
        this.y += this.speedY;

        // Reset if goes off top or sides
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width;
        }
      }

      xSpeedOffset() {
        // Subtle wind drift
        return Math.sin(Date.now() * 0.001 + this.size) * 0.08;
      }

      draw() {
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = 'rgba(160, 32, 240, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Let it run once
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach((el) => {
    revealObserver.observe(el);
  });

  // 4. Parallax Background Scroll offsets
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax background items
    const parallaxItems = document.querySelectorAll('.parallax');
    parallaxItems.forEach(item => {
      const speed = parseFloat(item.getAttribute('data-speed')) || 0.15;
      const offset = scrolled * speed;
      item.style.transform = `translateY(${offset}px)`;
    });

    // Fade hero logo slightly as we scroll down
    const heroBgGraphic = document.querySelector('.hero-parallax-bg');
    if (heroBgGraphic) {
      const speed = 0.25;
      heroBgGraphic.style.transform = `translate(-50%, calc(-50% + ${scrolled * speed}px))`;
    }
  });

  // 5. Apply Modal logic
  const applyButtons = document.querySelectorAll('.apply-btn');
  const modal = document.getElementById('apply-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const applyForm = document.getElementById('apply-form');
  const modalSuccess = document.getElementById('modal-success');

  const openModal = (e) => {
    e.preventDefault();
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('modal-open');
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('modal-open');
      // Reset state
      if (applyForm) applyForm.classList.remove('hidden');
      if (modalSuccess) modalSuccess.classList.add('hidden');
    }
  };

  applyButtons.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside contents
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Handle Form Submission with rebellious design
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic fields extraction
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const specialty = document.getElementById('form-specialty').value;
      
      console.log('Submission Received:', { name, email, specialty });

      // Animate transition to success block
      applyForm.classList.add('hidden');
      if (modalSuccess) {
        modalSuccess.classList.remove('hidden');
        const successTitle = modalSuccess.querySelector('h3');
        if (successTitle) {
          successTitle.textContent = `WELCOME TO THE UNDERGROUND, ${name.toUpperCase()}!`;
        }
      }
    });
  }

  // Mini scroll indicator banner glitch text loader
  const glitchHeader = document.querySelector('.text-glitch');
  if (glitchHeader) {
    glitchHeader.setAttribute('data-text', glitchHeader.textContent.trim());
  }
});
