export default function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  /* =========================
     LOGO
     ========================= */

  const logo = document.createElement('a');
  logo.className = 'header-logo';
  logo.href = '/';

  const logoIcon = document.createElement('span');
  logoIcon.className = 'header-logo-icon';

  logoIcon.innerHTML = `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 36C15 24 25 14 39 10C38 25 29 37 16 40C14 38 12 37 10 36Z"></path>
      <path d="M10 36C18 29 25 23 34 16"></path>
    </svg>
  `;

  const logoText = document.createElement('span');
  logoText.className = 'header-logo-text';
  logoText.textContent = 'Recipe Finder';

  logo.appendChild(logoIcon);
  logo.appendChild(logoText);

  /* =========================
     NAVIGATION
     ========================= */

  const nav = document.createElement('nav');
  nav.className = 'header-nav';

  const links = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Recipes',
      href: '/recipes',
    },
    {
      text: 'About',
      href: '/about-us',
    },
    {
      text: 'Contact',
      href: '/contact',
    },
  ];

  links.forEach((item) => {
    const link = document.createElement('a');

    link.className = 'header-nav-link';
    link.href = item.href;
    link.textContent = item.text;

    nav.appendChild(link);
  });

  /* =========================
     SEARCH
     ========================= */

  const searchForm = document.createElement('form');
  searchForm.className = 'header-search';

  const searchInput = document.createElement('input');

  searchInput.type = 'search';
  searchInput.placeholder = 'Search recipes...';
  searchInput.setAttribute('aria-label', 'Search recipes');

  const searchButton = document.createElement('button');

  searchButton.type = 'submit';
  searchButton.className = 'header-search-button';
  searchButton.setAttribute('aria-label', 'Search');

  searchButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6"></circle>
      <path d="M15 15L20 20"></path>
    </svg>
  `;

  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchButton);

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = searchInput.value.trim();

    if (value) {
      window.location.href =
        `/recipes?search=${encodeURIComponent(value)}`;
    }
  });

  /* =========================
     DESKTOP / MOBILE TOGGLE
     ========================= */

  const viewToggle = document.createElement('div');
  viewToggle.className = 'view-toggle';

  const desktopButton = document.createElement('button');

  desktopButton.type = 'button';
  desktopButton.className = 'view-button desktop-button';
  desktopButton.textContent = 'Desktop';

  const mobileButton = document.createElement('button');

  mobileButton.type = 'button';
  mobileButton.className = 'view-button mobile-button';
  mobileButton.textContent = 'Mobile';

  viewToggle.appendChild(desktopButton);
  viewToggle.appendChild(mobileButton);

  /* =========================
     MOBILE MENU
     ========================= */

  const menuButton = document.createElement('button');

  menuButton.type = 'button';
  menuButton.className = 'header-menu-button';
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.setAttribute('aria-expanded', 'false');

  menuButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7H20"></path>
      <path d="M4 12H20"></path>
      <path d="M4 17H20"></path>
    </svg>
  `;

  /* =========================
     VIEW SWITCH
     ========================= */

  function changeView(view) {
    document.body.classList.remove(
      'view-desktop',
      'view-mobile',
    );

    document.body.classList.add(`view-${view}`);

    desktopButton.classList.remove('active');
    mobileButton.classList.remove('active');

    if (view === 'desktop') {
      desktopButton.classList.add('active');

      nav.classList.remove('mobile-menu-open');

      menuButton.setAttribute(
        'aria-expanded',
        'false',
      );
    }

    if (view === 'mobile') {
      mobileButton.classList.add('active');
    }
  }

  desktopButton.addEventListener('click', () => {
    changeView('desktop');
  });

  mobileButton.addEventListener('click', () => {
    changeView('mobile');
  });

  /* =========================
     MOBILE MENU CLICK
     ========================= */

  menuButton.addEventListener('click', () => {
    const isOpen =
      nav.classList.toggle('mobile-menu-open');

    menuButton.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false',
    );
  });

  /* =========================
     BUILD HEADER
     ========================= */

  headerContainer.appendChild(logo);
  headerContainer.appendChild(nav);
  headerContainer.appendChild(searchForm);
  headerContainer.appendChild(viewToggle);
  headerContainer.appendChild(menuButton);

  block.innerHTML = '';
  block.appendChild(headerContainer);

  /* Default */
  changeView('desktop');
}