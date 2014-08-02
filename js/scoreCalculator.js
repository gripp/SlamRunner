SlamRunner.ScoreCalculator = function() {
  this.timer_ = new SlamRunner.Timer();
};


SlamRunner.ScoreCalculator.CssNames_  = {
  INPUT_ERROR: 'input-error',
  SCORE: 'score',
  TOTAL_SCORE: 'total-score',
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
      ScoreCalculator.CssNames_.SCORE);
  for (var i = 0; i < scoreInputs.length; i++) {
    var scoreInput = scoreInputs[i];
    var score = Math.round(Number(scoreInput.value) * 10) / 10;
    if ((!score && score != 0) || score < 0 || score > 10) {
      allScoresValid = false;
      scoreInput.className = [
          ScoreCalculator.CssNames_.INPUT_ERROR,
          ScoreCalculator.CssNames_.SCORE].join(' ');
    } else {
      max = score > max ? score : max;
      min = score < min ? score : min;
      total += score;

      scoreInput.className = ScoreCalculator.CssNames_.SCORE;
    }
  }

  if (allScoresValid) {
    var totalScoreLabel = document.getElementById(
        ScoreCalculator.CssNames_.TOTAL_SCORE);
    totalScoreLabel.textContent = Number(
        total - max - min - this.timer_.getTimePenalty()).toFixed(1);
  }
};
