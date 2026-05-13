// nodes = 모든 노드를 담아두는배열
// 각 노드 한 칸은 길이 3짜리 배열로 만들 거임 → [값, 앞 주소, 뒤 주소]
//   - [0] 값 자체 (예: 100)
//   - [1] 내 "앞" 친구가 nodes의 몇 번 칸에 있는지 (인덱스). 맨 앞이면 null
//   - [2] 내 "뒤" 친구가 nodes의 몇 번 칸에 있는지 (인덱스). 맨 뒤면 null
const nodes = [];
let head = null;
let tail = null;// 처음엔 노드가 하나도 없으니까 둘 다 null (= 가리킬 곳 없음)

function addBack(a) {//리스트 맨 뒤에 a 노드를 붙임
  const newIdx = nodes.length;//newIdx= 새노드가 들어갈 칸 번호
  nodes.push([a, tail, null]);  //[값, 앞 주소, 뒤 주소] 순서

  if (head === null) {
    //리스트가 비어있었다면 > 이 새 노드가 첫 번째 노드
    //그래서 head도 이걸 가리키게 함
    head = newIdx;
  } else {
    //이미 노드가 있었다면 → 직전 마지막 노드(tail)에게 알려줘야 함
    //nodes[tail]은 [값, 앞, 뒤] 배열이고, [2]가 "뒤 주소" 칸
    //거기에 새 노드의 인덱스를 넣어서 연결 완성
    nodes[tail][2] = newIdx;
  }
  // 어느 경우던간에 이제 맨 뒤 노드는 방금 만든 새 노드> tail 갱신
  tail = newIdx;
}

// head부터 시작해서 뒤로 따라가면서 화면에 보여줌
// → 입력 순서대로 출력됨
function print() {
  let text = '';     // 모아서 한 번에 화면에 넣을 글자
  let i = head;      // 탐색 시작점 = 맨 앞 노드의 주소

  // i가 null이 될 때까지 = 끝(다음이 없는 노드)에 도착할 때까지 반복
  while (i !== null) {
    // nodes[i] = i번 칸의 노드 = [값, 앞, 뒤]
    // [0]은 "값"이니까 그걸 글자에 이어붙이고 줄바꿈
    text += nodes[i][0] + '\n';

    // 다음 노드로 이동: 지금 노드의 "뒤 주소"([2])를 i에 넣음
    // 마지막 노드라면 [2]가 null이므로 다음 반복에서 while이 종료됨
    i = nodes[i][2];
  }

  document.getElementById('out').textContent = text;
}


// ========== 사용자에게 3번 입력받기 ==========
function ask() {
  // k = 0, 1, 2 → 총 3번 반복
  for (let k = 0; k < 3; k++) {
    // prompt = 입력창 띄우기. 사용자가 친 글자를 문자열로 받음
    const val = prompt('숫자 입력:');

    // 사용자가 "취소"를 누르면 prompt는 null을 줌 → 중단
    if (val === null) return;

    // Number(val): 문자열 "100"을 숫자 100으로 변환
    // addBack으로 리스트 뒤에 추가
    addBack(Number(val));

    // 화면 갱신 (매번 새로 그려줌)
    print();
  }
}


// 페이지 처음 열릴 때 한 번 출력 (이때는 리스트가 비어있으니 화면도 빈 상태)
print();

// HTML의 "실행" 버튼이 클릭될 때마다 ask 함수를 실행
document.getElementById('runBtn').addEventListener('click', ask);
