SlamRunner.Controller = function() {
  this.timer_ = new SlamRunner.Controller.Timer();

  document.addEventListener(
      SlamRunner.Model.Slam.Event.STARTED, this.initializePage_.bind(this));
  document.addEventListener(
      SlamRunner.Model.Slam.Event.UPDATED, this.updateViewFromModel_.bind(this));
  document.addEventListener(
      SlamRunner.Model.Slam.Event.TIME_UPDATED_EVENT, this.updateModelFromView_.bind(this));

  this.slam_ = new SlamRunner.Model.Slam();
  // TODO(gripp): We have to actually initialize the slam here. For now, a fake
  // starter poet.
  this.slam_.addPoet('Gripp');
  this.slam_.start();
};


SlamRunner.Controller.prototype.initializePage_ = function() {
  // Set up score input event tiggers.
  var scoreBoxes = document.getElementsByClassName(
      SlamRunner.Controller.HtmlNames_.SCORE_INPUT);
  for (var i = 0; i < scoreBoxes.length; i++) {
    scoreBoxes[i].onchange = this.updateModelFromView_.bind(this);
    scoreBoxes[i].disabled = false;
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
  var scoreBoxes = document.getElementsByClassName(
      SlamRunner.Controller.HtmlNames_.SCORE_INPUT);
  var scores = [];
  for (var i = 0; i < scoreBoxes.length; i++) {
    var currentScore = parseFloat(scoreBoxes[i].value);

    if (currentScore < 0 || isNaN(currentScore)) {
      currentScore = 0;
    } else if (currentScore > 10) {
      currentScore = 10;
    }
    scores.push(currentScore);
  }

  this.slam_.getCurrentPoet().addOrUpdateScoresByRound(
      scores, this.slam_.getCurrentRound());

  // TODO(gripp) Update the time of the current poem.
};


SlamRunner.Controller.prototype.updateViewFromModel_ = function() {
  var scoreBoxes = document.getElementsByClassName(
      SlamRunner.Controller.HtmlNames_.SCORE_INPUT);
  var totalScore = this.slam_.getCurrentPoet().getScoreByRound(
      this.slam_.getCurrentRound()).getTotalScore().toString();
  var scores = this.slam_.getCurrentPoet().getScoreByRound(
      this.slam_.getCurrentRound()).getScoreList();
  for (var i = 0; i < scoreBoxes.length; i++) {
    var currentScore = scores[i];
    currentScore = currentScore.toString();

    if (currentScore.length < 2) {
      currentScore += '.0';
    }
    scoreBoxes[i].value = currentScore;
  }

  document.getElementById(
      SlamRunner.Controller.HtmlNames_.SCORE_TOTAL).textContent =
          totalScore.indexOf('.') < 0 ? totalScore + '.0' : totalScore;
};


SlamRunner.init = function() {
  new SlamRunner.Controller();
};
