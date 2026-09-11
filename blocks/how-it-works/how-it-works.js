import './how-it-works.css';

export default function decorate(block) {
  const rows = [...block.children];

  // Introduction
  if (rows[0]) {
    rows[0].classList.add('how-it-works-intro');
  }

  // Images
  if (rows[1]) {
    rows[1].classList.add('how-it-works-images');

    const cells = [...rows[1].children].filter(
      (cell) => cell.textContent.trim() || cell.querySelector('img')
    );

    cells.slice(0, 3).forEach((cell, index) => {
      cell.classList.add('step-image');

      const number = document.createElement('span');
      number.className = 'step-number';
      number.textContent = `0${index + 1}`;

      cell.append(number);
    });

    // Remove unused cells
    [...rows[1].children].forEach((cell) => {
      if (!cell.textContent.trim() && !cell.querySelector('img')) {
        cell.remove();
      }
    });
  }

  // Titles
  if (rows[2]) {
    rows[2].classList.add('how-it-works-titles');

    [...rows[2].children].forEach((cell) => {
      if (!cell.textContent.trim()) {
        cell.remove();
      }
    });
  }

  // Descriptions
  if (rows[3]) {
    rows[3].classList.add('how-it-works-descriptions');

    [...rows[3].children].forEach((cell) => {
      if (!cell.textContent.trim()) {
        cell.remove();
      }
    });
  }
}