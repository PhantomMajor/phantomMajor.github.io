// Build sidebar/header structure
function buildSidebar() {
  const shell = document.querySelector('.shell');
  if (!shell) return;

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const isHomePage = currentPage === 'index.html' || currentPage === '';

  const aside = document.createElement('aside');
  aside.innerHTML = `
    <button class="hamburger-menu" aria-label="Menu">☰</button>
    <nav>
      ${isHomePage ? '<a></a>' : '<a href="index.html">Home</a>'}
      <a href="essays.html">Essays</a>
      <a href="quotes.html">Quotes</a>
      <a href="cv.html">CV</a>
      <a href="typography-tester.html">Typography</a>
      <div class="nav-footer" style="border-top: 1px solid var(--border); margin-top: auto; padding: 16px 20px;">
        <div style="font-size: 11px; color: var(--border);">© 2026</div>
      </div>
    </nav>
    <div class="sidebar-foot">
      <div>© 2026</div>
    </div>
  `;

  const divider = document.createElement('div');
  divider.className = 'divider';

  shell.insertBefore(divider, shell.firstChild);
  shell.insertBefore(aside, shell.firstChild);
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

  nav.classList.add('open');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
}

// Apply typography settings from tester
function applyTypographySettings() {
  const settings = localStorage.getItem('typographySettings');
  if (!settings) {
    console.log('No typography settings found');
    return;
  }

  const { font, fontSize, lineHeight, contentWidth, bgColor, textColor, accentColor } = JSON.parse(settings);

  console.log('Applying typography settings:', { font, fontSize, lineHeight, contentWidth, bgColor, textColor, accentColor });

  document.documentElement.style.setProperty('--typo-font', font);
  document.documentElement.style.setProperty('--typo-font-size', fontSize + 'px');
  document.documentElement.style.setProperty('--typo-line-height', lineHeight);
  document.documentElement.style.setProperty('--typo-content-width', contentWidth + 'px');
  document.documentElement.style.setProperty('--typo-text-color', textColor);
  document.documentElement.style.setProperty('--typo-accent-color', accentColor);
  document.documentElement.style.setProperty('--typo-bg-color', bgColor);

  // Debug: check if variables are set
  setTimeout(() => {
    const p = document.querySelector('.prose p');
    if (p) {
      const computed = window.getComputedStyle(p);
      console.log('Computed styles on .prose p:', {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
        color: computed.color
      });
    }
  }, 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  initActiveNav();
  initHamburgerMenu();
  applyTypographySettings();
});
