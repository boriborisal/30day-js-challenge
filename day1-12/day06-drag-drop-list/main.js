const list = document.getElementById('list');
// 현재 드래그 중인 요소를 저장할 변수 — 클로저로 핸들러들 사이에서 공유
let dragging = null;

// 한 항목에 드래그 관련 이벤트들을 모두 등록하는 함수
// HTML5 Drag and Drop API: dragstart(시작) → dragover(위에 떠있을 때) → dragend(끝)
function addDrag(item) {
  // dragstart: 사용자가 항목을 잡기 시작한 순간
  item.addEventListener('dragstart', () => {
    dragging = item;
    // setTimeout(0): 드래그 시작 직후가 아니라 다음 이벤트 루프에서 클래스 추가
    // 이렇게 하지 않으면 드래그 중인 모습 자체가 반투명하게 잡혀버림
    setTimeout(() => item.classList.add('dragging'), 0);
  });
  // dragend: 드래그가 끝났을 때 (어디든 놓았을 때) — 정리 작업
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
    document.querySelectorAll('.item').forEach(i => i.classList.remove('over'));
    dragging = null;
  });
  // dragover: 드래그 중인 항목이 다른 항목 위를 지날 때 계속 발생
  // e.preventDefault() 필수 — 안 하면 drop을 허용하지 않은 걸로 간주됨
  item.addEventListener('dragover', e => {
    e.preventDefault();
    if (item !== dragging) {
      document.querySelectorAll('.item').forEach(i => i.classList.remove('over'));
      item.classList.add('over');
      // getBoundingClientRect: 요소의 화면상 좌표/크기 (top, bottom, left, right, width, height)
      const rect = item.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      // 마우스가 항목 위쪽 절반이면 그 항목 앞에, 아래쪽 절반이면 다음 항목 앞에 끼워넣기
      // insertBefore(새요소, 기준요소): 기준요소 직전에 삽입
      list.insertBefore(dragging, e.clientY < mid ? item : item.nextSibling);
    }
  });
}

// 처음 로드 시 모든 .item에 드래그 핸들러 등록
document.querySelectorAll('.item').forEach(addDrag);

// '추가' 버튼 — 새 항목을 만들고 드래그 가능하게 등록
document.getElementById('addBtn').addEventListener('click', () => {
  // trim()으로 공백만 입력한 경우 무시
  const val = document.getElementById('newItem').value.trim();
  if (!val) return;
  // 새 li 요소 생성 후 속성/내용 채우기
  const li = document.createElement('li');
  li.className = 'item';
  li.draggable = true;
  // innerHTML로 한 번에 자식 구조 만들기 — 사용자 입력은 XSS 위험이 있으니 신뢰할 수 있을 때만
  li.innerHTML = `<span class="handle">⠿</span><span class="emoji">📌</span><span class="text">${val}</span>`;
  addDrag(li);
  list.appendChild(li);
  document.getElementById('newItem').value = '';
});
