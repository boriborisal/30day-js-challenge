const CIRC = 565.49;
let mode = 'work', running = false, timerId = null;
let total, remaining, cycles = 0;

function getWork() { return (parseInt(document.getElementById('workMin').value) || 25) * 60; }
function getBreak() { return (parseInt(document.getElementById('breakMin').value) || 5) * 60; }

function init() {
  total = mode === 'work' ? getWork() : getBreak();
  remaining = total;
  updateUI();
}

function updateUI() {
  const m = String(Math.floor(remaining / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0');
  document.getElementById('timeText').textContent = `${m}:${s}`;
  document.getElementById('modeText').textContent = mode === 'work' ? '집중 시간' : '휴식 시간';
  document.getElementById('progress').style.strokeDashoffset = CIRC * (1 - remaining / total);
  document.getElementById('progress').style.stroke = mode === 'work' ? '#e74c3c' : '#2e7d32';
  const dots = Array.from({ length: 4 }, (_, i) => `<span class="cycle-dot ${i < cycles ? 'done' : ''}"></span>`).join('');
  document.getElementById('cycles').innerHTML = `사이클 ${dots}`;
}

function tick() {
  remaining--;
  if (remaining < 0) {
    if (mode === 'work') cycles = (cycles + 1) % 5;
    mode = mode === 'work' ? 'break' : 'work';
    clearInterval(timerId); timerId = null; running = false;
    document.getElementById('startBtn').textContent = '▶ 시작';
    init();
    alert(mode === 'work' ? '🍅 집중 시작!' : '☕ 휴식 시간!');
    return;
  }
  updateUI();
}

document.getElementById('startBtn').addEventListener('click', () => {
  running = !running;
  if (running) { timerId = setInterval(tick, 1000); document.getElementById('startBtn').textContent = '⏸ 일시정지'; }
  else { clearInterval(timerId); document.getElementById('startBtn').textContent = '▶ 시작'; }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerId); timerId = null; running = false;
  document.getElementById('startBtn').textContent = '▶ 시작';
  mode = 'work'; init();
});

document.getElementById('skipBtn').addEventListener('click', () => {
  clearInterval(timerId); timerId = null; running = false;
  document.getElementById('startBtn').textContent = '▶ 시작';
  mode = mode === 'work' ? 'break' : 'work'; init();
});

init();
