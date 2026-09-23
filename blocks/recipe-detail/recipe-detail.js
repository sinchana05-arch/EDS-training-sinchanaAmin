export default function decorate(block) {
  const rows = [...block.children];

  /*
   * EDS removes the block header row ("Recipe Detail")
   * from the content passed to decorate().
   *
   * Therefore:
   * rows[0] = Image + Title
   * rows[1] = Description
   * rows[2] = Recipe information
   */

  if (rows.length < 3) {
    return;
  }

  /* =====================================================
     ROW 1 - IMAGE + TITLE
     ===================================================== */

  const firstRow = rows[0];

  const imageCell = firstRow.children[0];
  const titleCell = firstRow.children[1];

  /* Image wrapper */

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'recipe-detail-image-wrapper';

  if (imageCell) {
    const picture = imageCell.querySelector('picture');
    const img = imageCell.querySelector('img');

    if (picture) {
      imageWrapper.appendChild(picture.cloneNode(true));
    } else if (img) {
      imageWrapper.appendChild(img.cloneNode(true));
    }
  }

  /* =====================================================
     RIGHT SIDE CONTENT
     ===================================================== */

  const content = document.createElement('div');
  content.className = 'recipe-detail-content';

  /* Title */

  if (titleCell) {
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'recipe-detail-title';

    const title = document.createElement('h1');
    title.textContent = titleCell.textContent.trim();

    titleWrapper.appendChild(title);

    content.appendChild(titleWrapper);
  }

  /* =====================================================
     ROW 2 - DESCRIPTION
     ===================================================== */

  const descriptionRow = rows[1];
  const descriptionCell = descriptionRow?.children[1];

  if (descriptionCell) {
    const description = document.createElement('div');

    description.className = 'recipe-detail-description';

    description.textContent = descriptionCell.textContent.trim();

    content.appendChild(description);
  }

  /* =====================================================
     ROW 3 - RECIPE INFORMATION
     ===================================================== */

  const infoRow = rows[2];
  const infoCell = infoRow?.children[1];

  if (infoCell) {
    const info = document.createElement('div');

    info.className = 'recipe-detail-info';

    /*
     * DA.live normally creates separate paragraphs
     * inside the cell.
     */

    const values = [...infoCell.children]
      .map((element) => element.textContent.trim())
      .filter(Boolean);

    /*
     * Fallback if there are no child elements.
     */

    if (!values.length) {
      const fallback = infoCell.textContent
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean);

      values.push(...fallback);
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

      icon.textContent = icons[index];

      const text = document.createElement('span');

      text.className = 'recipe-detail-info-text';

      text.textContent = value;

      item.appendChild(icon);
      item.appendChild(text);

      info.appendChild(item);
    });

    content.appendChild(info);
  }

  /* =====================================================
     FINAL LAYOUT
     ===================================================== */

  const layout = document.createElement('div');

  layout.className = 'recipe-detail-layout';

  layout.appendChild(imageWrapper);
  layout.appendChild(content);

  block.innerHTML = '';

  block.appendChild(layout);
}