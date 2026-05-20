// 2. 층수를 입력하면 아래와 같이 마름모로 출력되는 프로그램
//  층수 : 3
//     *
//    ***
//   *****
//    ***  
//     *

//마름모꼴로 출력 하려면 층수의 절반보다 작은 층에서는 별이 2개씩 늘어나고, 절반보다 큰 층에서는 별이 2개씩 줄어드는 패턴을 이용하면 됩니다. 또한, 각 층마다 공백을 적절히 추가하여 마름모 모양을 만들어야 합니다.

function printDiamond(floors) {
  const out = document.getElementById('out');
  out.textContent = ''; // 이전 결과 지우기
    const mid = Math.ceil(floors / 2); // 중간 층 계산
    for (let i = 1; i <= floors; i++) {
        const spaces = Math.abs(mid - i); // 공백 수 계산
        const stars = floors - 2 * spaces; // 별 수 계산
        out.textContent += ' '.repeat(spaces) + '*'.repeat(stars) + '\n'; // 공백과 별 출력
    }   
}

function run() {
  const floors = parseInt(prompt('층수를 입력하세요:'));
  if (isNaN(floors) || floors <= 0) {
    alert('유효한 층수를 입력하세요.');
    return;
  }
  printDiamond(floors);
}

document.getElementById('runBtn').addEventListener('click', run);
