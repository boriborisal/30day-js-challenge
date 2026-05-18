const canvas = document.getElementById('chart');
// getContext('2d'): Canvas에 그림을 그릴 수 있는 2D 그리기 도구
const ctx = canvas.getContext('2d');
const LEN = 60; // 보여줄 데이터 개수
// Array(60).fill(50): 길이 60짜리 배열을 50으로 모두 채움
let data = Array(LEN).fill(50);
let paused = false;

// 캔버스 크기 조정 — 화면 크기 변경에 대응
function resize() {
  // offsetWidth: 요소의 실제 화면 너비(px)
  // canvas의 width/height는 픽셀 단위로 명시해야 또렷하게 그려짐
  canvas.width = canvas.offsetWidth;
  canvas.height = 200;
  draw();
}

// 캔버스에 차트를 그리는 함수
function draw() {
  const W = canvas.width, H = canvas.height;
  // clearRect: 사각형 영역 지우기 — 다시 그리기 전에 이전 그림 제거
  ctx.clearRect(0, 0, W, H);

  // 격자 가로선 4줄
  ctx.strokeStyle = '#f0f0f0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = H * (i / 4);
    // beginPath → moveTo(시작점) → lineTo(끝점) → stroke(선 그리기) 순서
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    ctx.fillStyle = '#ccc';
    ctx.font = '10px sans-serif';
    // fillText(텍스트, x, y): 좌표에 글자 그리기
    ctx.fillText(100 - i * 25, 4, y + 12);
  }

  // 그라데이션: 위에서 아래로 색이 점점 투명해지는 효과
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(92,107,192,0.3)');
  grad.addColorStop(1, 'rgba(92,107,192,0)');

  // 영역 채우기 (그래프 아래쪽 그라데이션)
  ctx.beginPath();
  data.forEach((v, i) => {
    // x: 인덱스를 0~W로 매핑 / y: 값을 0~100에서 H~0으로 뒤집어 매핑(위가 큰 값)
    const x = (i / (LEN - 1)) * W;
    const y = H - (v / 100) * H;
    // 첫 점은 moveTo, 나머지는 lineTo로 이어 그림
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  // 오른쪽 아래 → 왼쪽 아래로 닫아서 면적을 만듦
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  // 위 라인(꺾은선)
  ctx.beginPath();
  ctx.strokeStyle = '#5c6bc0'; ctx.lineWidth = 2;
  data.forEach((v, i) => {
    const x = (i / (LEN - 1)) * W;
    const y = H - (v / 100) * H;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // 통계 카드 업데이트
  const cur = data[data.length - 1]; // 마지막 값(현재값)
  // 스프레드 연산자(...)로 배열을 인자로 펼쳐서 Math.max에 전달
  const max = Math.max(...data);
  // reduce(누적함수, 초기값): 모든 값을 합산 → 평균
  const avg = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
  document.getElementById('cur').textContent = Math.round(cur);
  document.getElementById('max').textContent = Math.round(max);
  document.getElementById('avg').textContent = avg;
}

// setInterval(콜백, ms): 일정 주기로 콜백 반복 실행 (타이머 ID 반환)
setInterval(() => {
  if (paused) return;
  const last = data[data.length - 1];
  // 직전 값에 -6 ~ +6 범위의 랜덤 변화량을 더해 자연스러운 곡선 만들기
  // Math.max/min으로 0~100 범위 안에 가둠
  const next = Math.max(0, Math.min(100, last + (Math.random() - 0.5) * 12));
  data.push(next);
  // 데이터가 60개 넘으면 제일 오래된 것 제거 → 큐처럼 동작
  if (data.length > LEN) data.shift();
  draw();
}, 400);

// 일시정지 버튼 — 일반 함수 사용 (this를 버튼 자체로 받기 위해)
// 화살표 함수에선 this가 외부에서 상속되므로 이 패턴엔 부적합
document.getElementById('pauseBtn').addEventListener('click', function() {
  paused = !paused;
  this.textContent = paused ? '▶ 재개' : '⏸ 일시정지';
  this.classList.toggle('active', paused);
});
// 초기화: 데이터 다시 50으로 채워서 다시 그림
document.getElementById('resetBtn').addEventListener('click', () => { data = Array(LEN).fill(50); draw(); });
// 창 크기 변경 시 캔버스도 다시 사이즈 맞춤
window.addEventListener('resize', resize);
resize();
