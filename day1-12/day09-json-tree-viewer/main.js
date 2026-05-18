// 재귀(recursion) 함수: 함수가 자기 자신을 호출하면서 트리 구조를 탐색
// val(값), key(키 — 객체 안에서의 이름) 받아 DOM 요소를 만들어 반환
function renderNode(val, key) {
  const div = document.createElement('div');
  // key가 있으면 "key: " 부분을 만들어주고, 없으면 빈 문자열
  // !== null && !== undefined 두 가지 모두 체크
  const keyEl = key !== null && key !== undefined ? `<span class="key">"${key}": </span>` : '';

  // typeof: 값의 타입을 문자열로 반환 ('number','string','boolean','object' 등)
  // 단, null도 typeof 결과는 'object'라서 따로 먼저 체크해야 함
  if (val === null) { div.innerHTML = `${keyEl}<span class="null">null</span>`; }
  else if (typeof val === 'boolean') { div.innerHTML = `${keyEl}<span class="bool">${val}</span>`; }
  else if (typeof val === 'number') { div.innerHTML = `${keyEl}<span class="num">${val}</span>`; }
  else if (typeof val === 'string') { div.innerHTML = `${keyEl}<span class="str">"${val}"</span>`; }
  // Array.isArray: 배열인지 정확히 판별 (배열도 typeof는 'object'라서 따로 체크)
  else if (Array.isArray(val)) {
    // <details>/<summary>: HTML 기본 토글 요소 — 클릭하면 펼치고 접힘
    const d = document.createElement('details');
    d.open = true; // 처음엔 펼쳐진 상태
    d.innerHTML = `<summary>${keyEl}Array [${val.length}]</summary>`;
    // 배열 각 원소를 인덱스(i)와 함께 재귀 호출
    val.forEach((v, i) => d.appendChild(renderNode(v, i)));
    div.appendChild(d);
  } else {
    // 일반 객체 — 위의 어떤 케이스도 아니면 객체로 처리
    const d = document.createElement('details');
    d.open = true;
    d.innerHTML = `<summary>${keyEl}Object {${Object.keys(val).length}}</summary>`;
    // Object.entries(obj): {a:1, b:2} → [['a',1],['b',2]] 형태로 변환
    // 비구조화 할당([k, v])으로 키와 값을 한 번에 받음
    Object.entries(val).forEach(([k, v]) => d.appendChild(renderNode(v, k)));
    div.appendChild(d);
  }
  return div;
}

// 파싱 버튼 클릭
document.getElementById('parseBtn').addEventListener('click', () => {
  const out = document.getElementById('output');
  // try/catch: 에러가 발생할 수 있는 코드를 감싸기
  // JSON.parse: 문자열을 JS 객체로 변환 — 잘못된 JSON이면 에러 던짐
  try {
    const parsed = JSON.parse(document.getElementById('input').value);
    out.innerHTML = '';
    out.appendChild(renderNode(parsed, null));
  } catch(e) {
    // e는 에러 객체 — e.message로 사람이 읽을 수 있는 설명을 얻음
    out.innerHTML = `<span class="err">파싱 오류: ${e.message}</span>`;
  }
});

// 페이지 로드 시 자동으로 한 번 클릭 — 기본 예시 JSON을 바로 보여주기
document.getElementById('parseBtn').click();
