
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyColor = document.querySelector("body");


startBtn.classList.add('btnStart');
stopBtn.classList.add('btnStop');
bodyColor.classList.add('styleBody');

let timerId = null;
let startStop = true;
// ==добавление стилей====
bodyColor.style.display = 'flex';
startBtn.setAttribute("style", "cursor: pointer;padding: 15px 30px;margin-left: auto;margin-top: 20em;");
stopBtn.setAttribute("style", "cursor: pointer;padding: 15px 30px;margin-left: 30px;margin-right: auto;margin-top: 20em;");

startBtn.addEventListener("click", () => {
   if (startStop === true) {
      timerId = setInterval(() => {
         var randomColor = Math.floor(Math.random() * 16777215).toString(16);
         document.body.style.backgroundColor = "#" + randomColor;
      }, 1000);
      startStop = false;
      // ===добавление ликвидация disabled====
      startBtn.setAttribute('disabled', 'disabled');
      stopBtn.removeAttribute("disabled");
   };

});

stopBtn.addEventListener("click", () => {
   clearInterval(timerId);
   startStop = true;
   // ===добавление ликвидация disabled====
   stopBtn.setAttribute('disabled', 'disabled');
   startBtn.removeAttribute("disabled");
   // console.log(`Interval with id ${timerId} has stopped!`);
});
