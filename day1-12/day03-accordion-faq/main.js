// querySelectorAll: CSS 선택자에 매칭되는 모든 요소를 NodeList로 반환
// NodeList는 배열 비슷하지만 배열은 아님 — forEach는 사용 가능
const items = document.querySelectorAll('.item');

// 각 .item 요소마다 클릭 핸들러 등록
items.forEach(item => {
  // item.querySelector: item 내부에서 .question을 찾음 (지역 검색)
  item.querySelector('.question').addEventListener('click', () => {
    // classList.contains('open'): 'open' 클래스가 있으면 true
    const isOpen = item.classList.contains('open');

    // 모든 항목에서 'open' 클래스 제거 — 한 번에 하나만 열리도록
    items.forEach(i => i.classList.remove('open'));

    // 원래 닫혀있었다면 새로 열기, 원래 열려있었다면 그대로 닫힌 상태 유지(토글)
    if (!isOpen) item.classList.add('open');
  });
});
