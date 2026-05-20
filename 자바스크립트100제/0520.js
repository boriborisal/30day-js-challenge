// 새 학기를 맞아 호준이네 반은 반장 선거를 하기로 했습니다.  그런데 표를 하나씩 개표하는 과정이 너무 번거롭게 느껴진 당신은 **학생들이 뽑은 후보들을 입력받으면 뽑힌 학생의 이름과 받은 표 수를 출력하는 프로그램**을 작성하기로 하였습니다.

// ```jsx
// **입력**
// 원범 원범 혜원 혜원 혜원 혜원 유진 유진

// **출력**
// 혜원(이)가 총 4표로 반장이 되었습니다.
// ```

function election(votes) {
    const voteCount = {};   
    for (const vote of votes) {
        if (voteCount[vote]) {
            voteCount[vote]++;
        }
        else {
            voteCount[vote] = 1;
        }
    }
    let winner = '';
    let maxVotes = 0;
    for (const candidate in voteCount) {    
        if (voteCount[candidate] > maxVotes) {
            maxVotes = voteCount[candidate];
            winner = candidate;
        }
    }
    return `${winner}(이)가 총 ${maxVotes}표로 반장이 되었습니다.`;
}   