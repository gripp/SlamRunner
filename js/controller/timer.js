SlamRunner.Controller.Timer = function() {
  this.resetButton_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.RESET_BUTTON);
  this.startStopButton_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.START_STOP_BUTTON);
  this.timerFace_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.TIMER_FACE);

  this.startTime_ = null;
  this.stopTime_ = null;

  this.startStopButton_.onclick = this.onStartStopClick_.bind(this);
  this.resetButton_.onclick = this.onResetClick_.bind(this);
  setInterval(
      (function() {
         if (this.startTime_ && !this.stopTime_) {
           this.updateTimerFace_();
         }
      }).bind(this), 1);
};


SlamRunner.Controller.Timer.START_LABEL_ = 'Start';
SlamRunner.Controller.Timer.STOP_LABEL_ = 'Stop';
SlamRunner.Controller.Timer.TIME_UPDATED_EVENT = 'timeupdated';


SlamRunner.Controller.Timer.prototype.enable = function() {
  this.startStopButton_.disabled = false;
  this.resetButton_.disabled = false;
};


SlamRunner.Controller.Timer.prototype.getTimeAsDateObject_ = function() {
  if (this.startTime_ && this.stopTime_) {
    return new Date(Math.abs(this.stopTime_ - this.startTime_));
  } else if (this.startTime_) {
    return new Date(Math.abs(new Date() - this.startTime_));
  } else {
    return new Date(0);
  }
};

SlamRunner.Controller.Timer.prototype.getTimeMs = function() {
  return this.getTimeAsDateObject_().getTime();
};


SlamRunner.Controller.Timer.prototype.onResetClick_ = function() {
  this.startTime_ = null;
  this.stopTime_ = null;
  this.updateTimerFace_();
  document.dispatchEvent(
      new Event(SlamRunner.Controller.Timer.TIME_UPDATED_EVENT));
};


SlamRunner.Controller.Timer.prototype.onStartStopClick_ = function() {
  if (!this.startTime_) {
    this.startTime_ = new Date();
    this.startStopButton_.textContent =
        SlamRunner.Controller.Timer.STOP_LABEL_;
  } else if (this.stopTime_) {
    this.startTime_ = new Date(
        Math.abs(new Date() - (this.stopTime_ - this.startTime_)));
    this.stopTime_ = null;
    this.startStopButton_.textContent =
        SlamRunner.Controller.Timer.STOP_LABEL_;
  } else {
    this.stopTime_ = new Date();
    this.updateTimerFace_();
    this.startStopButton_.textContent =
        SlamRunner.Controller.Timer.START_LABEL_;

    document.dispatchEvent(
        new Event(SlamRunner.Controller.Timer.TIME_UPDATED_EVENT));
  }
};


SlamRunner.Controller.Timer.prototype.timerTick_ = function() {
  if (this.startTime_ && !this.stopTime_) {
    this.updateTimerFace_();
  }
};


SlamRunner.Controller.Timer.prototype.updateTimerFace_ = function() {
  var time = this.getTimeAsDateObject_();

  var minutes = time.getMinutes().toString();
  minutes = minutes.length == 1 ? "0" + minutes : minutes;

  var seconds = time.getSeconds().toString();
  seconds = seconds.length == 1 ? "0" + seconds : seconds;

  var milliseconds = time.getMilliseconds().toString();
  while (milliseconds.length < 3) {
    milliseconds = "0" + milliseconds;
  }

  this.timerFace_.textContent = minutes + ":" + seconds + "." + milliseconds;
};
