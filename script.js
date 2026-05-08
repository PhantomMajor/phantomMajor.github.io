// Build sidebar/header structure
function buildSidebar() {
  const shell = document.querySelector('.shell');
  if (!shell) return;

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const isHomePage = currentPage === 'index.html' || currentPage === '';
  const homeLink = isHomePage ? '' : '<a href="index.html">Home</a>';

  const aside = document.createElement('aside');
  aside.innerHTML = `
    <button class="hamburger-menu" aria-label="Menu">☰</button>
    <nav>
      ${homeLink}
      <a href="essays.html">Essays</a>
      <a href="quotes.html">Quotes</a>
      <a href="cv.html">CV</a>
      <a href="typography-tester.html">Typography</a>
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
  initDarkMode();
  initActiveNav();
  initHamburgerMenu();
  applyTypographySettings();
});
