const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const LEN = 60;
let data = Array(LEN).fill(50);
let paused = false;

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = 200;
  draw();
}

function draw() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = '#f0f0f0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = H * (i / 4);
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    ctx.fillStyle = '#ccc';
    ctx.font = '10px sans-serif';
    ctx.fillText(100 - i * 25, 4, y + 12);
  }
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(92,107,192,0.3)');
  grad.addColorStop(1, 'rgba(92,107,192,0)');
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = (i / (LEN - 1)) * W;
    const y = H - (v / 100) * H;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
  ctx.beginPath();
  ctx.strokeStyle = '#5c6bc0'; ctx.lineWidth = 2;
  data.forEach((v, i) => {
    const x = (i / (LEN - 1)) * W;
    const y = H - (v / 100) * H;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  const cur = data[data.length - 1];
  const max = Math.max(...data);
  const avg = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
  document.getElementById('cur').textContent = Math.round(cur);
  document.getElementById('max').textContent = Math.round(max);
  document.getElementById('avg').textContent = avg;
}

setInterval(() => {
  if (paused) return;
  const last = data[data.length - 1];
  const next = Math.max(0, Math.min(100, last + (Math.random() - 0.5) * 12));
  data.push(next);
  if (data.length > LEN) data.shift();
  draw();
}, 400);

document.getElementById('pauseBtn').addEventListener('click', function() {
  paused = !paused;
  this.textContent = paused ? '▶ 재개' : '⏸ 일시정지';
  this.classList.toggle('active', paused);
});
document.getElementById('resetBtn').addEventListener('click', () => { data = Array(LEN).fill(50); draw(); });
window.addEventListener('resize', resize);
resize();
