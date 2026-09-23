export default function decorate(block) {
  /* =========================
     MAIN HEADER
     ========================= */

  const header = document.createElement('div');
  header.className = 'header-container';


  /* =========================
     LOGO
     ========================= */

  const logo = document.createElement('a');
  logo.className = 'header-logo';
  logo.href = '/';
  logo.setAttribute('aria-label', 'Recipe Finder Home');

  const logoIcon = document.createElement('span');
  logoIcon.className = 'header-logo-icon';

  logoIcon.innerHTML = `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M31 56C18 48 10 38 12 25
        C13 16 20 9 31 6
        C42 10 49 18 50 28
        C51 40 43 50 31 56Z"
        fill="#7f9f45"
      />

      <path
        d="M31 55C31 40 31 25 39 14"
        fill="none"
        stroke="#244d43"
        stroke-width="4"
        stroke-linecap="round"
      />

      <path
        d="M30 39C24 34 19 29 17 23"
        fill="none"
        stroke="#244d43"
        stroke-width="3"
        stroke-linecap="round"
      />
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
  nav.setAttribute('aria-label', 'Main navigation');

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
      text: 'About Us',
      href: '/about-us',
    },
    {
      text: 'Contact',
      href: '/contact',
    },
  ];

  links.forEach((item) => {
    const link = document.createElement('a');

    link.href = item.href;
    link.textContent = item.text;
    link.className = 'header-nav-link';

    nav.appendChild(link);
  });


  /* =========================
     SEARCH
     ========================= */

  const search = document.createElement('form');

  search.className = 'header-search';
  search.setAttribute('role', 'search');

  const searchIcon = document.createElement('span');
  searchIcon.className = 'header-search-icon';

  searchIcon.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />

      <path
        d="M16 16L21 21"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  `;

  const searchInput = document.createElement('input');

  searchInput.type = 'search';
  searchInput.placeholder = 'Search recipes...';
  searchInput.setAttribute(
    'aria-label',
    'Search recipes',
  );

  search.appendChild(searchIcon);
  search.appendChild(searchInput);


  /* =========================
     MOBILE MENU BUTTON
     ========================= */

  const menuButton = document.createElement('button');

  menuButton.className = 'header-menu-button';
  menuButton.type = 'button';

  menuButton.setAttribute(
    'aria-label',
    'Open navigation menu',
  );

  menuButton.setAttribute(
    'aria-expanded',
    'false',
  );

  menuButton.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;


  /* =========================
     MENU TOGGLE
     ========================= */

  menuButton.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');

    menuButton.setAttribute(
      'aria-expanded',
      String(isOpen),
    );

    menuButton.setAttribute(
      'aria-label',
      isOpen
        ? 'Close navigation menu'
        : 'Open navigation menu',
    );
  });


  /* =========================
     SEARCH SUBMIT
     ========================= */

  search.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      return;
    }

    window.location.href =
      `/recipes?search=${encodeURIComponent(query)}`;
  });


  /* =========================================================
     VIEW TOGGLE
     ========================================================= */

  const viewToggle = document.createElement('div');

  viewToggle.className = 'header-view-toggle';

  viewToggle.setAttribute(
    'aria-label',
    'Choose header view',
  );


  /* Desktop button */

  const desktopButton = document.createElement('button');

  desktopButton.type = 'button';

  desktopButton.className =
    'header-view-button header-view-desktop';

  desktopButton.textContent = 'Desktop';

  desktopButton.setAttribute(
    'aria-label',
    'Switch to desktop view',
  );


  /* Mobile button */

  const mobileButton = document.createElement('button');

  mobileButton.type = 'button';

  mobileButton.className =
    'header-view-button header-view-mobile';

  mobileButton.textContent = 'Mobile';

  mobileButton.setAttribute(
    'aria-label',
    'Switch to mobile view',
  );


  viewToggle.appendChild(desktopButton);
  viewToggle.appendChild(mobileButton);


  /* =========================
     VIEW FUNCTIONS
     ========================= */

  const setView = (view) => {
    header.classList.remove(
      'view-desktop',
      'view-mobile',
    );

    header.classList.add(
      view === 'mobile'
        ? 'view-mobile'
        : 'view-desktop',
    );

    desktopButton.classList.toggle(
      'active',
      view === 'desktop',
    );

    mobileButton.classList.toggle(
      'active',
      view === 'mobile',
    );

    desktopButton.setAttribute(
      'aria-pressed',
      String(view === 'desktop'),
    );

    mobileButton.setAttribute(
      'aria-pressed',
      String(view === 'mobile'),
    );

    localStorage.setItem(
      'recipeFinderHeaderView',
      view,
    );

    /* Close mobile menu when changing view */

    header.classList.remove('menu-open');

    menuButton.setAttribute(
      'aria-expanded',
      'false',
    );
  };


  /* =========================
     TOGGLE EVENTS
     ========================= */

  desktopButton.addEventListener(
    'click',
    () => {
      setView('desktop');
    },
  );

  mobileButton.addEventListener(
    'click',
    () => {
      setView('mobile');
    },
  );


  /* =========================
     INITIAL VIEW
     ========================= */

  const savedView =
    localStorage.getItem(
      'recipeFinderHeaderView',
    );

  if (savedView === 'desktop' || savedView === 'mobile') {
    setView(savedView);
  } else {
    setView(
      window.innerWidth <= 800
        ? 'mobile'
        : 'desktop',
    );
  }


  /* =========================
     HEADER SECTIONS
     ========================= */

  const left = document.createElement('div');
  left.className = 'header-left';

  left.appendChild(logo);


  const center = document.createElement('div');
  center.className = 'header-center';

  center.appendChild(nav);


  const right = document.createElement('div');
  right.className = 'header-right';

  right.appendChild(search);
  right.appendChild(viewToggle);
  right.appendChild(menuButton);


  /* =========================
     BUILD HEADER
     ========================= */

  header.appendChild(left);
  header.appendChild(center);
  header.appendChild(right);

  block.innerHTML = '';

  block.appendChild(header);
}