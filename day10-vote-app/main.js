// 투표 항목들 — 각 객체는 id, 이름, 득표수
// let으로 선언한 이유: 항목 삭제 시 새 배열로 통째로 갈아끼우기 때문
let items = [
  { id:1, name:'JavaScript', votes:0 },
  { id:2, name:'Python', votes:0 },
  { id:3, name:'Rust', votes:0 },
];
// 다음에 추가될 항목의 id — 추가할 때마다 ++ 증가
let nextId = 4;

// 화면을 다시 그리는 함수 — 상태가 바뀔 때마다 호출
function render() {
  // reduce: 배열을 한 값으로 줄임 — 모든 votes 합계 구하기
  // (s, i) => s + i.votes : s는 누적, i는 현재 항목, 0은 초기값
  const total = items.reduce((s, i) => s + i.votes, 0);
  // map으로 votes만 뽑은 뒤 스프레드(...)로 Math.max에 인자로 펼침
  const maxVotes = Math.max(...items.map(i => i.votes));

  document.getElementById('total').textContent = `총 ${total}표`;

  // 각 항목을 HTML 문자열로 변환 후 join('')으로 이어붙여 한 번에 innerHTML
  document.getElementById('items').innerHTML = items.map(item => {
    // 비율 계산 — total이 0이면 0% (0으로 나누기 방지)
    const pct = total ? Math.round(item.votes / total * 100) : 0;
    // 1등 표시 조건: 총 표가 있고, 자기 표가 최대값과 같을 때
    const isWinner = total > 0 && item.votes === maxVotes;
    // 템플릿 리터럴은 줄바꿈 자유롭게 가능 — 클래스/이모지를 삼항 연산자로 분기
    // onclick="vote(${item.id})": 인라인 핸들러에 id 박아넣기
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

// 인라인 onclick에서 호출하려면 전역(window)에 함수를 노출시켜야 함
// find: 조건에 맞는 첫 번째 요소 반환 / filter: 모든 일치 항목을 새 배열로
window.vote = id => { items.find(i => i.id === id).votes++; render(); };
window.del = id => { items = items.filter(i => i.id !== id); render(); };

// 추가 버튼
document.getElementById('addBtn').addEventListener('click', () => {
  const val = document.getElementById('newItem').value.trim();
  if (!val) return;
  items.push({ id: nextId++, name: val, votes: 0 });
  document.getElementById('newItem').value = '';
  render();
});

// Enter 키로도 추가되도록 — 키보드 친화적 UX
// e.key: 누른 키 이름 ('Enter','Escape','a' 등)
document.getElementById('newItem').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('addBtn').click();
});

// 첫 렌더 — 초기 항목들 화면에 표시
render();
