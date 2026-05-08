// Build sidebar/header structure
function buildSidebar() {
  const shell = document.querySelector('.shell');
  if (!shell) return;

  const aside = document.createElement('aside');
  aside.innerHTML = `
    <button class="hamburger-menu" aria-label="Menu">☰</button>
    <a class="site-name" href="index.html">Udayaditya</a>
    <button class="dark-mode-toggle" id="darkModeToggle">Dark mode</button>
    <nav>
      <a href="essays.html">Essays</a>
      <a href="quotes.html">Quotes</a>
      <a href="bio.html">Bio</a>
      <a href="cv.html">CV</a>
      <div class="nav-footer" style="border-top: 1px solid var(--border); margin-top: auto; padding: 16px 20px;">
        <div style="font-size: 11px; color: var(--border);">© 2026</div>
      </div>
    </nav>
    <div class="sidebar-foot">
      <button class="dark-mode-toggle" id="darkModeToggle">Dark mode</button>
      <div>© 2026</div>
    </div>
  `;

  const divider = document.createElement('div');
  divider.className = 'divider';

  shell.insertBefore(divider, shell.firstChild);
  shell.insertBefore(aside, shell.firstChild);
}

// Dark mode toggle
function initDarkMode() {
  const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
  if (darkModeToggles.length === 0) return;

  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggles.forEach(btn => btn.textContent = 'Light mode');
  }

  darkModeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isNowDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isNowDark);
      const text = isNowDark ? 'Light mode' : 'Dark mode';
      darkModeToggles.forEach(b => b.textContent = text);
    });
  });
}

// Active nav highlighting
function initActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

// Hamburger menu toggle
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('nav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  initDarkMode();
  initActiveNav();
  initHamburgerMenu();
});
