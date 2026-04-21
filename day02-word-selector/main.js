const editor = document.querySelector('#editor');
const chars = document.querySelector('#chars');
const words = document.querySelector('#words');
const lines = document.querySelector('#lines');

editor.addEventListener('input', () => {
  const text = editor.value;

  chars.textContent = `${text.length}자`;

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  words.textContent = `${wordCount}단어`;

  const lineCount = text === '' ? 1 : text.split('\n').length;
  lines.textContent = `${lineCount}줄`;
});