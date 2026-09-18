/* ============================================
   HERO SCROLL INDICATOR — scroll-driven
   ============================================ */
(function() {
  var scrollIndicator = document.querySelector('.hero__scroll');
  if (!scrollIndicator) return;

  function updateScrollIndicator() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 120) {
      scrollIndicator.classList.add('is-hidden');
    } else {
      scrollIndicator.classList.remove('is-hidden');
    }
  }

  window.addEventListener('scroll', updateScrollIndicator, { passive: true });
  updateScrollIndicator();
})();

/* ============================================
   GLOBAL GLITCH BACKGROUND — subtle mouse parallax
   ============================================ */
(function() {
  var glitch = document.getElementById('glitchGlobal');
  if (!glitch) return;

  var layers = glitch.querySelectorAll('.glitch-global__layer');
  if (!layers.length) return;

  var raf = null;
  var mx = 0, my = 0;

  window.addEventListener('mousemove', function(e) {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });

  function tick() {
    raf = null;
    layers.forEach(function(layer, i) {
      var depth = (i + 1) * 3;
      layer.style.transform = 'translate(' + (mx * depth).toFixed(1) + 'px, ' + (my * depth).toFixed(1) + 'px)';
    });
  }
})();

/* ============================================
   GLITCH PULL — wire accent elements to effect
   ============================================ */
(function() {
  var textSelectors = [
    '.section__title-accent:not(.glitch)',
    '.hero__title-accent:not(.glitch)',
    '.contact__title-accent:not(.glitch)',
    '.about__chip',
    '.pf-tag',
    '.pf-link',
    '.portfolio__category',
    '.portfolio__title'
  ];

  textSelectors.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      var text = el.textContent.trim();
      if (text) {
        el.setAttribute('data-text', text);
        el.classList.add('glitch-pull');
      }
    });
  });

  var flashSelectors = [
    '.nav__logo-dot',
    '.about__status-dot',
    '.btn--primary',
    '.btn--ghost',
    '.pf-filter-btn',
    '.pf-shape--dot',
    '.portfolio__shape--dot'
  ];

  flashSelectors.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      el.classList.add('glitch-flash');
    });
  });
})();

/* ============================================
   CUSTOM CURSOR
   ============================================ */
(function() {
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  var mouseX = 0, mouseY = 0;
  var ringX = 0, ringY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  function attachHover() {
    document.querySelectorAll('[data-hover]').forEach(function(el) {
      if (el._hoverAttached) return;
      el._hoverAttached = true;
      el.addEventListener('mouseenter', function() {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      });
      el.addEventListener('mouseleave', function() {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      });
    });
  }
  attachHover();
  // Re-attach for dynamically added elements
  setTimeout(attachHover, 100);
})();

/* ============================================
   PROGRESS BAR
   ============================================ */
(function() {
  var bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = (window.scrollY / scrollHeight) * 100;
    bar.style.width = progress + '%';
  });
})();

/* ============================================
   HERO MOUSE GLOW — follows cursor with lag
   ============================================ */
(function() {
  var glow = document.getElementById('heroMouseGlow');
  var hero = document.getElementById('home');
  if (!glow || !hero) return;

  var glitchBg = hero.querySelector('.hero__glitch-bg');
  var glitchLayers = glitchBg ? glitchBg.querySelectorAll('.hero__glitch-layer') : [];

  var targetX = 0, targetY = 0;
  var currentX = 0, currentY = 0;
  var active = false;

  hero.addEventListener('mousemove', function(e) {
    var rect = hero.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    if (!active) {
      glow.classList.add('active');
      active = true;
    }

    if (glitchLayers.length) {
      var moveX = (e.clientX / window.innerWidth - 0.5) * 6;
      glitchLayers.forEach(function(layer, i) {
        var offsets = [0, moveX, -moveX, moveX * 0.5];
        layer.style.transform = 'translate(' + offsets[i] + 'px, 0)';
      });
    }
  });

  hero.addEventListener('mouseleave', function() {
    glow.classList.remove('active');
    active = false;
    glitchLayers.forEach(function(layer) {
      layer.style.transform = '';
    });
  });

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
    requestAnimationFrame(animate);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate();
  }
})();

/* ============================================
   NAV SCROLL STATE
   ============================================ */
(function() {
  var nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
})();

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
(function() {
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  var nav = document.getElementById('nav');
  if (!burger || !mobileMenu) return;
  burger.addEventListener('click', function() {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    if (nav) nav.classList.toggle('menu-open');
  });
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      if (nav) nav.classList.remove('menu-open');
    });
  });
})();

/* ============================================
   INTERSECTION OBSERVER — REVEAL ON SCROLL
   ============================================ */
(function() {
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Service cards use is-visible for their custom animation
        if (entry.target.hasAttribute('data-anim')) {
          entry.target.classList.add('is-visible');
        }
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  // Exit observer — dim elements as they scroll out
  var exitObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      entry.target.classList.toggle('is-exiting', !entry.isIntersecting);
    });
  }, {
    threshold: 0,
    rootMargin: '-10% 0px -10% 0px'
  });

  // Section dim observer — dim sections that are not in center of viewport
  var sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      entry.target.classList.toggle('is-dimmed', !entry.isIntersecting);
    });
  }, {
    threshold: 0.4,
    rootMargin: '-15% 0px -15% 0px'
  });

  function observeElements() {
    // Reveal animations (exclude portfolio__item — has its own scene system)
    var revealSelectors = [
      '.reveal', '.reveal-left', '.reveal-right', '.reveal-scale',
      '.reveal-rotate', '.reveal-fade', '.reveal-blur',
      '.reveal-children'
    ].join(', ');
    document.querySelectorAll(revealSelectors).forEach(function(el) {
      revealObserver.observe(el);
    });

    // Service cards — custom stagger entrance with data-anim
    var serviceCards = document.querySelectorAll('.service-card[data-anim]');
    serviceCards.forEach(function(card) {
      revealObserver.observe(card);
    });

    // Exit animations
    document.querySelectorAll('.reveal-exit').forEach(function(el) {
      exitObserver.observe(el);
    });

    // Section dimming (exclude portfolio — has its own scene system)
    document.querySelectorAll('.section-dim').forEach(function(el) {
      if (!el.classList.contains('portfolio')) {
        sectionObserver.observe(el);
      }
    });
  }
  observeElements();
  setTimeout(observeElements, 200);
})();

/* ============================================
   PORTFOLIO — Scroll Reveal + Exit + Filter
   ============================================ */
(function() {
  var rows = document.querySelectorAll('.pf-row');
  if (!rows.length) return;

  // Scroll reveal — each row fades in when 15% visible
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  rows.forEach(function(row) {
    revealObs.observe(row);
  });

  // Scroll exit — dim/shrink/blur when row leaves viewport center
  var exitObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.target.classList.contains('is-visible')) return;
      entry.target.classList.toggle('is-exiting', !entry.isIntersecting);
    });
  }, {
    threshold: 0,
    rootMargin: '-15% 0px -15% 0px'
  });

  rows.forEach(function(row) {
    exitObs.observe(row);
  });

  // Filter functionality
  var filterBtns = document.querySelectorAll('.pf-filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        var filter = this.getAttribute('data-filter');
        rows.forEach(function(row) {
          if (filter === 'all' || row.getAttribute('data-category') === filter) {
            row.classList.remove('is-hidden');
          } else {
            row.classList.add('is-hidden');
          }
        });
      });
    });
  }
})();

/* ============================================
   TYPEWRITER EFFECT (only on home page)
   ============================================ */
(function() {
  var target = document.getElementById('typedText');
  if (!target) return;
  var phrases = [
    '品牌视觉设计师 · 数字产品体验专家',
    '用克制的设计，创造不克制的影响力',
    '专注于品牌、界面与动态设计的交叉地带'
  ];
  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 60;

  function type() {
    var currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      charIndex--;
      typeSpeed = 30;
    } else {
      charIndex++;
      typeSpeed = 60;
    }

    target.textContent = currentPhrase.substring(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1500);
})();

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
(function() {
  var magnets = document.querySelectorAll('.btn, .nav__cta, .nav__logo');
  magnets.forEach(function(el) {
    el.addEventListener('mousemove', function(e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      var strength = 0.2;
      el.style.transform = 'translate(' + (x * strength) + 'px, ' + (y * strength) + 'px)';
    });
    el.addEventListener('mouseleave', function() {
      el.style.transform = '';
    });
  });
})();

/* ============================================
   PARALLAX HERO SHAPES
   ============================================ */
(function() {
  var heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;
  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    }
  });
})();

/* ============================================
   SMOOTH SCROLL FOR ANCHORS
   ============================================ */
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ============================================
   SCROLL SPY — NAV ACTIVE HIGHLIGHT
   ============================================ */
(function() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  function updateActive() {
    var scrollPos = window.scrollY + 120;
    var currentId = '';
    sections.forEach(function(section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', updateActive);
  updateActive();
})();

/* ============================================
   PARTICLE SYSTEM — minimal ambient particles
   ============================================ */
(function() {
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var particleCount = 40;
  var colors = ['rgba(63, 236, 232, ', 'rgba(255, 0, 127, '];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      colorIdx: Math.random() > 0.5 ? 0 : 1,
      pulsePhase: Math.random() * Math.PI * 2
    };
  }

  for (var i = 0; i < particleCount; i++) {
    particles.push(createParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var time = Date.now() * 0.001;

    particles.forEach(function(p) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      var pulse = Math.sin(time + p.pulsePhase) * 0.3 + 0.7;
      var alpha = p.opacity * pulse;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors[p.colorIdx] + alpha + ')';
      ctx.fill();

      if (p.radius > 1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = colors[p.colorIdx] + (alpha * 0.1) + ')';
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  }

  // Respect reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate();
  }
})();

/* ============================================
   GLITCH TRIGGER — periodic, restrained
   ============================================ */
(function() {
  var glitchElements = document.querySelectorAll('.glitch');
  if (!glitchElements.length) return;

  function triggerGlitch(el) {
    el.classList.add('glitching');
    setTimeout(function() {
      el.classList.remove('glitching');
    }, 600);
  }

  // Trigger on hover for interactive feel
  glitchElements.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      triggerGlitch(el);
    });
  });

  // Periodic random glitch (every 8-15s, one random element)
  function scheduleNext() {
    var delay = 8000 + Math.random() * 7000;
    setTimeout(function() {
      var idx = Math.floor(Math.random() * glitchElements.length);
      triggerGlitch(glitchElements[idx]);
      scheduleNext();
    }, delay);
  }

  // First glitch after 4s, then periodic
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(scheduleNext, 4000);
  }
})();

/* ============================================
   PORTFOLIO FILTER — handled in portfolio module above
   ============================================ */
