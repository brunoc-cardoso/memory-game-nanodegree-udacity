'use strict'

let thousandths = 0,
  seconds = 0,
  minutes = 0,
  hours = 0;

let control = null;

// Start the counter
(function startClock() {
  var control = setInterval(stopwatch, 10);
})();

// Stop the counter
function stopTime() {
  clearInterval(control);
  console.log('tempo parado');
}

function showTime() {
  let t = minutes + ' : ' + seconds + ' : '  + thousandths;
  return t;
}

// Increments the minutes, seconds and milliseconds
function stopwatch() {
  if (thousandths < 99) {
    thousandths++;
    if (thousandths < 10) { thousandths = "0" + thousandths }
    thousandthsId.innerHTML = ": " + thousandths;
  }
  if (thousandths == 99) {
    thousandths = -1;
  }
  if (thousandths == 0) {
    seconds++;
    if (seconds < 10) { seconds = "0" + seconds }
    secondsId.innerHTML = ": " + seconds;
  }
  if (seconds == 59) {
    seconds = -1;
  }
  if ((thousandths == 0) && (seconds == 0)) {
    minutes++;
    if (minutes < 10) { minutes = "0" + minutes }
    minutesId.innerHTML = ": " + minutes;
  }
  if (minutes == 59) {
    minutes = -1;
  }
}
