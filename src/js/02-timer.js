import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let chosenTime;
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]'); 


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if (options.defaultDate >= selectedDates[0]) {
      Notiflix.Notify.failure("Please choose a date in the future");;
      startBtn.disabled = true;
      return
    };

    startBtn.disabled = false;

    chosenTime = selectedDates[0];
  },
};

flatpickr(datetimePicker, options);

startBtn.addEventListener('click', onClick);

let timerId;

function onClick() {
  startBtn.disabled = true;

  if (timerId) {
    return
  }

  timerId = setInterval(() => {
    const currentTime = new Date()
    const timeData = chosenTime - currentTime;
    const timeObject = convertMs(timeData)

    dataDays.textContent = addLeadingZero(timeObject.days);
    dataHours.textContent = addLeadingZero(timeObject.hours);
    dataMinutes.textContent = addLeadingZero(timeObject.minutes);
    dataSeconds.textContent = addLeadingZero(timeObject.seconds);

    if (timeData <= 1000) {
      clearInterval(timerId);
      timerId = null;
  }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}