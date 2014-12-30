SlamRunner.Model.Score = function() {
  this.scores_ = [0, 0, 0, 0, 0];
  this.time_ = new SlamRunner.Model.Time();
};


SlamRunner.Model.Score.scoreToString = function(score) {
  score = Math.round(score * 10).toString();
  score = score.substring(
      0, score.length - 1) + '.' + score.substring(score.length - 1);
  if (score.indexOf('.') == 0) {
    score = '0' + score;
  }
  return score;
};


SlamRunner.Model.Score.prototype.getTotalScore = function() {
  return Math.max(
      0,
      ((this.scores_[0] +
        this.scores_[1] +
        this.scores_[2] +
        this.scores_[3] +
        this.scores_[4]) -
       Math.max(
           this.scores_[0],
           this.scores_[1],
           this.scores_[2],
           this.scores_[3],
           this.scores_[4]) -
       Math.min(
           this.scores_[0],
           this.scores_[1],
           this.scores_[2],
           this.scores_[3],
           this.scores_[4]) -
       this.getTime().getTimePenalty()));
};


SlamRunner.Model.Score.prototype.getScoreList = function() {
  return this.scores_;
};


SlamRunner.Model.Score.prototype.getTime = function() {
  return this.time_;
};


SlamRunner.Model.Score.prototype.setScores = function(scores) {
  this.scores_ = scores;
};


SlamRunner.Model.Score.prototype.setTimeMs = function(time) {
  this.time_.setTimeMs(time);
  document.dispatchEvent(new Event(SlamRunner.Model.Slam.Event.TIME_UPDATED));
};
