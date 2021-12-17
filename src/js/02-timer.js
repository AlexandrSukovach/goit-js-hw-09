// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const refs = {
   startBtn: document.querySelector('button[data-start]'),
   inputBtn: document.querySelector('#datetime-picker'),
   clockfaceDay: document.querySelector('[data-days]'),
   clockfaceHours: document.querySelector('[data-hours]'),
   clockfaceMinutes: document.querySelector('[data-minutes]'),
   clockfaceSecond: document.querySelector('[data-seconds]'),
};
let isActive = true;
// иницифлизация календаря====
const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      console.log(selectedDates[0]);
   },
};

let flatp = flatpickr("#datetime-picker", { options });
console.log('flatp-', flatp)

// ==================================================

const timer = {
   start() {
      const startTime = Date.now();

      setInterval(() => {
         const currentTime = Date.now();
         const deltaTime = currentTime - startTime;
         const { days, hours, minutes, seconds } = getTimeComponents(deltaTime);
         const time = getTimeComponents(deltaTime);

         updateClockFace(time)
         console.log(`${days}:${hours}:${minutes}:${seconds}`)
      }, 1000);
      isActive = false;
      refs.startBtn.setAttribute('disabled', 'disabled');
   },
};


// timer.start();

refs.startBtn.addEventListener('click', () => {
   timer.start()
});
// ==========================================================

function getTimeComponents(time) {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;

   // Remaining days
   const days = addLeadingZero(Math.floor(time / day));
   // Remaining hours
   const hours = addLeadingZero(Math.floor((time % day) / hour));
   // Remaining minutes
   const minutes = addLeadingZero(Math.floor(((time % day) % hour) / minute));
   // Remaining seconds
   const seconds = addLeadingZero(Math.floor((((time % day) % hour) % minute) / second));

   return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
   refs.clockfaceDay.textContent = `${days}`;
   refs.clockfaceHours.textContent = `${hours}`;
   refs.clockfaceMinutes.textContent = `${minutes}`;
   refs.clockfaceSecond.textContent = `${seconds}`
}

function addLeadingZero(value) {
   return String(value).padStart(2, '0');
}
// function convertMs(ms) {
//    // Number of milliseconds per unit of time
//    const second = 1000;
//    const minute = second * 60;
//    const hour = minute * 60;
//    const day = hour * 24;

//    // Remaining days
//    const days = Math.floor(ms / day);
//    // Remaining hours
//    const hours = Math.floor((ms % day) / hour);
//    // Remaining minutes
//    const minutes = Math.floor(((ms % day) % hour) / minute);
//    // Remaining seconds
//    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//    return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}