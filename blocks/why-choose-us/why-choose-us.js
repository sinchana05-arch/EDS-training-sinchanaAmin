export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('why-choose-us-row');

    const cells = [...row.children];

    cells.forEach((cell) => {
      if (!cell.textContent.trim() && !cell.querySelector('picture, img')) {
        cell.classList.add('empty-cell');
        return;
      }

      cell.classList.add('why-choose-us-card');

      const image = cell.querySelector('picture');
      const heading = cell.querySelector('h3');

      if (image) {
        image.classList.add('why-choose-us-image');
      }

      if (heading) {
        heading.classList.add('why-choose-us-title');
      }
    });
  });
}