export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  const title = rows[0]?.textContent.trim();
  const content = rows.slice(1);

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'recipe-tips-content';

  const textWrapper = document.createElement('div');
  textWrapper.className = 'recipe-tips-text';

  const heading = document.createElement('h2');
  heading.textContent = title || 'Recipe Tips';

  textWrapper.appendChild(heading);

  const list = document.createElement('ul');

  content.forEach((row) => {
    const text = row.textContent.trim();

    if (text) {
      const item = document.createElement('li');
      item.textContent = text;
      list.appendChild(item);
    }
  });

  textWrapper.appendChild(list);
  wrapper.appendChild(textWrapper);

  block.appendChild(wrapper);
}