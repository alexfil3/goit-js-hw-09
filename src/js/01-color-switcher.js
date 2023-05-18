const body = document.querySelector('body')
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]')
let timerId = null;

startBtn.addEventListener("click", () => {
    timerId = 1
    if (timerId) {
        startBtn.disabled = true
    }
  timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
      console.log('start')
  }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false
    console.log('stop')
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
