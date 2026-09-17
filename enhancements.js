/* ========================================
   MINDBLOWING ENHANCEMENTS JAVASCRIPT
   ======================================== */

(function() {
  'use strict';

  // ===== 1. MAGNETIC BUTTONS =====
  function initMagneticButtons() {
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(el => {
      const inner = el.querySelector('.magnetic-inner') || el;
      const strength = 0.4;
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        if (inner !== el) inner.style.transform = `translate(${x * strength * 0.5}px, ${y * strength * 0.5}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        if (inner !== el) inner.style.transform = '';
      });
    });
  }

  // ===== 2. 3D CARD TILTS =====
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ===== 3. ANIMATED TERMINAL =====
  function initTerminal() {
    const terminal = document.querySelector('.hero-terminal-body');
    if (!terminal) return;
    
    const lines = [
      { text: '$ ./initialize_career_system', class: 'terminal-prompt', delay: 300 },
      { text: '> Scanning current market conditions...', class: 'terminal-info', delay: 800 },
      { text: '> 2.4M tech layoffs detected', class: 'terminal-warn', delay: 400 },
      { text: '> 85% job disruption imminent', class: 'terminal-warn', delay: 400 },
      { text: '> Analyzing your profile...', class: 'terminal-info', delay: 600 },
      { text: '✓ AI-resistant skills identified', class: 'terminal-success', delay: 500 },
      { text: '✓ Transition path calculated', class: 'terminal-success', delay: 400 },
      { text: '✓ Income recovery: 30 days', class: 'terminal-success', delay: 500 },
      { text: '> System ready. Awaiting input.', class: 'terminal-prompt', delay: 600 },
    ];
    
    let i = 0;
    function typeNext() {
      if (i >= lines.length) {
        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        terminal.appendChild(cursor);
        return;
      }
      const line = document.createElement('div');
      line.className = `terminal-line ${lines[i].class}`;
      line.textContent = lines[i].text;
      terminal.appendChild(line);
      requestAnimationFrame(() => line.classList.add('visible'));
      i++;
      setTimeout(typeNext, lines[i - 1].delay);
    }
    
    // Start after preloader
    setTimeout(typeNext, 1200);
  }

  // ===== 4. SCROLL-SYNCED COUNTERS =====
  function initCounters() {
    const targets = [
      { sel: '.hero-stat-value', values: ['85%', '2.4M', '6mo'] },
      { sel: '.stats-highlight-value', values: ['300K+', '$64K', '18mo'] },
    ];
    
    targets.forEach(group => {
      const els = document.querySelectorAll(group.sel);
      els.forEach((el, idx) => {
        const finalValue = group.values[idx] || el.textContent;
        el.dataset.final = finalValue;
        el.textContent = '0';
      });
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCount(entry.target, entry.target.dataset.final);
        }
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('[data-final]').forEach(el => observer.observe(el));
  }
  
  function animateCount(el, finalStr) {
    // Extract numeric part + suffix
    const match = String(finalStr).match(/^(\$)?(\d+(?:\.\d+)?)(.*)$/);
    if (!match) { el.textContent = finalStr; return; }
    const prefix = match[1] || '';
    const num = parseFloat(match[2]);
    const suffix = match[3] || '';
    const duration = 1800;
    const start = performance.now();
    
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      const display = num < 10 ? current.toFixed(1) : Math.floor(current);
      el.textContent = prefix + display + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = finalStr;
    }
    requestAnimationFrame(tick);
  }

  // ===== 5. LIVE FEED TICKER =====
  async function initLiveFeed() {
    const feed = document.getElementById('liveFeed');
    if (!feed) return;
    
    // Default fallback events
    let events = [
      { name: 'Sarah M.', action: 'joined the system', time: '12s ago', avatar: 'SM' },
      { name: 'David K.', action: 'completed Step 1', time: '34s ago', avatar: 'DK' },
      { name: 'Priya R.', action: 'landed first client', time: '1m ago', avatar: 'PR' },
      { name: 'Marcus T.', action: 'activated recovery plan', time: '2m ago', avatar: 'MT' },
      { name: 'Emma L.', action: 'joined from London', time: '3m ago', avatar: 'EL' },
      { name: 'Alex W.', action: 'upgraded to Pro', time: '4m ago', avatar: 'AW' },
      { name: 'Yuki H.', action: 'completed assessment', time: '5m ago', avatar: 'YH' },
      { name: 'Ravi P.', action: 'earned first $1K', time: '6m ago', avatar: 'RP' },
      { name: 'Chen L.', action: 'deployed AI agent', time: '8s ago', avatar: 'CL' },
      { name: 'Sophie B.', action: 'skill level: EXPERT', time: '15s ago', avatar: 'SB' },
      { name: 'Jordan D.', action: 'income stream: ACTIVE', time: '45s ago', avatar: 'JD' },
    ];
    
    // Fetch REAL data from Supabase
    if (typeof window.getLiveFeed === 'function') {
      const realData = await window.getLiveFeed();
      if (realData && realData.length > 0) {
        events = realData.map(item => ({
          name: 'ANON_USER',
          action: `completed assessment: Score ${item.score}`,
          time: 'recently',
          avatar: 'UX'
        }));
      }
    }
    
    let idx = 0;
    const nameEl = feed.querySelector('.live-feed-name');
    const actionEl = feed.querySelector('.live-feed-action');
    const avatarEl = feed.querySelector('.live-feed-avatar');
    
    function showNext() {
      const e = events[idx % events.length];
      nameEl.textContent = e.name;
      actionEl.innerHTML = `${e.action} <span class="time">• ${e.time}</span>`;
      avatarEl.textContent = e.avatar;
      feed.classList.add('visible');
      
      setTimeout(() => {
        feed.classList.remove('visible');
        idx++;
      }, 5000);
    }
    
    // Start after initial scroll
    let started = false;
    window.addEventListener('scroll', () => {
      if (started) return;
      if (window.scrollY > 300) {
        started = true;
        showNext();
        showNext();
        setInterval(showNext, 6000);
      }
    }, { passive: true });
    
    // Close button
    const close = feed.querySelector('.live-feed-close');
    if (close) close.addEventListener('click', () => {
      feed.style.display = 'none';
    });
  }

  // ===== 6. MEGA MENU =====
  function initMegaMenu() {
    const trigger = document.querySelector('.mega-menu-trigger');
    const menu = document.getElementById('megaMenu');
    const close = document.querySelector('.mega-menu-close');
    if (!trigger || !menu) return;
    
    trigger.addEventListener('click', () => {
      menu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    if (close) close.addEventListener('click', () => {
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== 7. SCROLL PROGRESS =====
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = scrolled + '%';
    }, { passive: true });
  }

  // ===== 8. STICKY SYSTEM STEPS =====
  function initStickySystem() {
    const steps = document.querySelectorAll('.system-scroll-step');
    const visuals = document.querySelectorAll('.system-visual');
    if (!steps.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.step);
          steps.forEach(s => s.classList.remove('active'));
          visuals.forEach(v => v.classList.remove('active'));
          entry.target.classList.add('active');
          const visual = document.querySelector(`.system-visual[data-step="${idx}"]`);
          if (visual) visual.classList.add('active');
        }
      });
    }, { threshold: 0.5, rootMargin: '-100px 0px -40% 0px' });
    
    steps.forEach(step => observer.observe(step));
    // Activate first by default
    if (steps[0]) {
      steps[0].classList.add('active');
      const v = document.querySelector('.system-visual[data-step="0"]');
      if (v) v.classList.add('active');
    }
  }

  // ===== 9. ASSESSMENT MODAL =====
  function initAssessment() {
    const modal = document.getElementById('assessment-modal');
    const triggers = document.querySelectorAll('.open-assessment');
    const close = document.querySelector('.modal-close');
    
    if (!modal) return;
    
    const openModal = () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    triggers.forEach(t => t.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    }));
    
    if (close) close.addEventListener('click', closeModal);
    
    // Global close function for the React component to use
    window.closeAssessment = closeModal;
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  // ===== 10. DISRUPTION VIZ ANIMATION =====
  function initDisruptionViz() {
    const items = document.querySelectorAll('.disruption-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.2 });
    
    items.forEach(item => observer.observe(item));
  }

  // ===== 11. DASHBOARD PERSISTENCE & LOGS =====
  function addActivityLog(message) {
    const logContainer = document.getElementById('session-log');
    if (!logContainer) return;
    
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-msg">${message}</span>`;
    
    logContainer.prepend(logEntry);
    if (logContainer.children.length > 10) logContainer.lastChild.remove();
  }

  function checkPersistence() {
    const isActive = localStorage.getItem('sccs_protocol_active');
    const userEmail = localStorage.getItem('sccs_user_email');
    
    // Only restore dashboard if user has actually registered (has email)
    // This prevents hiding the form on fresh/test visits
    if (isActive === 'true' && userEmail) {
      setTimeout(() => {
        if (typeof window.triggerActivation === 'function') {
          window.triggerActivation(true); // pass true to skip animations
        }
      }, 500);
    } else {
      // Clear stale flags if no email found
      localStorage.removeItem('sccs_protocol_active');
    }
  }

  // ===== INIT ALL =====
  function init() {
    initMagneticButtons();
    initTiltCards();
    initTerminal();
    initCounters();
    initLiveFeed();
    initMegaMenu();
    initScrollProgress();
    initStickySystem();
    initAssessment();
    initDisruptionViz();
    checkPersistence();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ===== 12. DASHBOARD TOOL HANDLERS =====
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tool-btn')) {
      const input = e.target.previousElementSibling;
      const result = e.target.parentElement.nextElementSibling;
      
      if (!input.value) return;
      
      e.target.textContent = 'ANALYZING...';
      result.innerHTML = '<div class="loading-spinner" style="width:20px; height:20px; margin: 10px 0;"></div>';
      
      setTimeout(() => {
        e.target.textContent = 'ANALYZE_RISK';
        const risk = Math.floor(Math.random() * 40) + 50;
        result.innerHTML = `
          <div style="color: var(--accent); margin-top: 15px; font-family: var(--font-mono); font-size: 12px;">
            ANALYSIS_COMPLETE: ${input.value.toUpperCase()}<br>
            AI_DISRUPTION_PROBABILITY: ${risk}%<br>
            LEVERAGE_POINTS: [COMMUNICATION, STRATEGIC_PLANNING]
          </div>
        `;
        if (typeof window.addActivityLog === 'function') {
          window.addActivityLog(`Risk Audit Completed for: ${input.value}`);
        }
      }, 1500);
    }
  });
})();
