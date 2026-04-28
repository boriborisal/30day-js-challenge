// 옵션 목록 — 배열 리터럴
const options = ['JavaScript','TypeScript','Python','Rust','Go','Java','Kotlin','Swift','C++','Ruby','PHP','Dart'];
// 상태 변수들 — let으로 선언해야 재할당 가능
// [...options]: 스프레드 연산자 — 원본 배열을 복사 (filter로 변형해도 원본 유지)
let selected = null, highlighted = -1, filtered = [...options];

const btn = document.getElementById('btn');
const dropdown = document.getElementById('dropdown');
const search = document.getElementById('search');
const optList = document.getElementById('optList');
const result = document.getElementById('result');

// 옵션 리스트를 화면에 그리는 함수 — 상태 변경 후 호출
function renderOptions() {
  // map → join으로 HTML 문자열 생성, innerHTML로 한 번에 삽입
  // 데이터 속성 data-val: HTML에 데이터를 심어두면 클릭 시 e.target.dataset.val로 읽기 가능
  optList.innerHTML = filtered.map((o, i) => `
    <div class="option ${o===selected?'selected':''} ${i===highlighted?'focus':''}" data-val="${o}">${o}</div>
  `).join('');
}

// 드롭다운 열고 닫기 — classList.toggle(클래스, 강제값)
// 두 번째 인자가 true면 추가, false면 제거 (불리언으로 강제 지정)
function toggle(open) {
  dropdown.classList.toggle('show', open);
  btn.classList.toggle('open', open);
  if (open) { search.focus(); }
}

// 버튼 클릭: 현재 상태의 반대로 토글
btn.addEventListener('click', () => toggle(!dropdown.classList.contains('show')));

// 검색창 입력: filter로 부분 일치 항목만 추림
// toLowerCase() 양쪽에 적용 — 대소문자 구분 없이 검색
search.addEventListener('input', () => {
  filtered = options.filter(o => o.toLowerCase().includes(search.value.toLowerCase()));
  highlighted = -1;
  renderOptions();
});

// 이벤트 위임: optList 하나에만 핸들러를 걸고, 클릭된 자식의 데이터로 분기
// 매번 모든 옵션에 핸들러를 거는 것보다 효율적
optList.addEventListener('click', e => {
  const val = e.target.dataset.val;
  if (!val) return;
  selected = val;
  btn.innerHTML = `${val} <span>▾</span>`;
  result.innerHTML = `선택된 값: <strong>${val}</strong>`;
  toggle(false);
  renderOptions();
});

// 바깥 클릭 감지: contains는 '이 요소 안에 인자 요소가 포함되었는가'
// 드롭다운 외부를 클릭하면 닫기
document.addEventListener('click', e => {
  if (!document.getElementById('wrap').contains(e.target)) toggle(false);
});

// 키보드 네비게이션
document.addEventListener('keydown', e => {
  if (!dropdown.classList.contains('show')) return;
  // Math.min/max로 인덱스가 범위를 벗어나지 않게
  if (e.key === 'ArrowDown') { highlighted = Math.min(highlighted+1, filtered.length-1); renderOptions(); }
  if (e.key === 'ArrowUp') { highlighted = Math.max(highlighted-1, 0); renderOptions(); }
  // 옵셔널 체이닝(?.): 앞이 null/undefined면 에러 없이 undefined 반환
  if (e.key === 'Enter' && highlighted >= 0) { optList.querySelectorAll('.option')[highlighted]?.click(); }
  if (e.key === 'Escape') toggle(false);
});

// 초기 렌더 — 페이지가 열리자마자 옵션 목록 표시
renderOptions();
