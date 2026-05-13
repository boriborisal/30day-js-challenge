function run() {
  const a = Number(prompt('층 수를 입력하세요:'));

  const out = document.getElementById('out'); 
  out.textContent = '';//이전 출력 지우기

  for (let i = 0; i < a; i++) {
    for (let j = 0; j < a - 1 - i; j++) {
      out.textContent += ' ';
    }
    for (let j = 0; j < 2 * i + 1; j++) {
      out.textContent += '*';
    }
    out.textContent += '\n';
  }
}

document.getElementById('runBtn').addEventListener('click', run);
