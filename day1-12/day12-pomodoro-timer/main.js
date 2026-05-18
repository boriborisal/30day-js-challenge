// SVG 원의 둘레 = 2 × π × r (r=90) ≈ 565.49
// stroke-dasharray와 stroke-dashoffset으로 진행률을 시각화하기 위해 미리 계산
const CIRC = 565.49;

// 상태 변수들
// mode: 'work'(집중) 또는 'break'(휴식)
// running: 타이머 동작 여부
// timerId: setInterval이 반환하는 ID (clearInterval로 멈추기 위해 보관)
// total: 현재 모드의 전체 시간(초)
// remaining: 남은 시간(초)
// cycles: 완료한 집중 사이클 수 (0~4 반복)
let mode = 'work', running = false, timerId = null;
let total, remaining, cycles = 0;

// 입력값을 초 단위로 변환해서 가져오는 헬퍼들
// parseInt(문자열, 진법): 문자열을 정수로 파싱 (10진법은 보통 생략 가능)
// || 25 : NaN이거나 0이면 기본값 사용 (이전 || 패턴 참고)
function getWork() { return (parseInt(document.getElementById('workMin').value) || 25) * 60; }
function getBreak() { return (parseInt(document.getElementById('breakMin').value) || 5) * 60; }

// 새 모드 시작 시 호출 — 시간 다시 세팅
function init() {
  total = mode === 'work' ? getWork() : getBreak();
  remaining = total;
  updateUI();
}

// 화면 갱신
function updateUI() {
  // padStart(2,'0'): 길이 2가 되도록 앞에 '0' 채움 (5 → '05')
  // String(...)으로 문자열로 변환해야 padStart 사용 가능
  const m = String(Math.floor(remaining / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0'); // %는 나머지 연산자
  document.getElementById('timeText').textContent = `${m}:${s}`;
  document.getElementById('modeText').textContent = mode === 'work' ? '집중 시간' : '휴식 시간';
  // 남은 비율에 따라 dashoffset 조정 — 0이면 원이 다 그려진 상태, CIRC면 안 그려진 상태
  document.getElementById('progress').style.strokeDashoffset = CIRC * (1 - remaining / total);
  document.getElementById('progress').style.stroke = mode === 'work' ? '#e74c3c' : '#2e7d32';

  // Array.from({length:4}, (_, i) => ...) : 길이 4의 배열을 만들고 각 항목을 매핑
  // _ 는 안 쓰는 인자 관례 (첫 번째 인자가 undefined라 신경 X)
  const dots = Array.from({ length: 4 }, (_, i) => `<span class="cycle-dot ${i < cycles ? 'done' : ''}"></span>`).join('');
  document.getElementById('cycles').innerHTML = `사이클 ${dots}`;
}

// 1초마다 호출되는 함수
function tick() {
  remaining--;
  // 시간이 다 됐을 때
  if (remaining < 0) {
    // 집중에서 끝났을 때만 사이클 카운트 증가, % 5로 0~4 순환
    if (mode === 'work') cycles = (cycles + 1) % 5;
    // 모드 전환: 집중 ↔ 휴식
    mode = mode === 'work' ? 'break' : 'work';
    // 타이머 정리 — clearInterval로 setInterval 중단
    clearInterval(timerId); timerId = null; running = false;
    document.getElementById('startBtn').textContent = '▶ 시작';
    init();
    // alert: 브라우저 기본 알림창 (블로킹)
    alert(mode === 'work' ? '🍅 집중 시작!' : '☕ 휴식 시간!');
    return;
  }
  updateUI();
}

// 시작/일시정지 토글
document.getElementById('startBtn').addEventListener('click', () => {
  running = !running;
  if (running) {
    // setInterval(tick, 1000): 1초(1000ms)마다 tick 실행 — ID 저장해두기
    timerId = setInterval(tick, 1000);
    document.getElementById('startBtn').textContent = '⏸ 일시정지';
  }
  else {
    clearInterval(timerId);
    document.getElementById('startBtn').textContent = '▶ 시작';
  }
});

// 초기화: 처음 상태로 돌리기
document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerId); timerId = null; running = false;
  document.getElementById('startBtn').textContent = '▶ 시작';
  mode = 'work'; init();
});

// 건너뛰기: 현재 모드 중단하고 다음 모드로 이동
document.getElementById('skipBtn').addEventListener('click', () => {
  clearInterval(timerId); timerId = null; running = false;
  document.getElementById('startBtn').textContent = '▶ 시작';
  mode = mode === 'work' ? 'break' : 'work'; init();
});

// 페이지 로드 시 초기화 — 25:00 표시 상태로 시작
init();
