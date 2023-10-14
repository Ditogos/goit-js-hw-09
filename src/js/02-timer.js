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
    if (selectedDates <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      inputTextData.value = '';
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};
flatpickr(inputTextData, options);

const startButton = document.querySelector('button[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(inputTextData.value);
  const currentTime = Date.now();

  if (selectedDate <= currentTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    countdownInterval = setInterval(() => {
      updateTimer(selectedDate);
    }, 1000);
  }
});

function updateTimer(endTime) {
  const now = Date.now();
  const timeRemaining = endTime - now;

  function updateTimerDisplay(days, hours, minutes, seconds) {
    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);
  }

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    startButton.removeAttribute('disabled');
    updateTimerDisplay(0, 0, 0, 0);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  updateTimerDisplay(days, hours, minutes, seconds);
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

// Styles Css

const divContainerCalendar = document.querySelector('.container');
const inputCalendar = document.getElementById('datetime-picker');
const inputStartCalendar = document.querySelector('button[data-start]');
const styleTimer = document.querySelector('.timer');
const spanStyleTimer = document.querySelectorAll('.timer span');

styleTimer.style.display = 'flex';
styleTimer.style.justifyContent = 'center';
styleTimer.style.alignItems = 'center';
styleTimer.style.width = '100%';
styleTimer.style.height = '100%';
styleTimer.style.flexDirection = 'column';

spanStyleTimer.forEach(span => {
  span.style.display = 'inline-block';
  span.style.backgroundColor = '#f7f7f7';
  span.style.border = '1px solid #ddd';
  span.style.padding = '10px';
  span.style.borderRadius = '5px';
  span.style.fontSize = '20px';
});

divContainerCalendar.style.display = 'flex';
divContainerCalendar.style.flexDirection = 'column';
divContainerCalendar.style.alignItems = 'center';
divContainerCalendar.style.justifyContent = 'center';
divContainerCalendar.style.height = '100px';

inputCalendar.style.padding = '10px';
inputCalendar.style.margin = '10px';
inputCalendar.style.border = '1px solid #ddd';
inputCalendar.style.borderRadius = '5px';
inputCalendar.style.fontSize = '16px';

inputStartCalendar.style.padding = '10px 20px';
inputStartCalendar.style.margin = '10px';
inputStartCalendar.style.backgroundColor = '#4CAF50';
inputStartCalendar.style.color = 'white';
inputStartCalendar.style.border = 'none';
inputStartCalendar.style.borderRadius = '5px';
inputStartCalendar.style.cursor = 'pointer';
inputStartCalendar.style.fontSize = '16px';
