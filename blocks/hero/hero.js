export default function decorate(block) {
  /* =========================
     HEADER CONTAINER
     ========================= */

  const container = document.createElement('div');
  container.className = 'header-container';


  /* =========================
     LOGO
     ========================= */

  const logo = document.createElement('a');
  logo.className = 'header-logo';
  logo.href = '/';

  logo.innerHTML = `
    <span class="header-logo-icon">
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
    </span>

    <span class="header-logo-text">
      Recipe Finder
    </span>
  `;


  /* =========================
     NAVIGATION
     ========================= */

  const nav = document.createElement('nav');
  nav.className = 'header-nav';

  const links = [
    ['Home', '/'],
    ['Recipes', '/recipes'],
    ['About Us', '/about-us'],
    ['Contact', '/contact'],
  ];

  links.forEach(([text, href]) => {
    const link = document.createElement('a');

    link.className = 'header-nav-link';
    link.href = href;
    link.textContent = text;

    nav.appendChild(link);
  });


  /* =========================
     SEARCH
     ========================= */

  const search = document.createElement('form');
  search.className = 'header-search';

  search.innerHTML = `
    <span class="header-search-icon">
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
    </span>

    <input
      type="search"
      placeholder="Search recipes..."
      aria-label="Search recipes"
    />
  `;


  /* =========================
     SEARCH FUNCTION
     ========================= */

  search.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = search.querySelector('input');
    const query = input.value.trim();

    if (!query) {
      return;
    }

    window.location.href =
      `/recipes?search=${encodeURIComponent(query)}`;
  });


  /* =========================
     VIEW TOGGLE
     ========================= */

  const toggle = document.createElement('div');
  toggle.className = 'header-view-toggle';

  toggle.innerHTML = `
    <button
      type="button"
      class="header-view-button desktop-button"
      data-view="desktop"
    >
      Desktop
    </button>

    <button
      type="button"
      class="header-view-button mobile-button"
      data-view="mobile"
    >
      Mobile
    </button>
  `;


  /* =========================
     MOBILE MENU
     ========================= */

  const menuButton = document.createElement('button');

  menuButton.type = 'button';
  menuButton.className = 'header-menu-button';

  menuButton.setAttribute(
    'aria-label',
    'Open menu',
  );

  menuButton.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;


  /* =========================
     MOBILE MENU CLICK
     ========================= */

  menuButton.addEventListener('click', () => {
    block.classList.toggle('menu-open');
  });


  /* =========================
     VIEW CHANGE FUNCTION
     ========================= */

  const changeView = (view) => {
    console.log('Changing view to:', view);

    /*
     * This is the important part.
     *
     * Instead of adding/removing many classes,
     * we directly change a data attribute.
     */

    block.setAttribute('data-view', view);

    /* Update active button */

    const buttons =
      toggle.querySelectorAll('.header-view-button');

    buttons.forEach((button) => {
      button.classList.remove('active');
    });

    const activeButton =
      toggle.querySelector(
        `[data-view="${view}"]`,
      );

    if (activeButton) {
      activeButton.classList.add('active');
    }

    /* Close menu */

    block.classList.remove('menu-open');
  };


  /* =========================
     TOGGLE CLICK EVENTS
     ========================= */

  const buttons =
    toggle.querySelectorAll('.header-view-button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;

      changeView(view);
    });
  });


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
  right.appendChild(toggle);
  right.appendChild(menuButton);


  /* =========================
     BUILD HEADER
     ========================= */

  container.appendChild(left);
  container.appendChild(center);
  container.appendChild(right);

  block.innerHTML = '';
  block.appendChild(container);


  /* =========================
     DEFAULT VIEW
     ========================= */

  changeView('desktop');
}