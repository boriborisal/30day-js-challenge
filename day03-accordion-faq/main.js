const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.querySelector('.question').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    items.forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
