const options = ['JavaScript','TypeScript','Python','Rust','Go','Java','Kotlin','Swift','C++','Ruby','PHP','Dart'];
let selected = null, highlighted = -1, filtered = [...options];

const btn = document.getElementById('btn');
const dropdown = document.getElementById('dropdown');
const search = document.getElementById('search');
const optList = document.getElementById('optList');
const result = document.getElementById('result');

function renderOptions() {
  optList.innerHTML = filtered.map((o, i) => `
    <div class="option ${o===selected?'selected':''} ${i===highlighted?'focus':''}" data-val="${o}">${o}</div>
  `).join('');
}

function toggle(open) {
  dropdown.classList.toggle('show', open);
  btn.classList.toggle('open', open);
  if (open) { search.focus(); }
}

btn.addEventListener('click', () => toggle(!dropdown.classList.contains('show')));

search.addEventListener('input', () => {
  filtered = options.filter(o => o.toLowerCase().includes(search.value.toLowerCase()));
  highlighted = -1;
  renderOptions();
});

optList.addEventListener('click', e => {
  const val = e.target.dataset.val;
  if (!val) return;
  selected = val;
  btn.innerHTML = `${val} <span>▾</span>`;
  result.innerHTML = `선택된 값: <strong>${val}</strong>`;
  toggle(false);
  renderOptions();
});

document.addEventListener('click', e => {
  if (!document.getElementById('wrap').contains(e.target)) toggle(false);
});

document.addEventListener('keydown', e => {
  if (!dropdown.classList.contains('show')) return;
  if (e.key === 'ArrowDown') { highlighted = Math.min(highlighted+1, filtered.length-1); renderOptions(); }
  if (e.key === 'ArrowUp') { highlighted = Math.max(highlighted-1, 0); renderOptions(); }
  if (e.key === 'Enter' && highlighted >= 0) { optList.querySelectorAll('.option')[highlighted]?.click(); }
  if (e.key === 'Escape') toggle(false);
});

renderOptions();
