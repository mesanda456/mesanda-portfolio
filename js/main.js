/**
 * Mesanda Sethumika — Signature Portfolio Core Interactions
 * Lightweight, high-performance, and fluid transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteEntryAnimation();
  initRunningBottomBar();
  initLiveGithubStats();
  initProjectsList();
  initHardwareBench();
  initContactActions();
  initNavAndBackToTop();
  initCardSpotlight();
  initScrollReveal();
  initPortrait3DTilt();
  init3DDesignShowcase();
  init3DHeroName();
});

/* ===================================================================
   1. Live GitHub Stats (Non-intrusive)
   =================================================================== */
function initLiveGithubStats() {
  const username = 'mesanda456';
  fetch(`https://api.github.com/users/${username}`)
    .then(r => r.json())
    .then(data => {
      if (data && data.public_repos !== undefined) {
        const repoEl = document.getElementById('stat-repos');
        if (repoEl) repoEl.textContent = `${data.public_repos}+`;
      }
    })
    .catch(() => {
      // Graceful fallback to cached stats
    });
}

/* ===================================================================
   2. Projects Showcase & Architecture Modal with Staggered Transition
   =================================================================== */
function initProjectsList() {
  const grid = document.getElementById('projects-grid');
  const chips = document.querySelectorAll('.filter-chip');
  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  function render(category = 'all') {
    grid.innerHTML = '';
    const filtered = category === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => p.category === category);

    filtered.forEach((p, index) => {
      const card = document.createElement('article');
      // Alternating cinematic film-strip slide: even from left, odd from right
      const animClass = index % 2 === 0 ? 'work-slide-left' : 'work-slide-right';
      card.className = `project-card card-enter ${animClass}`;
      card.id = `project-${p.id}`;
      // Staggered animation delay
      card.style.animationDelay = `${Math.min(index * 0.09, 0.45)}s`;
      card.style.transitionDelay = `${Math.min(index * 0.08, 0.4)}s`;

      card.innerHTML = `
        <div>
          <div class="card-top">
            <span class="card-tag">${p.categoryLabel}</span>
            <span class="card-year">${p.year}</span>
          </div>

          <h3 class="card-title">${p.name}</h3>
          <div class="card-tagline">${p.title}</div>
          <p class="card-desc">${p.shortDesc}</p>
        </div>

        <div>
          <div class="card-skills">
            ${p.skills.slice(0, 4).map(s => `<span class="skill-tag">${s}</span>`).join('')}
            ${p.skills.length > 4 ? `<span class="skill-tag">+${p.skills.length - 4}</span>` : ''}
          </div>

          <div class="card-actions">
            <div class="action-links">
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-link">
                Source ↗
              </a>
              <button class="card-link" style="background:none;border:none;cursor:pointer;" onclick="openProjectModal('${p.id}')">
                Architecture ↗
              </button>
              ${p.id === 'lingua-flip' ? `<a href="#app-design" class="card-link highlight-3d-btn" title="View 3D Animated Mobile Showcase">3D Showcase ✦</a>` : ''}
              ${p.id === 'mediconnect' ? `<a href="#web-design" class="card-link highlight-3d-btn" title="View 3D Animated Web Showcase">3D Showcase ✦</a>` : ''}
            </div>

            <a href="${p.linkedinAddUrl}" target="_blank" rel="noopener noreferrer" class="linkedin-link-btn" title="Add project to your LinkedIn profile">
              Add to LinkedIn ↗
            </a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Re-observe newly rendered cards for entrance animation
    const newCards = grid.querySelectorAll('.work-slide-left, .work-slide-right');
    if ('IntersectionObserver' in window) {
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      newCards.forEach(c => cardObserver.observe(c));
    } else {
      newCards.forEach(c => c.classList.add('active'));
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render(chip.dataset.filter);
    });
  });

  render('all');
}

window.openProjectModal = function(id) {
  const modal = document.getElementById('project-modal');
  if (!modal || typeof PROJECTS_DATA === 'undefined') return;

  const project = PROJECTS_DATA.find(p => p.id === id);
  if (!project) return;

  document.getElementById('modal-title').textContent = project.name;
  document.getElementById('modal-subtitle').textContent = `${project.title} (${project.year})`;
  document.getElementById('modal-desc').textContent = project.fullDesc;

  const highlightsEl = document.getElementById('modal-highlights');
  highlightsEl.innerHTML = project.highlights
    .map(h => `<li style="margin-bottom: 8px; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">${h}</li>`)
    .join('');

  document.getElementById('modal-arch').textContent = project.architecture;

  const tagsEl = document.getElementById('modal-tags');
  tagsEl.innerHTML = project.skills
    .map(s => `<span class="skill-tag">${s}</span>`)
    .join('');

  document.getElementById('modal-github').href = project.githubUrl;
  document.getElementById('modal-linkedin').href = project.linkedinAddUrl;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
};

/* ===================================================================
   3. Hardware Test Bench (ESP8266 Live Firmware Simulation)
   =================================================================== */
function initHardwareBench() {
  const lamp1 = document.getElementById('lamp-1');
  const lamp2 = document.getElementById('lamp-2');
  const lamp3 = document.getElementById('lamp-3');
  const term = document.getElementById('bench-log');

  function log(msg) {
    if (!term) return;
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.style.animation = 'fadeInUp 0.3s ease forwards';
    line.textContent = `[${time}] ${msg}`;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
  }

  function toggle(lamp, gpio, name) {
    lamp.classList.toggle('on');
    const state = lamp.classList.contains('on') ? 'HIGH (Closed/ON)' : 'LOW (Open/OFF)';
    log(`GPIO ${gpio} -> ${state} | Relay '${name}' switched.`);
  }

  document.getElementById('btn-gpio-12')?.addEventListener('click', () => toggle(lamp1, 12, 'Octagon'));
  document.getElementById('btn-gpio-13')?.addEventListener('click', () => toggle(lamp2, 13, 'Center'));
  document.getElementById('btn-gpio-14')?.addEventListener('click', () => toggle(lamp3, 14, 'Tassels'));

  document.getElementById('btn-all-toggle')?.addEventListener('click', () => {
    const allOn = lamp1.classList.contains('on') && lamp2.classList.contains('on') && lamp3.classList.contains('on');
    if (allOn) {
      lamp1.classList.remove('on');
      lamp2.classList.remove('on');
      lamp3.classList.remove('on');
      log('All relays switched to LOW (OFF).');
    } else {
      lamp1.classList.add('on');
      lamp2.classList.add('on');
      lamp3.classList.add('on');
      log('All relays switched to HIGH (ON).');
    }
  });
}

/* ===================================================================
   4. Contact Actions & Toast Feedback
   =================================================================== */
function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  const whatsappBtn = document.getElementById('btn-send-whatsapp');
  const form = document.getElementById('contact-form');

  function showToast(text) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('mesandasethumika@gmail.com').then(() => {
        showToast('✓ Email (mesandasethumika@gmail.com) copied to clipboard');
      });
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('contact-name')?.value || 'A visitor';
      const msg = document.getElementById('contact-msg')?.value || 'Hi Mesanda, I saw your portfolio and would like to connect.';
      const url = `https://wa.me/94704606591?text=${encodeURIComponent(`Hi Mesanda, my name is ${name}.\n\n${msg}`)}`;
      window.open(url, '_blank');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const msg = document.getElementById('contact-msg').value;

      const mailto = `mailto:mesandasethumika@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${msg}`)}`;
      window.location.href = mailto;
    });
  }
}

/* ===================================================================
   5. Active Scroll Navigation & Back to Top
   =================================================================== */
function initNavAndBackToTop() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Show / hide back to top button
    if (backToTop) {
      if (scrollPos > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Scrollspy for nav active state
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 140;
      if (scrollPos >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Nav Click: trigger cinematic beam sweep and highlight
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const beam = targetSection.querySelector('.section-beam-sweep');
          if (beam) {
            beam.classList.remove('active');
            void beam.offsetWidth; // force reflow
            beam.classList.add('active');
          }
        }
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ===================================================================
   6. Subtle Mouse Card Spotlight
   =================================================================== */
function initCardSpotlight() {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .spec-card, .portrait-frame, .bench-card, .timeline-card, .contact-card, .circuit-box');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }, { passive: true });
}

/* ===================================================================
   7. Distinct Cinematic Section Transitions (Intersection Observer)
   =================================================================== */
function initScrollReveal() {
  // Select all specialized animation elements across all sections
  const selector = [
    '.reveal',
    '.reveal-scale',
    '.section-beam-sweep',
    '.spec-deck-1',
    '.spec-deck-2',
    '.spec-deck-3',
    '.work-slide-left',
    '.work-slide-right',
    '.circuit-box',
    '.hardware-aperture',
    '.timeline-card-step',
    '.cert-card-flip',
    '.contact-converge-left',
    '.contact-converge-right',
    '.showcase-visual-right',
    '.showcase-visual-left'
  ].join(', ');

  const elements = document.querySelectorAll(selector);

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ===================================================================
   8. Subtle 3D Tilt on Portrait Card
   =================================================================== */
function initPortrait3DTilt() {
  const frame = document.querySelector('.portrait-frame');
  if (!frame) return;

  frame.addEventListener('mousemove', (e) => {
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / rect.height) * -8;
    const tiltY = (x / rect.width) * 8;

    frame.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
  });

  frame.addEventListener('mouseleave', () => {
    frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}

/* ===================================================================
   9. Cinematic Site Entry Animation (Boot Telemetry & Shutter Reveal)
   =================================================================== */
function initSiteEntryAnimation() {
  const overlay = document.getElementById('site-entry-overlay');
  const fill = document.getElementById('entry-progress-fill');
  const statusText = document.getElementById('entry-status-text');
  const percentText = document.getElementById('entry-percent-text');
  const telemetryText = document.getElementById('entry-telemetry-text');
  const skipBtn = document.getElementById('entry-skip-btn');
  const replayBtn = document.getElementById('btn-replay-intro');

  if (!overlay || !fill || !statusText || !percentText) return;

  const telemetrySteps = [
    { pct: 15, status: 'BOOTING CORE KERNEL...', log: '[0.02s] Initializing RTOS & ESP8266 kernel...' },
    { pct: 40, status: 'MOUNTING MICROSERVICES...', log: '[0.24s] Spring Boot 3 & distributed bus routing loaded' },
    { pct: 70, status: 'SYNCING REPOSITORIES...', log: '[0.65s] 38+ GitHub repositories mapped' },
    { pct: 90, status: 'CALIBRATING SENSORS...', log: '[0.98s] Flame & MQ-2 sensor test bench online' },
    { pct: 100, status: 'SYSTEM READY', log: '[1.20s] Access granted. Welcome, Mesanda.' }
  ];

  let currentTimer = null;
  let isComplete = false;

  function runSequence() {
    isComplete = false;
    overlay.classList.remove('entry-opening', 'entry-hidden');
    document.body.classList.remove('site-entered');
    fill.style.width = '0%';
    percentText.textContent = '0%';
    statusText.textContent = 'INITIALIZING CORE KERNEL...';
    if (telemetryText) telemetryText.textContent = 'Mounting runtime environment...';

    let progress = 0;
    const duration = 1350; // 1.35 seconds for punchy cinematic feel
    const intervalTime = 25;
    const increment = (100 / (duration / intervalTime));

    if (currentTimer) clearInterval(currentTimer);

    currentTimer = setInterval(() => {
      progress = Math.min(100, progress + increment);
      const rounded = Math.floor(progress);

      fill.style.width = `${rounded}%`;
      percentText.textContent = `${rounded}%`;

      // Update telemetry messages based on milestones
      for (let i = telemetrySteps.length - 1; i >= 0; i--) {
        if (rounded >= telemetrySteps[i].pct) {
          statusText.textContent = telemetrySteps[i].status;
          if (telemetryText) telemetryText.textContent = telemetrySteps[i].log;
          break;
        }
      }

      if (progress >= 100) {
        clearInterval(currentTimer);
        finishSequence();
      }
    }, intervalTime);
  }

  function finishSequence() {
    if (isComplete) return;
    isComplete = true;
    if (currentTimer) clearInterval(currentTimer);

    fill.style.width = '100%';
    percentText.textContent = '100%';
    statusText.textContent = 'SYSTEM READY';
    if (telemetryText) telemetryText.textContent = '[1.20s] Access granted. Welcome, Mesanda.';

    // Short pause on 100% before shutter slide
    setTimeout(() => {
      overlay.classList.add('entry-opening');
      document.body.classList.add('site-entered');

      // Hide overlay after shutter slide transition completes
      setTimeout(() => {
        overlay.classList.add('entry-hidden');
      }, 850);
    }, 140);
  }

  function skipIntro() {
    finishSequence();
  }

  // Event Listeners for Skip
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      skipIntro();
    });
  }

  // Keyboard shortcut (Escape or Space to skip)
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') && !isComplete) {
      skipIntro();
    }
  });

  // Replay Trigger from navigation bar
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        runSequence();
      }, 150);
    });
  }

  // Start sequence immediately
  runSequence();
}

/* ===================================================================
   10. Running Bottom Bar Experience Ticker Toggle
   =================================================================== */
function initRunningBottomBar() {
  const bar = document.getElementById('running-bottom-bar');
  const toggleBtn = document.getElementById('running-toggle-btn');
  if (!bar || !toggleBtn) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    bar.classList.toggle('minimized');
    const isMin = bar.classList.contains('minimized');
    toggleBtn.setAttribute('title', isMin ? 'Expand Banner' : 'Minimize Banner');
    toggleBtn.setAttribute('aria-label', isMin ? 'Expand Banner' : 'Minimize Banner');
  });
}

/* ===================================================================
   11. Interactive 3D Design Showcase Controller (thevinuvinan-inspired)
   =================================================================== */
function init3DDesignShowcase() {
  const stages = [
    {
      stageEl: document.getElementById('app-stage'),
      cardEl: document.getElementById('app-3d-card'),
      glowEl: document.querySelector('#app-stage .stage-ambient-glow'),
      chips: document.querySelectorAll('#app-stage .hud-3d-chip'),
      baseRotation: { x: 6, y: -8 }
    },
    {
      stageEl: document.getElementById('web-stage'),
      cardEl: document.getElementById('web-3d-card'),
      glowEl: document.querySelector('#web-stage .stage-ambient-glow'),
      chips: document.querySelectorAll('#web-stage .hud-3d-chip'),
      baseRotation: { x: 6, y: 8 }
    }
  ];

  stages.forEach(({ stageEl, cardEl, glowEl, chips, baseRotation }) => {
    if (!stageEl || !cardEl) return;

    let targetRotX = baseRotation.x;
    let targetRotY = baseRotation.y;
    let currentRotX = baseRotation.x;
    let currentRotY = baseRotation.y;
    let isHovering = false;
    let animFrame = null;

    function renderTilt() {
      // Smooth interpolation (lerp)
      currentRotX += (targetRotX - currentRotX) * 0.12;
      currentRotY += (targetRotY - currentRotY) * 0.12;

      if (!cardEl.classList.contains('auto-orbit')) {
        cardEl.style.transform = `perspective(1100px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateY(${isHovering ? '-12px' : '0px'}) scale3d(1.02, 1.02, 1.02)`;
      }

      if (isHovering || Math.abs(targetRotX - currentRotX) > 0.05 || Math.abs(targetRotY - currentRotY) > 0.05) {
        animFrame = requestAnimationFrame(renderTilt);
      } else {
        animFrame = null;
      }
    }

    function onPointerMove(clientX, clientY) {
      if (cardEl.classList.contains('auto-orbit')) return;

      const rect = stageEl.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Normalized coordinates from center [-1 to 1]
      const normX = Math.max(-1, Math.min(1, ((x / rect.width) - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, ((y / rect.height) - 0.5) * 2));

      // Calculate 3D angles
      targetRotX = baseRotation.x + (-normY * 16);
      targetRotY = baseRotation.y + (normX * 18);

      // Move ambient spotlight glow with cursor
      if (glowEl) {
        glowEl.style.transform = `translate(calc(-50% + ${(normX * 50).toFixed(1)}px), calc(-50% + ${(normY * 50).toFixed(1)}px))`;
      }

      // Parallax translation for floating 3D HUD chips
      chips.forEach((chip, i) => {
        const factor = (i + 1) * 7;
        const depth = 55 + (i * 12);
        chip.style.transform = `translateZ(${depth}px) translate3d(${(normX * factor).toFixed(1)}px, ${(normY * factor).toFixed(1)}px, 0)`;
      });

      if (!animFrame) {
        animFrame = requestAnimationFrame(renderTilt);
      }
    }

    stageEl.addEventListener('mousemove', (e) => {
      isHovering = true;
      cardEl.style.animationPlayState = 'paused';
      onPointerMove(e.clientX, e.clientY);
    });

    stageEl.addEventListener('mouseleave', () => {
      isHovering = false;
      cardEl.style.animationPlayState = 'running';
      targetRotX = baseRotation.x;
      targetRotY = baseRotation.y;

      if (glowEl) {
        glowEl.style.transform = 'translate(-50%, -50%)';
      }

      chips.forEach((chip, i) => {
        const depth = 55 + (i * 12);
        chip.style.transform = `translateZ(${depth}px) translate3d(0, 0, 0)`;
      });

      if (!animFrame) {
        animFrame = requestAnimationFrame(renderTilt);
      }
    });

    // Touch support for tablets & mobile
    stageEl.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        onPointerMove(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    stageEl.addEventListener('touchend', () => {
      targetRotX = baseRotation.x;
      targetRotY = baseRotation.y;
      if (!animFrame) {
        animFrame = requestAnimationFrame(renderTilt);
      }
    });
  });

  // Auto Orbit Toggle Buttons
  const orbitButtons = document.querySelectorAll('.btn-orbit-toggle');
  orbitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetCard = document.getElementById(targetId);
      if (!targetCard) return;

      const isOrbiting = targetCard.classList.toggle('auto-orbit');
      btn.classList.toggle('orbit-active', isOrbiting);

      const textSpan = btn.querySelector('.orbit-text');
      if (textSpan) {
        textSpan.textContent = isOrbiting ? 'Auto Orbit: ON ✦' : 'Auto Orbit: OFF';
      }

      if (isOrbiting) {
        targetCard.style.animationPlayState = 'running';
      } else {
        targetCard.style.transform = '';
      }
    });
  });
}

/* ===================================================================
   12. Signature 3D Hero Name Controller (thevinuvinan style)
   =================================================================== */
function init3DHeroName() {
  const introSection = document.querySelector('.introduction');
  const introName = document.getElementById('intro-name-3d');
  const arrow = document.querySelector('.introduction__arrow');
  if (!introSection || !introName) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let isMoving = false;
  let animId = null;

  function update3D() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    introName.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) translateZ(35px) scale(1.02)`;

    // Calculate light vector based on tilt
    const normX = currentY / 22; // -1 to 1
    const normY = -currentX / 18; // -1 to 1
    const sx = (-normX * 8).toFixed(1);
    const sy = (1 + (-normY * 6)).toFixed(1);

    introName.style.textShadow = `
      ${sx * 0.1}px ${+sy + 1}px 0 #ffe6e2,
      ${sx * 0.2}px ${+sy + 2}px 0 #ffcec7,
      ${sx * 0.3}px ${+sy + 3}px 0 #ffb5ab,
      ${sx * 0.4}px ${+sy + 4}px 0 #ff998c,
      ${sx * 0.5}px ${+sy + 5}px 0 #ff8070,
      ${sx * 0.6}px ${+sy + 6}px 0 #ff6652,
      ${sx * 0.7}px ${+sy + 7}px 0 #ea5340,
      ${sx * 0.8}px ${+sy + 8}px 0 #d5412e,
      ${sx * 0.9}px ${+sy + 9}px 0 #bf321f,
      ${sx}px ${+sy + 10}px 0 #a92412,
      0 12px 3px rgba(0, 0, 0, 0.22),
      0 24px 40px rgba(255, 102, 82, 0.55),
      0 38px 70px rgba(0, 0, 0, 0.65)
    `;

    if (isMoving || Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
      animId = requestAnimationFrame(update3D);
    } else {
      animId = null;
    }
  }

  function handlePointer(clientX, clientY) {
    const rect = introSection.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const normX = Math.max(-1, Math.min(1, ((x / rect.width) - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, ((y / rect.height) - 0.5) * 2));

    targetX = -normY * 18;
    targetY = normX * 22;

    if (!animId) {
      animId = requestAnimationFrame(update3D);
    }
  }

  introSection.addEventListener('mousemove', (e) => {
    isMoving = true;
    handlePointer(e.clientX, e.clientY);
  });

  introSection.addEventListener('mouseleave', () => {
    isMoving = false;
    targetX = 0;
    targetY = 0;
    if (!animId) {
      animId = requestAnimationFrame(update3D);
    }
  });

  introSection.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  introSection.addEventListener('touchend', () => {
    targetX = 0;
    targetY = 0;
    if (!animId) {
      animId = requestAnimationFrame(update3D);
    }
  });

  // Smooth scroll for arrow
  if (arrow) {
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('overview');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}




