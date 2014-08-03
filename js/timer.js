SlamRunner.Timer = function() {
  this.startTime_ = null;
  this.stopTime_ = null;

  this.registerListeners_();
};


SlamRunner.Timer.START_LABEL_ = 'Start';
SlamRunner.Timer.STOP_LABEL_ = 'Stop';
SlamRunner.Timer.TIME_LIMIT_ = 3 * 60 * 1000; // 3 minutes in ms.
SlamRunner.Timer.PENALTY_PERIOD_ = 10 * 1000; // 10 seconds in ms.
SlamRunner.Timer.POINTS_LOST_PER_PENALTY_PERIOD_ = .5;


SlamRunner.Timer.CssName_ = {
  RESET_BUTTON: 'reset-button',
  START_STOP_BUTTON: 'start-stop-button',
  TIMER_FACE: 'timer-face',
  TIMER_FACE_ERROR: 'timer-face-error',
};


SlamRunner.Timer.prototype.registerListeners_ = function() {
  document.getElementById(
      SlamRunner.Timer.CssName_.RESET_BUTTON).onclick =
          this.resetTimer_.bind(this);
  document.getElementById(
      SlamRunner.Timer.CssName_.START_STOP_BUTTON).onclick =
          this.startStopTimer_.bind(this);
};


SlamRunner.Timer.prototype.startStopTimer_ = function() {
  if (!this.startTime_) {
    this.startTime_ = new Date();
    document.getElementById(
        SlamRunner.Timer.CssName_.START_STOP_BUTTON).textContent =
            SlamRunner.Timer.STOP_LABEL_;
  } else if (this.stopTime_) {
    this.startTime_ =
        new Date(Math.abs(new Date() - (this.stopTime_ - this.startTime_)));
    this.stopTime_ = null;
    document.getElementById(
        SlamRunner.Timer.CssName_.START_STOP_BUTTON).textContent =
            SlamRunner.Timer.STOP_LABEL_;
  } else {
    this.updateTimerFace_();
    this.stopTime_ = new Date();
    document.getElementById(
        SlamRunner.Timer.CssName_.START_STOP_BUTTON).textContent =
            SlamRunner.Timer.START_LABEL_;
  }
  this.dispatchChange_();
};


SlamRunner.Timer.prototype.updateTimerFace_ = function() {
  var time;

  if (this.startTime_) {
    time = new Date(Math.abs(new Date() - this.startTime_));
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

  var timerFace = this.getElement();
  timerFace.textContent = minutes + ":" + seconds + "." + milliseconds;
  timerFace.className =
      this.getTimePenalty() ? SlamRunner.Timer.CssName_.TIMER_FACE_ERROR : '';
};


SlamRunner.Timer.prototype.resetTimer_ = function() {
  this.startTime_ = null;
  this.stopTime_ = null;
  this.updateTimerFace_();
  this.dispatchChange_();
};


SlamRunner.Timer.prototype.tick = function() {
  if (this.startTime_ && !this.stopTime_) {
    this.updateTimerFace_();
  }
};


SlamRunner.Timer.prototype.getTimePenalty = function() {
  if (!this.startTime_) {
    return 0;
  }

  var endTime = !this.stopTime_ ? new Date() : this.stopTime_;
  var timeOver = Math.abs(
      endTime - this.startTime_) - SlamRunner.Timer.TIME_LIMIT_;

  if (timeOver <= SlamRunner.Timer.PENALTY_PERIOD_) {
    return 0;
  } else {
    return (
        SlamRunner.Timer.POINTS_LOST_PER_PENALTY_PERIOD_ * Math.floor(
            timeOver / SlamRunner.Timer.PENALTY_PERIOD_));
  }
};


SlamRunner.Timer.prototype.dispatchChange_ = function() {
  this.getElement().dispatchEvent(new Event('onchange'));
};


SlamRunner.Timer.prototype.getElement = function() {
  return document.getElementById(SlamRunner.Timer.CssName_.TIMER_FACE);
};
