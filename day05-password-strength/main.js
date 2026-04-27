const pw = document.getElementById('pw');
const bar = document.getElementById('bar');
const label = document.getElementById('label');
const hints = document.getElementById('hints');
const eye = document.getElementById('eye');

const checks = [
  { key: 'len', label: '8자 이상', test: v => v.length >= 8 },
  { key: 'long', label: '12자 이상', test: v => v.length >= 12 },
  { key: 'lower', label: '소문자', test: v => /[a-z]/.test(v) },
  { key: 'upper', label: '대문자', test: v => /[A-Z]/.test(v) },
  { key: 'num', label: '숫자', test: v => /[0-9]/.test(v) },
  { key: 'special', label: '특수문자', test: v => /[^a-zA-Z0-9]/.test(v) },
];

const levels = ['', '매우 약함', '약함', '보통', '강함', '매우 강함'];
const colors = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

pw.addEventListener('input', () => {
  const val = pw.value;
  const score = checks.filter(c => c.test(val)).length;
  const level = val === '' ? 0 : Math.max(1, Math.min(5, Math.ceil(score / 1.2)));

  bar.style.width = `${level * 20}%`;
  bar.style.background = colors[level];
  label.textContent = val ? levels[level] : '';
  label.style.color = colors[level];

  hints.innerHTML = checks.map(c => `
    <span class="hint ${c.test(val) ? 'ok' : ''}">${c.test(val) ? '✓' : '·'} ${c.label}</span>
  `).join('');
});

eye.addEventListener('click', () => {
  pw.type = pw.type === 'password' ? 'text' : 'password';
  eye.textContent = pw.type === 'password' ? '👁' : '🙈';
});
