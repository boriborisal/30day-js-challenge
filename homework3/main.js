function run() {
  const nums = [];   // 뽑은 숫자들
  let count = 0;     // 6의 배수 개수

  // 1~100 사이 숫자를 100번 무작위로 뽑기
  for (let i = 0; i < 100; i++) {//i를 0부터 시작함
    const n = Math.floor(Math.random() * 100) + 1; // 0~99 → +1 → 1~100
    nums.push(n);
    if (n % 6 === 0) count++;// 6으로 나눠떨어지면 카운트
  }

  const out = document.getElementById('out');
  out.textContent = '';

  // 뽑은 숫자 100개 출력 (10개마다 줄바꿈)
  // nums.length = nums 배열에 들어있는 숫자 개수 (지금은 100)
  // i = 0, 1, 2, ... 99 까지 1씩 증가하면서 100번 반복
  for (let i = 0; i < nums.length; i++) {
    // nums[i] = i번째 칸에 들어있는 숫자 (예: nums[0]은 첫 번째 뽑은 숫자)
    // 그 숫자 뒤에 공백(' ')을 붙여서 화면에 이어붙이기
    out.textContent += nums[i] + ' ';

    // % 는 "나머지" 연산자. 예) 10 % 3 = 1 (10을 3으로 나누면 나머지 1)
    // (i+1)을 10으로 나눈 나머지가 0이면 → i+1이 10의 배수 → 10번째, 20번째... 마다
    // i+1 인 이유: i는 0부터 시작하니까 "9번째"가 사실 10번째 숫자임. +1 해서 사람 기준으로 맞춤
    // 조건이 맞으면 줄바꿈('\n')을 넣어서 다음 줄로 내려감
    if ((i + 1) % 10 === 0) out.textContent += '\n';
  }

  // 6의 배수 개수 출력
  out.textContent += '\n6의 배수: ' + count + '개';
}

document.getElementById('runBtn').addEventListener('click', run);
