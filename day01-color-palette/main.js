// HTML에서 id="palette"인 div를 가져옴 — 색상 블록들이 들어갈 컨테이너
const container = document.getElementById('palette');
// HTML에서 id="generate-button"인 버튼을 가져옴 — 클릭 이벤트를 연결하기 위해 필요
const button = document.getElementById('generate-button');

function randomHex() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF)
    .toString(16).padStart(6, '0');
}

function renderPalette() {
  container.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const color = randomHex();
    const block = document.createElement('div');
    block.className = 'color-block';
    block.style.background = color;
    block.textContent = color;
    block.addEventListener('click', () => copyColor(block, color));
    container.appendChild(block);
  }
}

async function copyColor(el, hex) {
  await navigator.clipboard.writeText(hex);
  el.textContent = 'Copied!';
  setTimeout(() => el.textContent = hex, 1500);
}

// 버튼 클릭 시 팔레트 새로 생성 — 원래 버튼에 이벤트가 없어서 클릭해도 아무 반응이 없었음
button.addEventListener('click', renderPalette);
document.addEventListener('keydown', e => {
  if (e.code === 'Space') renderPalette();
});

// 페이지가 처음 열릴 때 팔레트를 바로 채워줌 — 없으면 빈 블록만 보임
renderPalette();
