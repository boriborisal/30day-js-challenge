// 영문자 텍스트를 입력했을 때 출력 버튼 누르면 사용된 모음의 개수를 출력
// ex. e: 1개 a: 2개
// 조건: 자바스크립트의 string과 관련된 함수 사용 X 무조건 배열만 사용
//아니어떻게배열만쓸수가있지?

function countAEIOU(text) {
  const AEIOU = ['a', 'e', 'i', 'o', 'u'];
  const BigAEIOU = ['A', 'E', 'I', 'O', 'U'];
  const count = [0, 0, 0, 0, 0];

  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < AEIOU.length; j++) {
      if (text[i] === AEIOU[j] || text[i] === BigAEIOU[j]) {
        count[j]++;
        break;
      }
    }
  }

  // 결과 출력
  const out = document.getElementById('out');
  out.textContent = '';
  for (let j = 0; j < AEIOU.length; j++) {
    out.textContent += AEIOU[j] + ': ' + count[j] + '개\n';
  }
}

function run() {
  const text = prompt('영문 텍스트를 입력하세요:');
  if (text === null) return;   // 취소 누르면 중단
  countAEIOU(text);
}

document.getElementById('runBtn').addEventListener('click', run);
