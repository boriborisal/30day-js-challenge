const list = document.getElementById('list');
let dragging = null;

function addDrag(item) {
  item.addEventListener('dragstart', () => {
    dragging = item;
    setTimeout(() => item.classList.add('dragging'), 0);
  });
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
    document.querySelectorAll('.item').forEach(i => i.classList.remove('over'));
    dragging = null;
  });
  item.addEventListener('dragover', e => {
    e.preventDefault();
    if (item !== dragging) {
      document.querySelectorAll('.item').forEach(i => i.classList.remove('over'));
      item.classList.add('over');
      const rect = item.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      list.insertBefore(dragging, e.clientY < mid ? item : item.nextSibling);
    }
  });
}

document.querySelectorAll('.item').forEach(addDrag);

document.getElementById('addBtn').addEventListener('click', () => {
  const val = document.getElementById('newItem').value.trim();
  if (!val) return;
  const li = document.createElement('li');
  li.className = 'item';
  li.draggable = true;
  li.innerHTML = `<span class="handle">⠿</span><span class="emoji">📌</span><span class="text">${val}</span>`;
  addDrag(li);
  list.appendChild(li);
  document.getElementById('newItem').value = '';
});
