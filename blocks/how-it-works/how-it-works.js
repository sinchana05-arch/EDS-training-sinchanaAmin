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

    [...rows[1].children].forEach((cell, index) => {
      cell.classList.add('step-image');

      const number = document.createElement('span');
      number.className = 'step-number';
      number.textContent = `0${index + 1}`;

      cell.append(number);
    });
  }

  // Titles
  if (rows[2]) {
    rows[2].classList.add('how-it-works-titles');
  }

  // Descriptions
  if (rows[3]) {
    rows[3].classList.add('how-it-works-descriptions');
  }
}