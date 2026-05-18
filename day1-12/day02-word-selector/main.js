// querySelector: CSS 선택자로 요소 찾기 (#editor = id가 editor인 요소)
// getElementById보다 유연 — 클래스, 태그, 복합 선택자 모두 가능
const editor = document.querySelector('#editor');
const chars = document.querySelector('#chars');
const words = document.querySelector('#words');
const lines = document.querySelector('#lines');

// input 이벤트: 사용자가 textarea에 글자를 입력할 때마다 발생 (실시간)
// change 이벤트와 다름 — change는 포커스가 빠질 때 한 번만
editor.addEventListener('input', () => {
  // textarea의 입력값 가져오기 — input/textarea는 .value 사용 (textContent 아님)
  const text = editor.value;

  // 템플릿 리터럴: 백틱(`)으로 감싸고 ${변수} 형태로 값 삽입
  // text.length: 문자열 길이(글자 수)
  chars.textContent = `${text.length}자`;

  // 단어 수 계산
  // trim(): 앞뒤 공백 제거
  // 삼항 연산자(? :): 빈 문자열이면 0, 아니면 공백으로 split해서 길이
  // /\s+/: 정규표현식 — 공백(스페이스/탭/줄바꿈) 1개 이상에 매칭
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  words.textContent = `${wordCount}단어`;

  // 줄 수: 줄바꿈 문자('\n')로 split — 빈 문자열이면 1줄로 취급
  const lineCount = text === '' ? 1 : text.split('\n').length;
  lines.textContent = `${lineCount}줄`;
});
