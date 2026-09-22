export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  /*
   * Expected structure:
   *
   * Row 1:
   * Image | Recipe title
   *
   * Row 2:
   * Image | Description
   *
   * Row 3:
   * Image | Recipe information
   *
   * Row 4:
   * Image | Cuisine
   */

  const imageColumn = rows[0]?.children[0];

  if (imageColumn) {
    imageColumn.classList.add('recipe-detail-image');
  }

  const content = document.createElement('div');
  content.className = 'recipe-detail-content';

  rows.forEach((row, index) => {
    const cells = [...row.children];

    if (cells.length < 2) return;

    const rightCell = cells[1];

    if (index === 0) {
      rightCell.classList.add('recipe-detail-title');
    } else if (index === 1) {
      rightCell.classList.add('recipe-detail-description');
    } else {
      rightCell.classList.add('recipe-detail-info');
    }

    content.appendChild(rightCell);
  });

  /*
   * Keep image separately and rebuild
   * the content area.
   */

  const firstRow = rows[0];

  block.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'recipe-detail-layout';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'recipe-detail-image-wrapper';

  if (firstRow?.children[0]) {
    imageWrapper.appendChild(
      firstRow.children[0].cloneNode(true),
    );
  }

  layout.appendChild(imageWrapper);
  layout.appendChild(content);

  block.appendChild(layout);
}