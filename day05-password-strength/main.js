const pw = document.getElementById('pw');
const bar = document.getElementById('bar');
const label = document.getElementById('label');
const hints = document.getElementById('hints');
const eye = document.getElementById('eye');

// 비밀번호 검증 규칙들을 객체 배열로 정의 — 데이터로 만들어두면 추가/제거가 쉬움
// 각 객체는 key(식별자), label(표시 텍스트), test(검증 함수)
// test는 화살표 함수 — v는 입력값, 정규표현식.test(v)는 매칭 시 true
// 정규식 의미:
//   /[a-z]/         : 소문자 알파벳 1개라도 포함되어 있는지
//   /[A-Z]/         : 대문자
//   /[0-9]/         : 숫자
//   /[^a-zA-Z0-9]/  : 영문/숫자가 아닌 글자 = 특수문자 (^는 부정)
const checks = [
  { key: 'len', label: '8자 이상', test: v => v.length >= 8 },
  { key: 'long', label: '12자 이상', test: v => v.length >= 12 },
  { key: 'lower', label: '소문자', test: v => /[a-z]/.test(v) },
  { key: 'upper', label: '대문자', test: v => /[A-Z]/.test(v) },
  { key: 'num', label: '숫자', test: v => /[0-9]/.test(v) },
  { key: 'special', label: '특수문자', test: v => /[^a-zA-Z0-9]/.test(v) },
];

// 강도 단계별 텍스트와 색상 — 인덱스(0~5)로 매핑
const levels = ['', '매우 약함', '약함', '보통', '강함', '매우 강함'];
const colors = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

// input 이벤트: 비밀번호가 한 글자라도 바뀌면 즉시 발생
pw.addEventListener('input', () => {
  const val = pw.value;
  // filter: 조건에 맞는 항목만 모은 새 배열 → 통과한 검증 개수가 score
  const score = checks.filter(c => c.test(val)).length;
  // Math.max/min/ceil로 score를 1~5 범위로 보정
  // val이 빈 문자열이면 0, 아니면 최소 1
  const level = val === '' ? 0 : Math.max(1, Math.min(5, Math.ceil(score / 1.2)));

  // 진행바 width를 % 단위로 — 템플릿 리터럴 안에 계산식 삽입
  bar.style.width = `${level * 20}%`;
  bar.style.background = colors[level];
  // val이 truthy(빈 문자열 아님)면 라벨 표시
  label.textContent = val ? levels[level] : '';
  label.style.color = colors[level];

  // map: 각 항목을 새 형태로 변환 → join으로 하나의 문자열로 합침
  // 백틱 안에서 ${조건 ? a : b}로 클래스명/아이콘 동적 분기
  hints.innerHTML = checks.map(c => `
    <span class="hint ${c.test(val) ? 'ok' : ''}">${c.test(val) ? '✓' : '·'} ${c.label}</span>
  `).join('');
});

// 눈 아이콘 클릭 시 password ↔ text 타입 전환 (보이기/숨기기)
eye.addEventListener('click', () => {
  pw.type = pw.type === 'password' ? 'text' : 'password';
  eye.textContent = pw.type === 'password' ? '👁' : '🙈';
});
