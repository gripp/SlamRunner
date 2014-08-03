// Constructor.
SlamRunner.ScoreCalculator = function() {
  this.timer_ = new SlamRunner.Timer();
  this.scores_ = [];

  for (
      var i = 0;
      i < document.getElementsByClassName(
          SlamRunner.ScoreCalculator.CssName_.SCORE).length;
      i++) {
    this.scores_[i] = 0;
  }
 
  this.registerListeners_();
};


// Static members.
SlamRunner.ScoreCalculator.CssName_  = {
  INPUT_ERROR: 'input-error',
  SCORE: 'score',
  SCORE_CALCULATOR: 'score-calculator',
  TOTAL_SCORE: 'total-score',
};


// Public methods.
SlamRunner.ScoreCalculator.prototype.getElement = function() {
  return document.getElementById(
      SlamRunner.ScoreCalculator.CssName_.SCORE_CALCULATOR);
};


SlamRunner.ScoreCalculator.prototype.getScores = function() {
  return this.scores_;
};


SlamRunner.ScoreCalculator.prototype.setEnabled = function(enabled) {
  var scoreInputs = document.getElementsByClassName(
      SlamRunner.ScoreCalculator.CssName_.SCORE);
  for (var i = 0; i < scoreInputs.length; i++) {
    scoreInputs[i].disabled = !enabled;
  }
  this.timer_.setEnabled(enabled);
};


SlamRunner.ScoreCalculator.prototype.setScores = function(scores) {
  var scoreInputs = document.getElementsByClassName(
      SlamRunner.ScoreCalculator.CssName_.SCORE);
  if (scores.length != scoreInputs.length) {
    return;
  }

  this.scores_ = [];
  for (var i = 0; i < scoreInputs.length; i++) {
    scoreInputs[i].value = scores[i];
    this.scores_.push(scores[i]);
  }
};


SlamRunner.ScoreCalculator.prototype.tickTimer = function() {
  this.timer_.tick();
};


SlamRunner.ScoreCalculator.prototype.validateScores = function() {
  var allScoresValid = true;

  var max = 0;
  var min = 10;
  var total = 0;

  var scoreInputs = document.getElementsByClassName(
      SlamRunner.ScoreCalculator.CssName_.SCORE);
  for (var i = 0; i < scoreInputs.length; i++) {
    var scoreInput = scoreInputs[i];
    var score = Math.round(Number(scoreInput.value) * 10) / 10;
    if ((!score && score != 0) || score < 0 || score > 10) {
      allScoresValid = false;
      scoreInput.className = [
          SlamRunner.ScoreCalculator.CssName_.INPUT_ERROR,
          SlamRunner.ScoreCalculator.CssName_.SCORE].join(' ');
    } else {
      max = score > max ? score : max;
      min = score < min ? score : min;
      total += score;

      this.scores_[i] = score;
      scoreInput.className = SlamRunner.ScoreCalculator.CssName_.SCORE;
    }
  }

  if (allScoresValid) {
    var totalScoreLabel = document.getElementById(
        SlamRunner.ScoreCalculator.CssName_.TOTAL_SCORE);
    totalScoreLabel.textContent = Number(
        total - max - min - this.timer_.getTimePenalty()).toFixed(1);
  }
};


// Private methods.
SlamRunner.ScoreCalculator.prototype.dispatchChange_ = function() {
  this.getElement().dispatchEvent(new Event('onchange'));
};


SlamRunner.ScoreCalculator.prototype.registerListeners_ = function() {
  var scoreInputs = document.getElementsByClassName(
      SlamRunner.ScoreCalculator.CssName_.SCORE);
  for (var i = 0; i < scoreInputs.length; i++) {
    var scoreInput = scoreInputs[i];
    scoreInput.onchange = this.dispatchChange_.bind(this);
  }
  this.timer_.getElement().addEventListener(
      'onchange', this.dispatchChange_.bind(this));
};
