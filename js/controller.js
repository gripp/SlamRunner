SlamRunner.Controller = function() {
  this.scoreBoxes_ = document.getElementsByClassName(
      SlamRunner.Controller.HtmlNames_.SCORE_INPUT);
  this.timer_ = new SlamRunner.Controller.Timer();
  this.totalScoreLabel_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.SCORE_TOTAL);

  document.addEventListener(
      SlamRunner.Model.Slam.Event.STARTED, this.initializePage_.bind(this));
  document.addEventListener(
      SlamRunner.Model.Slam.Event.UPDATED, this.updateViewFromModel_.bind(this));
  document.addEventListener(
      SlamRunner.Controller.Timer.TIME_UPDATED_EVENT,
      this.updateModelFromView_.bind(this));

  this.slam_ = new SlamRunner.Model.Slam();
  // TODO(gripp): We have to actually initialize the slam here. For now, a fake
  // starter poet.
  this.slam_.addPoet('Gripp');
  this.slam_.start();
};


SlamRunner.Controller.prototype.initializePage_ = function() {
  // Set up score input event tiggers.
  for (var i = 0; i < this.scoreBoxes_.length; i++) {
    this.scoreBoxes_[i].onchange = this.updateModelFromView_.bind(this);
    this.scoreBoxes_[i].disabled = false;
  }

  // Enable the timer.
  this.timer_.enable();
};


SlamRunner.Controller.HtmlNames_ = {
    RESET_BUTTON: 'reset-button',
    SCORE_INPUT: 'score',
    SCORE_TOTAL: 'total-score',
    START_STOP_BUTTON: 'start-stop-button',
    TIMER_FACE: 'timer-face',
    TIMER_FACE_ERROR: 'timer-face-error',
};


SlamRunner.Controller.Events = {
    MODEL_UPDATED: 'model-updated',
};


SlamRunner.Controller.prototype.updateModelFromView_ = function() {
  // Update scores.
  var scores = [];
  for (var i = 0; i < this.scoreBoxes_.length; i++) {
    var currentScore = parseFloat(this.scoreBoxes_[i].value);

    if (currentScore < 0 || isNaN(currentScore)) {
      currentScore = 0;
    } else if (currentScore > 10) {
      currentScore = 10;
    }
    scores.push(currentScore);
  }

  this.slam_.getCurrentPoet().addOrUpdateScoresByRound(
      scores, this.slam_.getCurrentRound());
  this.slam_.getCurrentScore().setTimeMs(this.timer_.getTimeMs());
};


SlamRunner.Controller.prototype.updateViewFromModel_ = function() {
  var currentScoreObj = this.slam_.getCurrentScore();

  var totalScore = currentScoreObj.getTotalScore().toString();
  var scores = currentScoreObj.getScoreList();
  for (var i = 0; i < this.scoreBoxes_.length; i++) {
    var currentScore = scores[i];
    currentScore = currentScore.toString();

    if (currentScore.length < 2) {
      currentScore += '.0';
    }
    this.scoreBoxes_[i].value = currentScore;
  }

  this.totalScoreLabel_.textContent =
      totalScore.indexOf('.') < 0 ? totalScore + '.0' : totalScore;

  this.totalScoreLabel_.className =
      currentScoreObj.getTime().getTimePenalty() > 0 ?
      SlamRunner.Controller.HtmlNames_.TIMER_FACE_ERROR :
      '';
};


SlamRunner.init = function() {
  new SlamRunner.Controller();
};
