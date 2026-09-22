export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  /*
   * ---------------------------------------------------------
   * FIRST ROW
   * Recipe Detail block title
   * ---------------------------------------------------------
   */

  const firstRow = rows[0];

  /*
   * ---------------------------------------------------------
   * IMAGE
   * ---------------------------------------------------------
   */

  const imageRow = rows[1];
  const imageCell = imageRow?.children[0];

  /*
   * ---------------------------------------------------------
   * CONTENT
   * ---------------------------------------------------------
   */

  const content = document.createElement('div');
  content.className = 'recipe-detail-content';

  /*
   * Recipe title
   */

  const titleRow = rows[1];
  const titleCell = titleRow?.children[1];

  if (titleCell) {
    const title = document.createElement('div');
    title.className = 'recipe-detail-title';

    const heading = document.createElement('h1');
    heading.textContent = titleCell.textContent.trim();

    title.appendChild(heading);
    content.appendChild(title);
  }

  /*
   * Recipe description
   */

  const descriptionRow = rows[2];
  const descriptionCell = descriptionRow?.children[1];

  if (descriptionCell) {
    const description = document.createElement('div');
    description.className = 'recipe-detail-description';

    description.textContent = descriptionCell.textContent.trim();

    content.appendChild(description);
  }

  /*
   * ---------------------------------------------------------
   * RECIPE INFORMATION
   * ---------------------------------------------------------
   *
   * The fourth row contains:
   *
   * 30 mins
   * 2 servings
   * Indian Cuisine
   * Easy
   *
   * All inside ONE cell.
   */

  const infoRow = rows[3];
  const infoCell = infoRow?.children[1];

  if (infoCell) {
    const info = document.createElement('div');
    info.className = 'recipe-detail-info';

    const values = [...infoCell.children]
      .map((item) => item.textContent.trim())
      .filter(Boolean);

    /*
     * If DA.live doesn't create separate paragraphs,
     * fall back to line-separated text.
     */

    if (!values.length) {
      const textValues = infoCell.textContent
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);

      values.push(...textValues);
    }

    const icons = [
      '◷',
      '♟',
      '♧',
      '▥',
    ];

    values.slice(0, 4).forEach((value, index) => {
      const item = document.createElement('span');

      item.className = 'recipe-detail-info-item';

      const icon = document.createElement('span');
      icon.className = 'recipe-detail-info-icon';
      icon.textContent = icons[index] || '';

      const text = document.createElement('span');
      text.className = 'recipe-detail-info-text';
      text.textContent = value;

      item.appendChild(icon);
      item.appendChild(text);

      info.appendChild(item);
    });

    content.appendChild(info);
  }

  /*
   * ---------------------------------------------------------
   * BUILD IMAGE
   * ---------------------------------------------------------
   */

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'recipe-detail-image-wrapper';

  if (imageCell) {
    const picture = imageCell.querySelector('picture');

    if (picture) {
      imageWrapper.appendChild(picture.cloneNode(true));
    }
  }

  /*
   * ---------------------------------------------------------
   * BUILD FINAL LAYOUT
   * ---------------------------------------------------------
   */

  const layout = document.createElement('div');
  layout.className = 'recipe-detail-layout';

  layout.appendChild(imageWrapper);
  layout.appendChild(content);

  block.innerHTML = '';
  block.appendChild(layout);
}