export default function decorate(block) {
  // -----------------------------
  // Create Header Container
  // -----------------------------
  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  // -----------------------------
  // Logo
  // -----------------------------
  const logo = document.createElement('a');
  logo.className = 'header-logo';
  logo.href = '/';
  logo.textContent = 'Recipe Finder';

  // -----------------------------
  // Navigation
  // -----------------------------
  const nav = document.createElement('nav');
  nav.className = 'header-nav';

  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Recipes', href: '/recipes' },
    { text: 'About Us', href: '/about-us' },
    { text: 'Contact', href: '/contact' },
  ];

  navLinks.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.text;
    nav.appendChild(link);
  });

  // -----------------------------
  // Search
  // -----------------------------
  const searchForm = document.createElement('form');
  searchForm.className = 'header-search';

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Search recipes...';
  searchInput.setAttribute('aria-label', 'Search recipes');

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.textContent = 'Search';

  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchButton);

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchValue = searchInput.value.trim();

    if (searchValue) {
      window.location.href = `/recipes?search=${encodeURIComponent(searchValue)}`;
    }
  });

  // -----------------------------
  // View Toggle
  // -----------------------------
  const viewToggle = document.createElement('div');
  viewToggle.className = 'view-toggle';

  const desktopButton = document.createElement('button');
  desktopButton.type = 'button';
  desktopButton.className = 'view-toggle-button desktop-toggle';
  desktopButton.textContent = 'Desktop';

  const mobileButton = document.createElement('button');
  mobileButton.type = 'button';
  mobileButton.className = 'view-toggle-button mobile-toggle';
  mobileButton.textContent = 'Mobile';

  viewToggle.appendChild(desktopButton);
  viewToggle.appendChild(mobileButton);

  // -----------------------------
  // Mobile Menu Button
  // -----------------------------
  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'menu-button';
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.innerHTML = '☰';

  // -----------------------------
  // Change Entire Page View
  // -----------------------------
  function changeView(view) {
    // Remove previous view classes
    document.body.classList.remove('view-desktop');
    document.body.classList.remove('view-mobile');

    // Add selected view class
    document.body.classList.add(`view-${view}`);

    // Update active toggle button
    desktopButton.classList.remove('active');
    mobileButton.classList.remove('active');

    if (view === 'desktop') {
      desktopButton.classList.add('active');

      // Close mobile menu when switching to desktop
      nav.classList.remove('mobile-menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }

    if (view === 'mobile') {
      mobileButton.classList.add('active');
    }

    console.log(`Page view changed to: ${view}`);
  }

  // -----------------------------
  // Toggle Events
  // -----------------------------
  desktopButton.addEventListener('click', () => {
    changeView('desktop');
  });

  mobileButton.addEventListener('click', () => {
    changeView('mobile');
  });

  // -----------------------------
  // Mobile Menu
  // -----------------------------
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-menu-open');

    menuButton.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false',
    );
  });

  // -----------------------------
  // Build Header
  // -----------------------------
  headerContainer.appendChild(logo);
  headerContainer.appendChild(nav);
  headerContainer.appendChild(searchForm);
  headerContainer.appendChild(viewToggle);
  headerContainer.appendChild(menuButton);

  // Remove original authoring content
  block.innerHTML = '';

  // Add generated header
  block.appendChild(headerContainer);

  // -----------------------------
  // Default View
  // -----------------------------
  changeView('desktop');
}