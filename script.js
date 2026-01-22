
// Mobile nav
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});

// Dark mode (persisted)
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
function applyTheme(mode) {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  themeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
}
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  const mode = isDark ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple form validation + mock submit
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setError(id, message) {
  const small = document.querySelector(`[data-error-for="${id}"]`);
  if (small) small.textContent = message || '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Reset errors
  ['name', 'email', 'message'].forEach(id => setError(id, ''));

  if (!name) { setError('name', 'Please enter your name.'); ok = false; }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) { setError('email', 'Enter a valid email.'); ok = false; }
  if (message.length < 5) { setError('message', 'Message is too short.'); ok = false; }

  if (!ok) return;

  statusEl.textContent = 'Sending...';
  // Mock async "send"
  setTimeout(() => {
    statusEl.textContent = 'Thanks! Your message has been sent.';
    form.reset();
  }, 800);
});
``
