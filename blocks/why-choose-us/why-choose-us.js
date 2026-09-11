
export default function decorate(block) {
  const rows = [...block.children];

  // We expect 3 rows:
  // Row 1 = images
  // Row 2 = titles
  // Row 3 = descriptions

  if (rows.length < 3) return;

  const imageCells = [...rows[0].children];
  const titleCells = [...rows[1].children];
  const descriptionCells = [...rows[2].children];

  // Create a new card container
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'why-choose-us-cards';

  for (let i = 0; i < imageCells.length; i += 1) {
    const card = document.createElement('div');
    card.className = 'why-choose-us-card';

    // Image
    const image = imageCells[i].querySelector('picture');

    if (image) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'why-choose-us-image';
      imageWrapper.append(image.cloneNode(true));
      card.append(imageWrapper);
    }

    // Icon
    const icon = document.createElement('div');
    icon.className = 'why-choose-us-icon';

    if (i === 0) {
      icon.textContent = '🍳';
    } else if (i === 1) {
      icon.textContent = '🔍';
    } else {
      icon.textContent = '👨‍👩‍👧';
    }

    card.append(icon);

    // Title
    const title = titleCells[i].querySelector('h1, h2, h3, h4, h5, h6, p');

    if (title) {
      const heading = document.createElement('h3');
      heading.className = 'why-choose-us-title';
      heading.textContent = title.textContent.trim();
      card.append(heading);
    }

    // Description
    const description = descriptionCells[i].querySelector('p');

    if (description) {
      const paragraph = document.createElement('p');
      paragraph.className = 'why-choose-us-description';
      paragraph.textContent = description.textContent.trim();
      card.append(paragraph);
    }

    cardsContainer.append(card);
  }

  // Remove original rows
  rows.forEach((row) => row.remove());

  // Add our new cards
  block.append(cardsContainer);
}