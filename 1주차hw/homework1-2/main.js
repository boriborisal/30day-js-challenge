// const rows = 5;
// const cols = 5;
// const arr = [];

// for (let i = 0; i < rows; i++) {
//   arr.push([]);
//   for (let j = 0; j < cols; j++) {
//     if (i % 2 === 0) {
//       arr[i].push(i * cols + j + 1);
//     } else {
//       arr[i].push(i * cols + (cols - j));
//     }
//   }
// }

// const out = document.getElementById('out');
// for (let i = 0; i < rows; i++) {
//   const line = arr[i].join(' ');
//   console.log(line);
//   out.textContent += line + '\n';
// }
// 12345
// 161718196
// 152425207


// 일단 내가 생각한거는 5X5 배열 만들어놓고 끝들에 트리거 넣어서 
// 오른쪽으로 5가고 아래로 4가고 또 왼쪽으로 4가고 그다음에위로 3가고 
// 오른쪽으로 3가고 아래로 2가고 왼쪽으로 2가고 위로 1가고 오른쪽으로 1 가게 
// 배열에서도 위아래개념이있나? 있다네요.
// 

const rows = 5;     //행             
const cols = 5;         //열        
const arr = Array.from({length: rows}, () => new Array(cols).fill(0));//5X5 25만들기

let nowr = 0;                       //현재 행 위치 (i, 위에서 몇 번째 줄)
let nowc = -1;                      //현재 열 위치 (j, 왼쪽에서 몇 번째 칸)-1로 시작하는 이유: 곧 nowc++ 해서 (0,0)부터 채우게
let num = 1;                       //칸에 넣을 숫자, 1부터 시작
let yetr = rows;                    //아직 안 채운 행이 몇 줄 남았나 (처음엔 5)
let yetc = cols;                    //아직 안 채운 열이 몇 칸 남았나 (처음엔 5)

while (num <= rows * cols) {

  for (let i = 0; i < yetc; i++) { //i < yetc = i가 yetc보다 작은 동안만 계속 돌아라...자바스크립트에서 배열의 첫 번째 칸은 arr[0]
    nowc++;                         //열 번호 +1 (오른쪽으로 한 칸 이동)
    arr[nowr][nowc] = num;               //지금 칸에 n 넣기
    num++;                         //다음에 넣을 숫자 준비 (n을 1 늘림)
  }
  yetr--;                        //맨 윗줄 다 채웠으니 남은 행 -1
  // if (num >= rows * cols) break;    //ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ없어도돌아가는이유...........알아오기
  //이유: yetc가 0이 되면? ->조건이 i < 0  처음부터 거짓이라 안에 코드 한 번도 실행 안 됨.

  for (let i = 0; i < yetr; i++) {
    nowr++;                         //행 번호 +1 (아래로 한 칸)
    arr[nowr][nowc] = num;
    num++;
  }
  yetc--;                           //오른쪽 끝 열 다 채웠으니 남은 열 -1
  // if (num >= rows * cols) break;//

  for (let i = 0; i < yetc; i++) {
    nowc--;                         //열 번호 -1 (왼쪽으로 한 칸)
    arr[nowr][nowc] = num;
    num++;
  }
  yetr--;                           //맨 아랫줄 다 채웠으니 남은 행 -1
  // if (num >= rows * cols) break;

  for (let i = 0; i < yetr; i++) {
    nowr--;                         //행 번호 -1 (위로 한 칸)
    arr[nowr][nowc] = num;
    num++;
  }
 yetc--;                           //왼쪽 끝 열 다 채웠으니 남은 열 -1
}

// 다 채웠으니 화면에 출력
const out = document.getElementById('out');
for (let i = 0; i < rows; i++) {
  out.textContent += arr[i].join(' ') + '\n';   //한 줄씩 띄어쓰기로 합쳐서 출력
}