var startTime = null;
var stopTime = null;
var START_LABEL_ = 'Start';
var STOP_LABEL_ = 'Stop';


var CssName_ = {
  START_STOP_BUTTON: 'start-stop-button',
  TIMER_FACE: 'timer-face',
};


function startStopTimer() {
  if (!startTime) {
    startTime = new Date();
    document.getElementById(
        CssName_.START_STOP_BUTTON).textContent = STOP_LABEL_;
  } else if (stopTime) {
    stopTime = null;
    document.getElementById(
        CssName_.START_STOP_BUTTON).textContent = STOP_LABEL_;
  } else {
    updateTimerFace_();
    stopTime = new Date();
    document.getElementById(
        CssName_.START_STOP_BUTTON).textContent = START_LABEL_;
  }
}


function updateTimerFace_() {
  var time;

  if (startTime) {
    time = new Date(Math.abs(new Date() - startTime));
  } else {
    time = new Date(0);
  }

  var minutes = time.getMinutes().toString();
  minutes = minutes.length == 1 ? "0" + minutes : minutes;

  var seconds = time.getSeconds().toString();
  seconds = seconds.length == 1 ? "0" + seconds : seconds;

  var milliseconds = time.getMilliseconds().toString();
  while (milliseconds.length < 3) {
    milliseconds = "0" + milliseconds;
  }

  document.getElementById(
      CssName_.TIMER_FACE).textContent =
          minutes + ":" + seconds + "." + milliseconds;
}


function resetTimer() {
  startTime = null;
  stopTime = null;
  updateTimerFace_();
}


function tick() {
  if (startTime && !stopTime) {
    updateTimerFace_();
  }
}
