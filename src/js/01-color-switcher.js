

// =функция смены цветов раз в 1сек==

const buttonColorStart = document.querySelector('[data-start]');
const buttonColorStop = document.querySelector('[data-stop]');
// const refs = {
//    startBtn: document.querySelector('button[data-start]'),
//    stopBtn: document.querySelector('button[data-stop]'),
// };

buttonColorStart.addEventListener('click', startColorClick)
// buttonColorStop.addEventListener('click', stopColorClick)

function startColorClick() {
   setInterval(
      function () {
         var randomColor = Math.floor(Math.random() * 16777215).toString(16);
         document.body.style.backgroundColor = "#" + randomColor;
      }, 1000);
}


