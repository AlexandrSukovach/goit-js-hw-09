// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   startBtn: document.querySelector('button[data-start]'),
   inputBtn: document.querySelector('#datetime-picker'),
   clockfaceDay: document.querySelector('[data-days]'),
   clockfaceHours: document.querySelector('[data-hours]'),
   clockfaceMinutes: document.querySelector('[data-minutes]'),
   clockfaceSecond: document.querySelector('[data-seconds]'),
   bodyTimer: document.querySelector('body'),
   timer: document.querySelector('.timer'),
};
// ===style========
refs.startBtn.setAttribute("style", "font-size: 25px;");
refs.inputBtn.setAttribute("style", "font-size: 25px;");
refs.bodyTimer.setAttribute("style", "padding-left: 20px;padding-left: 20px;");
refs.inputBtn.setAttribute("style", "font-size: 25px;");
refs.timer.setAttribute("style", "display: flex;margin-top: 15px;");
const field = document.getElementsByClassName("field");
const value = document.getElementsByClassName("value");
const label = document.getElementsByClassName("label");
for (let i = 0; i < field.length; i++) {
   field[i].style.display = 'flex';
   field[i].style.flexDirection = ' column';
   field[i].style.alignItems = 'center';
   field[i].style.marginRight = '35px';
};
for (let i = 0; i < value.length; i++) {
   value[i].style.fontSize = '45px';
};
for (let i = 0; i < label.length; i++) {
   label[i].style.fontSize = '20px';
   label[i].style.textTransform = 'uppercase';
};

refs.startBtn.setAttribute('disabled', 'disabled');
let currentTime;
let startTime;
let deltaTime;

// иницифлизация календаря====
const flatpick = flatpickr("#datetime-picker", {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose: onclosselect
});
function onclosselect(selectedDates) {
   currentTime = new Date();
   startTime = selectedDates[0];
   deltaTime = startTime - currentTime;
   // console.log(selectedDates[0]);
   if (deltaTime >= 0) {
      refs.startBtn.removeAttribute('disabled');
      refs.startBtn.addEventListener('click', onStartClick);
   } else {
      // alert("Please choose a date in the future")
      Notify.failure("Please choose a date in the future");
   };
};
// ==================================================
refs.startBtn.addEventListener('click', onStartClick);

let idTimer = 0;
function onStartClick(e) {
   idTimer = setInterval(() => {
      let currentTimeNew = new Date();
      let startTimeNew = startTime - currentTimeNew;
      let minus = convertMs(startTimeNew)
      refs.clockfaceDay.textContent = addLeadingZero(minus.days);
      refs.clockfaceHours.textContent = addLeadingZero(minus.hours);
      refs.clockfaceMinutes.textContent = addLeadingZero(minus.minutes);
      refs.clockfaceSecond.textContent = addLeadingZero(minus.seconds);
      refs.startBtn.setAttribute('disabled', 'disabled');
      if (
         refs.clockfaceDay.textContent === '00' &&
         refs.clockfaceHours.textContent === '00' &&
         refs.clockfaceMinutes.textContent === '00' &&
         refs.clockfaceSecond.textContent === '00'
      ) {
         clearInterval(idTimer)
      };
      refs.inputBtn.setAttribute('disabled', 'disabled');
   }, 1000);
};
// ==========================================================
function convertMs(ms) {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
   const days = Math.floor(ms / day);
   const hours = Math.floor((ms % day) / hour);
   const minutes = Math.floor(((ms % day) % hour) / minute);
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
   return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
   return String(value).padStart(2, '0');
};

