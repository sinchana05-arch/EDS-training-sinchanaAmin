export default function decorate(block) {
  const rows = [...block.children];

  const image = rows[0];
  const content = rows[1];

  if (image) {
    image.classList.add('hero-image');
  }

  if (content) {
    content.classList.add('hero-content');
  }
}