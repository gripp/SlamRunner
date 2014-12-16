SlamRunner.Model.Score = function() {
  this.scores_ = [0, 0, 0, 0, 0];
  this.time_ = new SlamRunner.Model.Time();
};


SlamRunner.Model.Score.prototype.getTotalScore = function() {
  return (
      (this.scores_[0] +
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
      this.time_.getTimePenalty());
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
