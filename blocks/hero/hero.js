export default function decorate(block) {
  const rows = [...block.children];

  const content = document.createElement('div');
  content.className = 'hero-content';

  rows.forEach((row) => {
    content.append(row);
  });

  block.innerHTML = '';
  block.append(content);
}