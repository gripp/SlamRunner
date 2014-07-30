var START_LABEL_ = 'Start';
var STOP_LABEL_ = 'Stop';
var TIME_LIMIT_ = .5 * 60 * 1000; // 3 minutes in ms.
var PENALTY_PERIOD_ = 10 * 1000; // 10 seconds in ms.
var POINTS_LOST_PER_PENALTY_PERIOD_ = .5;

var startTime = null;
var stopTime = null;

var CssName_ = {
  START_STOP_BUTTON: 'start-stop-button',
  TIMER_FACE: 'timer-face',
  TIMER_FACE_ERROR: 'timer-face-error',
};


var startStopTimer = function() {
  if (!startTime) {
    startTime = new Date();
    document.getElementById(
        CssName_.START_STOP_BUTTON).textContent = STOP_LABEL_;
  } else if (stopTime) {
    startTime = new Date(Math.abs(new Date() - (stopTime - startTime)));
    stopTime = null;
    document.getElementById(
        CssName_.START_STOP_BUTTON).textContent = STOP_LABEL_;
  } else {
    updateTimerFace_();
    stopTime = new Date();
    document.getElementById(
        CssName_.START_STOP_BUTTON).textContent = START_LABEL_;
  }
};


var updateTimerFace_ = function() {
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

  var timerFace = document.getElementById(CssName_.TIMER_FACE);
  timerFace.textContent = minutes + ":" + seconds + "." + milliseconds;
  timerFace.className = getTimePenalty() ? CssName_.TIMER_FACE_ERROR : '';
};


var resetTimer = function() {
  startTime = null;
  stopTime = null;
  updateTimerFace_();
};


var timerTick = function() {
  if (startTime && !stopTime) {
    updateTimerFace_();
  }
};


var getTimePenalty = function() {
  if (!startTime) {
    return 0;
  }

  var endTime = !stopTime ? new Date() : stopTime;
  var timeOver = Math.abs(endTime - startTime) - TIME_LIMIT_;

  if (timeOver <= PENALTY_PERIOD_) {
    return 0;
  } else {
    return (
        POINTS_LOST_PER_PENALTY_PERIOD_ * Math.floor(
            timeOver / PENALTY_PERIOD_));
  }
};
