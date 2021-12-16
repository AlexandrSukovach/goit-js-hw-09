


const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
let timerId = null;

startBtn.addEventListener("click", () => {
   timerId = setInterval(() => {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      document.body.style.backgroundColor = "#" + randomColor;
   }, 1000);
});


stopBtn.addEventListener("click", () => {
   clearInterval(timerId);
   console.log(`Interval with id ${timerId} has stopped!`);
});
