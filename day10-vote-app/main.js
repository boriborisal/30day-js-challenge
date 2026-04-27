let items = [
  { id:1, name:'JavaScript', votes:0 },
  { id:2, name:'Python', votes:0 },
  { id:3, name:'Rust', votes:0 },
];
let nextId = 4;

function render() {
  const total = items.reduce((s, i) => s + i.votes, 0);
  const maxVotes = Math.max(...items.map(i => i.votes));
  document.getElementById('total').textContent = `총 ${total}표`;
  document.getElementById('items').innerHTML = items.map(item => {
    const pct = total ? Math.round(item.votes / total * 100) : 0;
    const isWinner = total > 0 && item.votes === maxVotes;
    return `
      <div class="item ${isWinner ? 'winner' : ''}">
        <div class="item-head">
          <span class="name">${item.name} ${isWinner && total ? '🏆' : ''}</span>
          <div class="btns">
            <button class="vote-btn" onclick="vote(${item.id})">+1 투표</button>
            <button class="del-btn" onclick="del(${item.id})">✕</button>
          </div>
        </div>
        <div class="bar-wrap"><div class="bar" style="width:${pct}%"></div></div>
        <div class="info"><span>${pct}%</span><span>${item.votes}표</span></div>
      </div>`;
  }).join('');
}

window.vote = id => { items.find(i => i.id === id).votes++; render(); };
window.del = id => { items = items.filter(i => i.id !== id); render(); };

document.getElementById('addBtn').addEventListener('click', () => {
  const val = document.getElementById('newItem').value.trim();
  if (!val) return;
  items.push({ id: nextId++, name: val, votes: 0 });
  document.getElementById('newItem').value = '';
  render();
});

document.getElementById('newItem').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('addBtn').click();
});

render();
