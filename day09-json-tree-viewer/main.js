function renderNode(val, key) {
  const div = document.createElement('div');
  const keyEl = key !== null && key !== undefined ? `<span class="key">"${key}": </span>` : '';
  if (val === null) { div.innerHTML = `${keyEl}<span class="null">null</span>`; }
  else if (typeof val === 'boolean') { div.innerHTML = `${keyEl}<span class="bool">${val}</span>`; }
  else if (typeof val === 'number') { div.innerHTML = `${keyEl}<span class="num">${val}</span>`; }
  else if (typeof val === 'string') { div.innerHTML = `${keyEl}<span class="str">"${val}"</span>`; }
  else if (Array.isArray(val)) {
    const d = document.createElement('details');
    d.open = true;
    d.innerHTML = `<summary>${keyEl}Array [${val.length}]</summary>`;
    val.forEach((v, i) => d.appendChild(renderNode(v, i)));
    div.appendChild(d);
  } else {
    const d = document.createElement('details');
    d.open = true;
    d.innerHTML = `<summary>${keyEl}Object {${Object.keys(val).length}}</summary>`;
    Object.entries(val).forEach(([k, v]) => d.appendChild(renderNode(v, k)));
    div.appendChild(d);
  }
  return div;
}

document.getElementById('parseBtn').addEventListener('click', () => {
  const out = document.getElementById('output');
  try {
    const parsed = JSON.parse(document.getElementById('input').value);
    out.innerHTML = '';
    out.appendChild(renderNode(parsed, null));
  } catch(e) {
    out.innerHTML = `<span class="err">파싱 오류: ${e.message}</span>`;
  }
});

document.getElementById('parseBtn').click();
