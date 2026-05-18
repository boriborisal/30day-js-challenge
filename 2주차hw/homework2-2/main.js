// 영문자 텍스트를 입력했을 때 출력 버튼 누르면 사용된 모음의 개수를 출력
// ex. e: 1개 a: 2개
// 조건: 자바스크립트의 string과 관련된 함수 사용 X 무조건 배열만 사용
//아니어떻게배열만쓸수가있지?

function countAEIOU(text) {// ← 이름 + 매개변수(외부에서 뭘 받을지)
  const AEIOU = ['a', 'e', 'i', 'o', 'u'];
  const BigAEIOU = ['A', 'E', 'I', 'O', 'U'];
  const count = [0, 0, 0, 0, 0];//aeiou 개수 담아둘 배열

  for (let i = 0; i < text.length; i++) {//입력텍스트 훑기
    for (let j = 0; j < AEIOU.length; j++) {//모음과 비교하기
      if (text[i] === AEIOU[j] || text[i] === BigAEIOU[j]) {
        count[j]++;
      }
    }
  }

  //결과 출력
  const out = document.getElementById('out');
  out.textContent = ''//이전결과지우기
  for (let i = 0; i < AEIOU.length; i++) {//aeiou 개수만큼 출력
    out.textContent += AEIOU[i] + ': ' + count[i] + '개\n';//aeiou배열의 i번째 값 + : + count배열의 i번째 값 + 개 + 줄바꿈
  }
}

function run() {
  const text = prompt('영문 텍스트를 입력하세요:');
  countAEIOU(text); // 호출!!
}

document.getElementById('runBtn').addEventListener('click', run);
