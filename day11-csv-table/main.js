// rows: CSV를 파싱한 2차원 배열 [['이름','나이'], ['클로이','24'], ...]
// sortCol: 정렬 기준 컬럼 인덱스 (-1이면 정렬 없음)
// sortAsc: 오름차순 여부
let rows = [], sortCol = -1, sortAsc = true;

// CSV 문자열을 2차원 배열로 변환 — 따옴표("...,...") 안의 쉼표는 구분자가 아님
function parseCSV(text) {
  // trim()으로 앞뒤 공백 제거 → split('\n')으로 줄 단위 분리 → 각 줄을 map으로 변환
  return text.trim().split('\n').map(line => {
    const cols = []; let cur = '', inQ = false;
    // for...of: 문자열을 한 글자씩 순회
    for (const ch of line) {
      // 따옴표를 만나면 inQ를 토글 — 따옴표 안에서는 쉼표를 구분자로 보지 않음
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    cols.push(cur.trim()); // 마지막 컬럼 추가 잊지 말기
    return cols;
  });
}

// 테이블을 다시 그리는 함수
function renderTable() {
  if (!rows.length) return;
  // 비구조화: 첫 행을 headers로, 나머지를 data로
  const [headers, ...data] = rows;
  // [...data]: 원본을 보존하고 정렬용 사본 만들기 (sort는 원본을 변경하기 때문)
  const sorted = [...data].sort((a, b) => {
    if (sortCol < 0) return 0;
    // || ''로 undefined 방어
    const av = a[sortCol] || '', bv = b[sortCol] || '';
    // 숫자로 변환 시도 — 두 값을 빼면 숫자면 차이값, 아니면 NaN
    const n = Number(av) - Number(bv);
    // isNaN이면 문자열 비교, 아니면 숫자 차이 그대로
    // localeCompare: 사전식 비교 ('가나다' 같은 한글도 처리)
    const cmp = isNaN(n) ? av.localeCompare(bv) : n;
    // 내림차순이면 부호 뒤집기
    return sortAsc ? cmp : -cmp;
  });
  // 행 수 × 열 수 표시
  document.getElementById('info').textContent = `${data.length}행 × ${headers.length}열`;
  // <thead><tr><th>...</th></tr></thead> + <tbody>...</tbody>를 한 번에 innerHTML
  // 헤더 클릭 시 sort(i) 호출하도록 인라인 onclick 연결
  document.getElementById('table').innerHTML = `
    <thead><tr>${headers.map((h, i) => `<th class="${sortCol===i?(sortAsc?'asc':'desc'):''}" onclick="sort(${i})">${h}</th>`).join('')}</tr></thead>
    <tbody>${sorted.map(r => `<tr>${headers.map((_, i) => `<td>${r[i]||''}</td>`).join('')}</tr>`).join('')}</tbody>`;
}

// 인라인 onclick에서 호출하기 위해 전역 노출
// 같은 컬럼 다시 클릭하면 정렬 방향 토글, 다른 컬럼이면 오름차순부터 시작
window.sort = i => { sortAsc = sortCol === i ? !sortAsc : true; sortCol = i; renderTable(); };

// 파싱 버튼 — 텍스트영역의 CSV를 파싱해서 표로 그림
document.getElementById('parseBtn').addEventListener('click', () => {
  const val = document.getElementById('paste').value;
  if (!val.trim()) return;
  rows = parseCSV(val);
  sortCol = -1; renderTable();
});

// 드래그 앤 드롭 영역 (CSV 파일 받기)
const drop = document.getElementById('drop');
// 영역 클릭 시 숨겨놓은 file input의 클릭을 대신 트리거 — UX 트릭
drop.addEventListener('click', () => document.getElementById('fileInput').click());
// dragover에서 preventDefault 안 하면 브라우저가 파일을 그냥 열어버림
drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
drop.addEventListener('dragleave', () => drop.classList.remove('over'));
drop.addEventListener('drop', e => {
  e.preventDefault(); drop.classList.remove('over');
  // dataTransfer.files: 드롭된 파일 목록 (FileList)
  const file = e.dataTransfer.files[0];
  if (!file) return;
  // FileReader: 파일 내용을 읽는 비동기 API
  const reader = new FileReader();
  // onload: 파일을 다 읽었을 때 실행됨 — ev.target.result에 텍스트가 들어있음
  reader.onload = ev => { rows = parseCSV(ev.target.result); sortCol = -1; renderTable(); };
  // readAsText(파일, 인코딩): 파일을 텍스트로 읽기 시작 (한글 깨짐 방지로 utf-8 명시)
  reader.readAsText(file, 'utf-8');
});
// 파일 선택창에서 파일 골랐을 때도 동일하게 처리
document.getElementById('fileInput').addEventListener('change', e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = ev => { rows = parseCSV(ev.target.result); sortCol = -1; renderTable(); };
  reader.readAsText(file, 'utf-8');
});

// 첫 화면에 미리 보여줄 기본 데이터 — \n은 줄바꿈 문자 (이스케이프 시퀀스)
document.getElementById('paste').value = `이름,나이,도시,직업\n클로이,24,서울,개발자\n철수,30,부산,디자이너\n영희,27,대전,기획자\n민준,32,인천,개발자\n수아,25,서울,마케터`;
document.getElementById('parseBtn').click();
