const nodes = [];//노드들을 담을 배열//이거아님리스트로다시만들기//또다시해오기
let head = null;
let tail = null;// 처음엔 노드가 하나도 없으니까 둘 다 null (= 가리킬 곳 없음)

function addBack(a) {//리스트 맨 뒤에 a 노드를 붙임
  const newIdx = nodes.length;//newIdx= 새노드가 들어갈 칸 번호
  nodes.push([a, tail, null]);  //[값, 앞 주소, 뒤 주소] 순서

  if (head === null) {//리스트가 비어있으면
    head = newIdx;//새 노드가 head이자 tail이 됨
  } else {
    nodes[tail][2] = newIdx;//아니면? tail의 2번 칸에 newIdx 넣기   
  }
  tail = newIdx;
}

function print() {
  let text = '';//출력할 텍스트 담을 변수
  let i = head;//출력은 head부터 시작

  while (i !== null) {//i가 null이 아니면 계속 반복(i가 null이면 마지막 노드까지 다 출력한 것)
    text += nodes[i][0] + '\n';//지금 노드의 0번 칸 값을 text에 추가 + 줄바꿈
    i = nodes[i][2];//i를 지금 노드의 2번 칸 값으로 바꾸기 (다음 노드로 이동!!)
  }
  document.getElementById('out').textContent = text;
}

function ask() {//ask는 계속 입력받는 함수
  while (true) {
    const a = prompt('값 입력:');
    if (a === null) return;//취소 누르면 함수 종료
    addBack(a);//입력받은 값 a를 리스트 맨 뒤에 추가
    print();
  }
}
print();
document.getElementById('runBtn').addEventListener('click', ask);
