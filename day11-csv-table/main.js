let rows = [], sortCol = -1, sortAsc = true;

function parseCSV(text) {
  return text.trim().split('\n').map(line => {
    const cols = []; let cur = '', inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    cols.push(cur.trim());
    return cols;
  });
}

function renderTable() {
  if (!rows.length) return;
  const [headers, ...data] = rows;
  const sorted = [...data].sort((a, b) => {
    if (sortCol < 0) return 0;
    const av = a[sortCol] || '', bv = b[sortCol] || '';
    const n = Number(av) - Number(bv);
    const cmp = isNaN(n) ? av.localeCompare(bv) : n;
    return sortAsc ? cmp : -cmp;
  });
  document.getElementById('info').textContent = `${data.length}행 × ${headers.length}열`;
  document.getElementById('table').innerHTML = `
    <thead><tr>${headers.map((h, i) => `<th class="${sortCol===i?(sortAsc?'asc':'desc'):''}" onclick="sort(${i})">${h}</th>`).join('')}</tr></thead>
    <tbody>${sorted.map(r => `<tr>${headers.map((_, i) => `<td>${r[i]||''}</td>`).join('')}</tr>`).join('')}</tbody>`;
}

window.sort = i => { sortAsc = sortCol === i ? !sortAsc : true; sortCol = i; renderTable(); };

document.getElementById('parseBtn').addEventListener('click', () => {
  const val = document.getElementById('paste').value;
  if (!val.trim()) return;
  rows = parseCSV(val);
  sortCol = -1; renderTable();
});

const drop = document.getElementById('drop');
drop.addEventListener('click', () => document.getElementById('fileInput').click());
drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
drop.addEventListener('dragleave', () => drop.classList.remove('over'));
drop.addEventListener('drop', e => {
  e.preventDefault(); drop.classList.remove('over');
  const file = e.dataTransfer.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { rows = parseCSV(ev.target.result); sortCol = -1; renderTable(); };
  reader.readAsText(file, 'utf-8');
});
document.getElementById('fileInput').addEventListener('change', e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = ev => { rows = parseCSV(ev.target.result); sortCol = -1; renderTable(); };
  reader.readAsText(file, 'utf-8');
});

document.getElementById('paste').value = `이름,나이,도시,직업\n클로이,24,서울,개발자\n철수,30,부산,디자이너\n영희,27,대전,기획자\n민준,32,인천,개발자\n수아,25,서울,마케터`;
document.getElementById('parseBtn').click();
