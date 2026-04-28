const toggle = document.getElementById('toggle');
// document.documentElement: <html> 태그를 가리키는 특수 속성
// body가 아니라 html에 data-theme를 걸어두는 이유: CSS :root 선택자와 함께 쓰기 좋아서
const html = document.documentElement;

// 테마를 적용하는 함수 — 화면, 버튼 텍스트, 저장소 모두 동기화
function applyTheme(theme) {
  // setAttribute: HTML 속성을 동적으로 설정 — CSS [data-theme="dark"] 선택자가 반응
  html.setAttribute('data-theme', theme);
  // 삼항 연산자로 다크 모드면 라이트 버튼, 라이트 모드면 다크 버튼 표시
  toggle.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
  // localStorage: 브라우저에 영구 저장 — 새로고침해도 남아있음 (문자열만 저장 가능)
  localStorage.setItem('theme', theme);
}

// 토글 버튼 클릭 → 현재 테마 읽고 반대로 전환
toggle.addEventListener('click', () => {
  // getAttribute: 현재 data-theme 값 읽기 ('light' 또는 'dark')
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// 페이지 로드 시 저장된 테마 복원
// || 연산자: 앞 값이 falsy(null, undefined, '')면 뒤 기본값 사용
// localStorage에 저장된 게 없으면 'light'로 시작
applyTheme(localStorage.getItem('theme') || 'light');
