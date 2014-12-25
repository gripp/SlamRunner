SlamRunner.Controller = function() {
  this.setup_ = new SlamRunner.Controller.Setup();
  this.timer_ = new SlamRunner.Controller.Timer();

  this.currentPoetName_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.CURRENT_POET);
  this.currentRound_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.CURRENT_ROUND);
  this.currentRoundScores_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.CURRENT_ROUND_SCORES);
  this.scoreBoxes_ = document.getElementsByClassName(
      SlamRunner.Controller.HtmlNames_.SCORE_INPUT);
  this.totalScoreLabel_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.SCORE_TOTAL);
  this.previousPoetLink_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.PREV_POET_LINK);

  document.addEventListener(
      SlamRunner.Model.Slam.Event.STARTED, this.initializePage_.bind(this));
  document.addEventListener(
      SlamRunner.Model.Slam.Event.ENDED, this.showFinalScores_.bind(this));
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
    BIRDS_EYE: 'birds-eye',
    CURRENT_INFO: 'current-info',
    CURRENT_POET: 'current-poet-name',
    CURRENT_ROUND: 'current-round-number',
    CURRENT_ROUND_SCORES: 'current-round-scores',
    FINAL_SCORES: 'final-scores',
    NEXT_POET_LINK: 'next-poet-link',
    POET_NAV: 'poet-nav',
    POET_NAME_INPUT: 'poet-name-input',
    PREV_POET_LINK: 'prev-poet-link',
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

  this.setup_.clearEnteredPoetName();
  this.slam_.addPoet(poetName);
};


SlamRunner.Controller.prototype.initializePage_ = function() {
  // Set up score input event tiggers.
  for (var i = 0; i < this.scoreBoxes_.length; i++) {
    this.scoreBoxes_[i].onchange = this.updateModelFromView_.bind(this);
    this.scoreBoxes_[i].disabled = false;
  }

  // Enable the timer.
  this.timer_.enable();

  // Set up the nav links.
  this.previousPoetLink_.onclick = this.slam_.rewind.bind(this.slam_);
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.NEXT_POET_LINK).onclick =
          this.slam_.advance.bind(this.slam_);

  // Display the current poet label.
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.CURRENT_INFO).style.display =
          'block';

  // Display the score calculator.
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.SCORE_CALCULATOR).style.display =
          'block';

  // Display the slam nav bar.
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.POET_NAV).style.display = 'block';

  // Display the birds eye section.
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.BIRDS_EYE).style.display = 'block';

  // Hide the setup section.
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.SETUP).style.display = 'none';

  this.updateModelFromView_();
};


SlamRunner.Controller.prototype.showFinalScores_ = function() {
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.CURRENT_INFO).style.display =
          'none';
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.SCORE_CALCULATOR).style.display =
          'none';
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.POET_NAV).style.display = 'none';
  document.getElementById(
      SlamRunner.Controller.HtmlNames_.BIRDS_EYE).style.display = 'none';

  var finalScores = document.getElementById(
      SlamRunner.Controller.HtmlNames_.FINAL_SCORES);
  var poetList = SlamRunner.Model.Round.getNewPoetOrder(
      SlamRunner.Model.Round.Order.HIGH_TO_LOW,
      this.slam_.getPoetsFromNames(this.slam_.getAllPoets()),
      0);
  for (var i = 0; i < poetList.length; i++) {
    var nextPoetLi = document.createElement('li');
    nextPoetLi.textContent =
        poetList[i].getName() +
        ' ' +
        SlamRunner.Model.Score.scoreToString(poetList[i].getCumulativeScore());
    finalScores.appendChild(nextPoetLi);
  }
  finalScores.style.display = 'block';
};


SlamRunner.Controller.prototype.start_ = function() {
  if (!this.setup_.isReady()) {
    return;
  }

  this.slam_.start();
};


SlamRunner.Controller.prototype.updateBirdsEyeView_ = function() {
  while (this.currentRoundScores_.hasChildNodes()) {
    this.currentRoundScores_.removeChild(this.currentRoundScores_.lastChild);
  }
  var poetList = this.slam_.getCurrentRoundPoets();
  for (var i = 0; i < poetList.length; i++) {
    var nextPoetLi = document.createElement('li');
    nextPoetLi.textContent =
        poetList[i].getName() +
        ' ' +
        SlamRunner.Model.Score.scoreToString(
            poetList[i].getScoreByRound(
                this.slam_.getCurrentRound()).getTotalScore());
    this.currentRoundScores_.appendChild(nextPoetLi);
  }
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
  if (this.slam_.hasEnded()) {
    return;
  } else if (this.slam_.hasStarted()) {
    this.currentRound_.textContent = (
        this.slam_.getCurrentRound() + 1).toString();
    this.currentPoetName_.textContent = this.slam_.getCurrentPoet().getName();

    var currentScoreObj = this.slam_.getCurrentScore();

    var totalScore = SlamRunner.Model.Score.scoreToString(
        currentScoreObj.getTotalScore());
    var scores = currentScoreObj.getScoreList();
    for (var i = 0; i < this.scoreBoxes_.length; i++) {
      this.scoreBoxes_[i].value =
          SlamRunner.Model.Score.scoreToString(scores[i]);
    }

    this.totalScoreLabel_.textContent =
        totalScore.indexOf('.') < 0 ? totalScore + '.0' : totalScore;

    this.totalScoreLabel_.className =
        currentScoreObj.getTime().getTimePenalty() > 0 ?
        SlamRunner.Controller.HtmlNames_.TIMER_FACE_ERROR :
        '';

    this.previousPoetLink_.style.display = this.slam_.canGoBack() ? 'inline' : 'none';
    this.updateBirdsEyeView_();
  } else {
    this.setup_.setPoetList(this.slam_.getAllPoets());
  }
};


SlamRunner.init = function() {
  new SlamRunner.Controller();
};
