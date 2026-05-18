// 링크드리스트 구현 전제 하에 입력을 하면 리스트로 나타남
// 이후 검색 누르면 오른쪽에 뜨게/ 없다면 없다고 뜨게 만들기

const nodes = [];
let head = null;
let tail = null;

function addBack(a) {
  const newIdx = nodes.length;
  nodes.push([a, tail, null]);

  if (head === null) {
    head = newIdx;
  } else {
    nodes[tail][2] = newIdx;
  }
  tail = newIdx;
}

function printList() {
  let text = '';
  let i = head;
  while (i !== null) {
    text += nodes[i][0] + '\n';//지금 노드의 0번 칸 값을 text에 추가 + 줄바꿈
    i = nodes[i][2];//i를 지금 노드의 2번 칸 값으로 바꾸기 (다음 노드로 이동!!)
  }
  document.getElementById('listOut').textContent = text;//listOut에 출력, getElementById는 html에서 id가 listOut인 요소 가져오기, textContent는 그 요소 안에 글자 넣기
}

function search(target) {//target은 검색할 값
  let i = head;//탐색 시작점 = 맨 앞 노드의 주소
  while (i !== null) {//i가 null이 될 때까지 반복
    if (nodes[i][0] === target) {
      return i;
    }
    i = nodes[i][2];
  }
  return null;
}


function Add() {
  const value = document.getElementById('inp').value;//html에서 입력칸의 값 가져오기
  addBack(value);//value를 리스트 맨 뒤에 추가
  //value란 입력칸에 있는 텍스트
  printList();
  document.getElementById('inp').value = '';//inp 입력칸 비우기
}

function Search() {
  const value = document.getElementById('inp').value;
  const result = search(value);
  const out = document.getElementById('searchOut');

  if (result !== null) {//result가 null이 아니면
    out.textContent = '"' + value + '" 있음 (' + result + '번 노드)';//
  } else {
    out.textContent = '"' + value + '" 없음';
  }
}

document.getElementById('addBtn').addEventListener('click', Add);
document.getElementById('searchBtn').addEventListener('click', Search);
