const toggle = document.getElementById('toggle');
const html = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';
  localStorage.setItem('theme', theme);
}

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

applyTheme(localStorage.getItem('theme') || 'light');
