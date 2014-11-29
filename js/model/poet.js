SlamRunner.Model.Poet = function(name) {
  this.name_ = name;
  this.scores_ = [];
};


SlamRunner.Model.Score.prototype.addOrUpdateScoresByRound = function(
    scores, round) {
  while (this.scores_.length <= round) {
    this.scores_.push(new SlamRunner.Model.Score());
  }

  this.scores_[round].setScores(scores);
};


SlamRunner.Model.Score.prototype.getName = function() {
  return this.name_;
};


SlamRunner.Model.Score.prototype.getScoreByRound = function(round) {
  return this.scores_[round].getScore();
};
