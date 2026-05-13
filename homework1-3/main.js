function run() {
  const nums = [];   // 뽑은 숫자들
  let count = 0;     // 6의 배수 모으기

  // 1~100 사이 숫자를 100번 무작위로 뽑기
  for (let i = 0; i < 100; i++) {//i를 0부터 시작함
    const n = Math.floor(Math.random() * 100) + 1;
    nums.push(n);
    if (n % 6 === 0) count++;// 6으로 나눠떨어지면 +1
  }

  const out = document.getElementById('out');
  out.textContent = '';

  // 뽑은 숫자 100개 출력 (10개마다 줄바꿈)
  for (let i = 0; i < nums.length; i++) {
    // nums[i] = i번째 칸에 들어있는 숫자 (예: nums[0]은 첫 번째 뽑은 숫자)
    out.textContent += nums[i] + ' ';//i번째 숫자 +공백
    if ((i + 1) % 10 === 0) out.textContent += '\n';
  }

  // 6의 배수 개수 출력
  out.textContent += '\n6의 배수: ' + count + '개';
}

document.getElementById('runBtn').addEventListener('click', run);
