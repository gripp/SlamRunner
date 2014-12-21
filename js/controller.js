SlamRunner.Controller = function() {
  this.setup_ = new SlamRunner.Controller.Setup();
  this.timer_ = new SlamRunner.Controller.Timer();

  this.currentPoetName_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.CURRENT_POET);
  this.scoreBoxes_ = document.getElementsByClassName(
      SlamRunner.Controller.HtmlNames_.SCORE_INPUT);
  this.totalScoreLabel_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.SCORE_TOTAL);

  document.addEventListener(
      SlamRunner.Model.Slam.Event.STARTED, this.initializePage_.bind(this));
  document.addEventListener(
      SlamRunner.Model.Slam.Event.UPDATED,
      this.updateViewFromModel_.bind(this));
  document.addEventListener(
      SlamRunner.Controller.Timer.TIME_UPDATED_EVENT,
      this.updateModelFromView_.bind(this));
  document.addEventListener(
      SlamRunner.Controller.Setup.POET_ADDED_EVENT, this.addPoet_.bind(this));
  document.addEventListener(
      SlamRunner.Controller.Setup.START_SLAM_EVENT, this.start_.bind(this));

  this.slam_ = new SlamRunner.Model.Slam();
};


SlamRunner.Controller.HtmlNames_ = {
    ADD_POET_BUTTON: 'add-poet-button',
    ADD_POETS_LIST: 'add-poets-list',
    CURRENT_POET: 'current-poet-name',
    CURRENT_POET_DIV: 'current-poet-label',
    POET_NAV: 'poet-nav',
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


SlamRunner.Controller.prototype.addPoet_ = function() {
  var poetName = this.setup_.getEnteredPoetName();

  if (poetName.length == 0) {
    return;
  }

  this.slam_.addPoet(poetName);
  this.setup_.clearEnteredPoetName();
  this.updateViewFromModel_();
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
      SlamRunner.Controller.HtmlNames_.CURRENT_POET_DIV).style.display =
          'block';
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.POET_NAV).style.display = 'block';
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

  this.slam_.start();
  this.updateViewFromModel_();
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
  if (this.slam_.hasStarted()) {
    this.currentPoetName_.textContent = this.slam_.getCurrentPoet().getName();

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
  } else {
    this.setup_.setPoetList(this.slam_.getAllPoets());
  }
};


SlamRunner.init = function() {
  new SlamRunner.Controller();
};
