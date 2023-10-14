const colorStart = document.querySelector('button[data-start]');
const colorStop = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');
let intervalId = null;

colorStart.addEventListener('click', () => {
  intervalId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  colorStart.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
colorStop.addEventListener('click', () => {
  clearInterval(intervalId);
  colorStart.disabled = false;
});
