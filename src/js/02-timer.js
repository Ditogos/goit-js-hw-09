import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/l10n/uk.js';
import Notiflix from 'notiflix';

const inputTextData = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      inputTextData.value = '';
    } else {
      startButton.removeAttribute('disable');
    }
  },
};
flatpickr(inputTextData, options);

const startButton = document.querySelector('button[data-start');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(inputTextData.value);
  const currentTime = new Date();

  if (selectedDate <= currentTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    startButton.disabled = true;
    countdownInterval = setInterval(() => {
      updateTimer(selectedDate);
    }, 1000);
  }
});

function updateTimer(endTime) {
  const now = new Date();
  const timeRemaining = endTime - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    startButton.removeAttribute('disabled');
    timerFields.days.textContent = '00';
    timerFields.hours.textContent = '00';
    timerFields.minutes.textContent = '00';
    timerFields.seconds.textContent = '00';
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

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
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const styleCalendar = document.querySelector('.timer');

styleCalendar.style.display = 'flex';
styleCalendar.style.gap = '10px';
