// HTML에서 id="palette"인 div를 가져옴 — 색상 블록들이 들어갈 컨테이너
// document.getElementById(id): 해당 id를 가진 요소 1개를 반환
const container = document.getElementById('palette');
// HTML에서 id="generate-button"인 버튼을 가져옴 — 클릭 이벤트를 연결하기 위해 필요
const button = document.getElementById('generate-button');

// 랜덤한 16진수 색상 코드(#RRGGBB)를 만드는 함수
// 0xFFFFFF = 16진수로 흰색(즉, 가능한 색상의 최대값)
// Math.random()은 0~1 사이 실수, 곱한 뒤 floor로 정수화
// toString(16): 10진수를 16진수 문자열로 변환
// padStart(6,'0'): 6자리가 안 되면 앞에 0을 채움 (예: "ff" -> "0000ff")
function randomHex() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF)
    .toString(16).padStart(6, '0');
}

// 5개의 색상 블록을 만들어서 컨테이너에 채워넣는 함수
function renderPalette() {
  // innerHTML = '' : 기존 자식 요소를 모두 지움
  container.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const color = randomHex();
    // createElement: 새 DOM 요소를 메모리에 생성 (아직 화면엔 없음)
    const block = document.createElement('div');
    block.className = 'color-block';
    // style.background: 인라인 CSS로 배경색 설정
    block.style.background = color;
    block.textContent = color;
    // 화살표 함수로 클릭 핸들러 등록 — 클릭 시점의 color 값을 클로저로 기억
    block.addEventListener('click', () => copyColor(block, color));
    // appendChild: 실제로 DOM에 붙여서 화면에 표시
    container.appendChild(block);
  }
}

// async/await: 비동기(Promise)를 동기 코드처럼 작성
// navigator.clipboard.writeText: 브라우저 클립보드에 텍스트 복사 (Promise 반환)
async function copyColor(el, hex) {
  await navigator.clipboard.writeText(hex);
  el.textContent = 'Copied!';
  // setTimeout: 일정 시간(ms) 후 콜백 실행 — 1.5초 뒤 원래 색상 코드로 복원
  setTimeout(() => el.textContent = hex, 1500);
}

// 버튼 클릭 시 팔레트 새로 생성 — 원래 버튼에 이벤트가 없어서 클릭해도 아무 반응이 없었음
button.addEventListener('click', renderPalette);
// 키보드 이벤트: e는 이벤트 객체, e.code는 누른 키 코드 ('Space', 'Enter' 등)
document.addEventListener('keydown', e => {
  if (e.code === 'Space') renderPalette();
});

// 페이지가 처음 열릴 때 팔레트를 바로 채워줌 — 없으면 빈 블록만 보임
renderPalette();
