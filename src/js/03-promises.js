
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// ===========поиск элементов=======
const inputDelay = document.querySelector("form.form input[name=delay]");
const inputStep = document.querySelector("form.form input[name=step]");
const inputAmount = document.querySelector("form.form input[name=amount]");
const inputButton = document.querySelector("form.form button");

inputDelay.addEventListener('change', changeInpetDelay);
inputStep.addEventListener('change', changeinputStep);
inputAmount.addEventListener('change', changeinputAmount);
inputButton.addEventListener('click', onStart);
// ==========значения инпутов==========
let changeDelay = 0;
let changeStep = 0;
let changeAmount = 0;
let delay = changeDelay;

function changeInpetDelay(event) {
  event.preventDefault();
  inputDelay.textContent = event.currentTarget.value;
  changeDelay = event.currentTarget.value;
};
function changeinputStep(event) {
  event.preventDefault();
  inputDelay.textContent = event.currentTarget.value;
  changeStep = event.currentTarget.value;
};
function changeinputAmount(event) {
  event.preventDefault();
  inputDelay.textContent = event.currentTarget.value;
  changeAmount = event.currentTarget.value;
};

// // =======запуск=========
function onStart(evt) {
  evt.preventDefault();
  let i = 0;
  // ==========запуск промиса===========
  let timer1 = Number(changeDelay) - Number(changeStep);
  for (let i = 1; i <= changeAmount; i++) {

    let position = 0;
    timer1 += Number(changeStep)

    function createPromise(position, delay) {
      position = i
      delay = timer1;
      let timer = timer1;
      return new Promise((resolte, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldResolve) {
            resolte(`✅ Fulfilled promise выполнен ${position} in ${delay}ms`);
          }
          reject(`❌ Rejected promise отклонен ${position} in ${delay}ms`);
        }, timer)
      });
    };
    createPromise().then(onFulfilled, onRejected);
    function onFulfilled(resolte) {
      console.log(resolte);
    };
    function onRejected(reject) {
      console.log(reject);
    };
  };
};

