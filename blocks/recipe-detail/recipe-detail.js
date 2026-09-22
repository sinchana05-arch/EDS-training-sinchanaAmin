export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  const firstRow = rows[0];

  const imageCell = firstRow?.children[0];

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

  block.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'recipe-detail-layout';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'recipe-detail-image-wrapper';

  if (imageCell) {
    const picture = imageCell.querySelector('picture');

    if (picture) {
      imageWrapper.appendChild(picture.cloneNode(true));
    }
  }

  layout.appendChild(imageWrapper);
  layout.appendChild(content);

  block.appendChild(layout);
}