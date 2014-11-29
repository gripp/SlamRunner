SlamRunner.Model.Score = function() {
  this.scores_ = [0, 0, 0, 0, 0];
  this.time_ = new SlamRunner.Model.Time();
};


SlamRunner.Model.Score.prototype.getScore = function() {
  return (
      (scores_[0] + scores_[1] + scores_[2] + scores_[3] + scores_[4]) -
      Math.max(scores_[0], scores_[1], scores_[2], scores_[3], scores_[4]) -
      Math.min(scores_[0], scores_[1], scores_[2], scores_[3], scores_[4]) -
      this.time_.getTimePenalty());
};


SlamRunner.Model.Score.prototype.getTime = function() {
  return this.time_;
};


SlamRunner.Model.Score.prototype.setScore = function(scores) {
  this.scores_ = scores;
};
