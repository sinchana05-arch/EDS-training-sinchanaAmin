export default function decorate(block) {
  /*
   * ---------------------------------------------------------
   * HEADER CONTAINER
   * ---------------------------------------------------------
   */

  const header = document.createElement('div');
  header.className = 'header-container';


  /*
   * ---------------------------------------------------------
   * LOGO
   * ---------------------------------------------------------
   */

  const logo = document.createElement('a');

  logo.className = 'header-logo';

  logo.href = '/';

  logo.setAttribute('aria-label', 'Recipe Finder Home');


  /*
   * Leaf logo
   */

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


  /*
   * Logo text
   */

  const logoText = document.createElement('span');

  logoText.className = 'header-logo-text';

  logoText.textContent = 'Recipe Finder';


  logo.appendChild(logoIcon);

  logo.appendChild(logoText);


  /*
   * ---------------------------------------------------------
   * NAVIGATION
   * ---------------------------------------------------------
   */

  const nav = document.createElement('nav');

  nav.className = 'header-nav';

  nav.setAttribute('aria-label', 'Main navigation');


  /*
   * Navigation links
   */

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
      href: 'https://main--eds-training-sinchanaamin--sinchana05-arch.aem.page/aboutus',
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


  /*
   * ---------------------------------------------------------
   * SEARCH
   * ---------------------------------------------------------
   */

  const search = document.createElement('form');

  search.className = 'header-search';

  search.setAttribute('role', 'search');


  /*
   * Search icon
   */

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


  /*
   * Search input
   */

  const searchInput = document.createElement('input');

  searchInput.type = 'search';

  searchInput.placeholder = 'Search recipes...';

  searchInput.setAttribute(
    'aria-label',
    'Search recipes',
  );


  search.appendChild(searchIcon);

  search.appendChild(searchInput);


  /*
   * ---------------------------------------------------------
   * MOBILE MENU BUTTON
   * ---------------------------------------------------------
   */

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


  /*
   * ---------------------------------------------------------
   * MOBILE MENU
   * ---------------------------------------------------------
   */

  menuButton.addEventListener('click', () => {
    const isOpen = header.classList.toggle(
      'menu-open',
    );

    menuButton.setAttribute(
      'aria-expanded',
      String(isOpen),
    );
  });


  /*
   * ---------------------------------------------------------
   * SEARCH SUBMIT
   * ---------------------------------------------------------
   */

  search.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      return;
    }

    /*
     * Change this URL later if your recipe
     * search page uses a different path.
     */

    window.location.href =
      `/recipes?search=${encodeURIComponent(query)}`;
  });


  /*
   * ---------------------------------------------------------
   * BUILD HEADER
   * ---------------------------------------------------------
   */

  const left = document.createElement('div');

  left.className = 'header-left';

  left.appendChild(logo);


  const center = document.createElement('div');

  center.className = 'header-center';

  center.appendChild(nav);


  const right = document.createElement('div');

  right.className = 'header-right';

  right.appendChild(search);

  right.appendChild(menuButton);


  header.appendChild(left);

  header.appendChild(center);

  header.appendChild(right);


  /*
   * ---------------------------------------------------------
   * CLEAN ORIGINAL BLOCK
   * ---------------------------------------------------------
   */

  block.innerHTML = '';

  block.appendChild(header);
}