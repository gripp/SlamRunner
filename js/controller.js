SlamRunner.Controller = function() {
  this.setup_ = new SlamRunner.Controller.Setup();
  this.timer_ = new SlamRunner.Controller.Timer();

  this.scoreBoxes_ = document.getElementsByClassName(
      SlamRunner.Controller.HtmlNames_.SCORE_INPUT);
  this.totalScoreLabel_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.SCORE_TOTAL);

  document.getElementById(
      SlamRunner.Controller.HtmlNames_.START_SLAM_BUTTON).onclick =
          this.start_.bind(this);
  document.addEventListener(
      SlamRunner.Model.Slam.Event.STARTED, this.initializePage_.bind(this));
  document.addEventListener(
      SlamRunner.Model.Slam.Event.UPDATED,
      this.updateViewFromModel_.bind(this));
  document.addEventListener(
      SlamRunner.Controller.Timer.TIME_UPDATED_EVENT,
      this.updateModelFromView_.bind(this));

  this.slam_ = new SlamRunner.Model.Slam();
};


SlamRunner.Controller.HtmlNames_ = {
    POET_NAME_INPUT: 'poet-name-input',
    RESET_BUTTON: 'reset-button',
    SCORE_CALCULATOR: 'score-calculator',
    SCORE_INPUT: 'score',
    SCORE_TOTAL: 'total-score',
    SETUP: 'slam-setup',
    START_SLAM_BUTTON: 'start-slam-button',
    START_STOP_BUTTON: 'start-stop-button',
    TIMER_FACE: 'timer-face',
    TIMER_FACE_ERROR: 'timer-face-error',
};


SlamRunner.Controller.Events = {
    MODEL_UPDATED: 'model-updated',
};


SlamRunner.Controller.prototype.initializePage_ = function() {
  // Set up score input event tiggers.
  for (var i = 0; i < this.scoreBoxes_.length; i++) {
    this.scoreBoxes_[i].onchange = this.updateModelFromView_.bind(this);
    this.scoreBoxes_[i].disabled = false;
  }

  // Enable the timer.
  this.timer_.enable();

  document.getElementById(
      SlamRunner.Controller.HtmlNames_.SCORE_CALCULATOR).style.display =
          'block';
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.SETUP).style.display = 'none';
};


SlamRunner.Controller.prototype.start_ = function() {
  if (!this.setup_.isReady()) {
    return;
  }

  var poets = this.setup_.getAllPoets();
  for (var i = 0; i < poets.length; i++) {
    this.slam_.addPoet(poets[i]);
  }

  this.slam_.start();
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
