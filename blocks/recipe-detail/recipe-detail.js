export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) {
    return;
  }

  /*
   * ---------------------------------------------------------
   * CREATE INSTRUCTIONS CONTAINER
   * ---------------------------------------------------------
   */

  const container = document.createElement('div');
  container.className = 'instructions-container';

  /*
   * ---------------------------------------------------------
   * CREATE HEADING
   * ---------------------------------------------------------
   */

  const heading = document.createElement('div');
  heading.className = 'instructions-heading';

  /*
   * Chef hat SVG icon
   */

  const icon = document.createElement('span');
  icon.className = 'instructions-icon';
  icon.setAttribute('aria-hidden', 'true');

  icon.innerHTML = `
    <svg viewBox="0 0 48 48" role="img">
      <path d="M12 22h24v17H12z"></path>
      <path d="M9 22h30"></path>
      <path d="M15 22v-4"></path>
      <path d="M33 22v-4"></path>
      <path d="M15 18c0-5 3-8 7-8"></path>
      <path d="M33 18c0-5-3-8-7-8"></path>
      <path d="M18 39h12"></path>
    </svg>
  `;

  /*
   * Heading text
   */

  const title = document.createElement('h2');
  title.textContent = 'Instructions';

  heading.appendChild(icon);
  heading.appendChild(title);

  container.appendChild(heading);

  /*
   * Green underline
   */

  const underline = document.createElement('div');
  underline.className = 'instructions-heading-line';

  container.appendChild(underline);

  /*
   * ---------------------------------------------------------
   * CONTENT
   * ---------------------------------------------------------
   */

  const content = document.createElement('div');
  content.className = 'instructions-content';

  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell) => {
      /*
       * Move all authored content into the instructions area.
       */

      [...cell.childNodes].forEach((node) => {
        content.appendChild(node.cloneNode(true));
      });
    });
  });

  /*
   * ---------------------------------------------------------
   * STYLE MAIN ORDERED LIST
   * ---------------------------------------------------------
   */

  const orderedLists = content.querySelectorAll('ol');

  orderedLists.forEach((list) => {
    list.classList.add('instructions-list');
  });

  /*
   * ---------------------------------------------------------
   * STYLE NESTED LISTS
   * ---------------------------------------------------------
   */

  const nestedLists = content.querySelectorAll('ol ul, ol ol');

  nestedLists.forEach((list) => {
    list.classList.add('instructions-sub-list');
  });

  /*
   * ---------------------------------------------------------
   * MAKE MAIN STEP TITLES BOLD
   * ---------------------------------------------------------
   *
   * If the first text inside each main <li> is plain text,
   * this does not change the content structure.
   */

  const mainItems = content.querySelectorAll(
    'ol.instructions-list > li',
  );

  mainItems.forEach((item) => {
    const firstElement = item.firstElementChild;

    /*
     * If the first element is a nested list, don't modify it.
     */

    if (
      firstElement
      && (firstElement.tagName === 'UL'
      || firstElement.tagName === 'OL')
    ) {
      return;
    }

    /*
     * If the first element is a paragraph,
     * make it the step title.
     */

    if (firstElement && firstElement.tagName === 'P') {
      firstElement.classList.add('instruction-step-title');
    }
  });

  /*
   * ---------------------------------------------------------
   * BUILD FINAL BLOCK
   * ---------------------------------------------------------
   */

  block.innerHTML = '';

  block.appendChild(container);
  container.appendChild(content);
}