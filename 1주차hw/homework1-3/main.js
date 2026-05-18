function run() {
  const nums = [];   // 뽑은 숫자들
  let count = 0;     // 6의 배수 모으기

  // 1~100 사이 숫자를 100번 무작위로 뽑기
  for (let i = 0; i < 100; i++) {
    const n = Math.floor(Math.random() * 100) + 1;//floor말고또뭐잇는지알아오기
    nums.push(n);
    if (n % 6 === 0) count++;// 6으로 나눠떨어지면 +1//등호알아오기
  }

  const out = document.getElementById('out');//html에서 id가 out인 요소 가져오기
  out.textContent = '';//이전 결과 지우기 왜하냐면 버튼 여러 번 누르면 결과가 계속 이어서 나오니까

  //뽑은 숫자 100개 출력 (10개마다 줄바꿈)
  for (let i = 0; i < nums.length; i++) {
    out.textContent += nums[i] + ' ';//i번째 nums +공백
    if ((i + 1) % 10 === 0) out.textContent += '\n'; //가 나누어떨어지면 뒤에 \n 붙이기//textcontent알아오기
  }

  // 6의 배수 개수 출력
  out.textContent += '\n6의 배수: ' + count + '개';
}

document.getElementById('runBtn').addEventListener('click', run);
