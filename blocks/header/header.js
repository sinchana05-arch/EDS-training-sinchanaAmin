import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // Load nav as fragment from metadata
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Setup structural classes based on standard EDS conventions
  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // Optional: Automatically mark the current page link as active
  const currentPath = window.location.pathname;
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll('a').forEach((a) => {
      if (new URL(a.href, window.location).pathname === currentPath) {
        a.setAttribute('aria-current', 'page');
        a.closest('li').classList.add('active');
      }
    });
  }

  block.append(nav);
}