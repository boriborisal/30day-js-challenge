// 1. 임의의 문장을 입력받아서 그 문장에 시용된 단어의 수를 출력.
//    같은 단어가 사용된 경우 (중복)은 한번만 사용된 것으로 계산되어야 함
//    - String 관련 함수 사용 불가


function countWords() {
    const sentence = prompt('문장을 입력하세요.');
    const sameWords = new Set();//중복 제거용 Set
    let word = '';//지금까지 모은 글자들 (한 단어가 완성되면 Set에 넣음)

    for (let i = 0; i < sentence.length; i++) {//문장을 한 글자씩 끝까지 보기
        if (sentence[i] === ' ') {//공백이면 단어 하나 끝난 것
            if (word !== '') sameWords.add(word);//빈 단어(연속 공백) 방지
            word = '';//다음 단어를 위해 초기화
        } else {
            word += sentence[i];//공백 아니면 글자 계속 모으기
        }
    }
    if (word !== '') sameWords.add(word);//마지막 단어는 뒤에 공백이 없으니 따로 추가

    document.getElementById('result').textContent = '단어 수: ' + sameWords.size;
}


document.getElementById('countButton').addEventListener('click', countWords);
