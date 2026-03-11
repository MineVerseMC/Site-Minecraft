/* ═══════════════════════════════════════════════════
   MineVerse – main.js
   Particles · Cursor · Navbar · Scroll animations · IP copy
═══════════════════════════════════════════════════ */

// ── CUSTOM CURSOR GLOW ──────────────────────────────
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// Create real cursor dot
const dot = document.createElement('div');
dot.style.cssText = `
  position:fixed; width:8px; height:8px; background:#00e5ff;
  border-radius:50%; pointer-events:none; z-index:9999;
  transform:translate(-50%,-50%); transition:transform 0.1s;
  box-shadow: 0 0 10px #00e5ff;
`;
document.body.appendChild(dot);
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';
});
document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(1.8)');
document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');

// ── PARTICLES CANVAS ────────────────────────────────
const canvas  = document.getElementById('particles');
const ctx     = canvas.getContext('2d');
let particles = [];
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function randomBetween(a, b) { return a + Math.random() * (b - a); }

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = randomBetween(0, W);
    this.y    = randomBetween(0, H);
    this.size = randomBetween(0.5, 2);
    this.speedX = randomBetween(-0.3, 0.3);
    this.speedY = randomBetween(-0.6, -0.1);
    this.opacity = randomBetween(0.1, 0.6);
    this.color = Math.random() > 0.5 ? '#00e5ff' : '#00ff88';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.001;
    if (this.y < 0 || this.opacity <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── NAVBAR SCROLL ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER MENU ───────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── ACTIVE NAV LINKS ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── SCROLL REVEAL ────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feat-card').forEach(el => revealObserver.observe(el));

// ── IP COPY ──────────────────────────────────────────
function copyIP() {
  const ip = document.getElementById('ip-text')?.textContent || 'play.mineverse.ro';
  navigator.clipboard.writeText(ip).then(() => {
    showToast();
    const btn = document.getElementById('copy-btn');
    if (btn) {
      btn.textContent = '✓ Copiat!';
      btn.style.background = 'rgba(0,255,136,0.15)';
      btn.style.borderColor = 'rgba(0,255,136,0.4)';
      btn.style.color = '#00ff88';
      setTimeout(() => {
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copiază`;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 2000);
    }
  }).catch(() => {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = ip;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast();
  });
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── SMOOTH ANCHOR SCROLL ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── STAFF CARD TILT ──────────────────────────────────
document.querySelectorAll('.staff-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
