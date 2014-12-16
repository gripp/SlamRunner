SlamRunner.Model.Poet = function(name) {
  this.name_ = name;
  this.scores_ = [];
};


SlamRunner.Model.Poet.prototype.addOrUpdateScoresByRound = function(
    scores, round) {
  while (this.scores_.length <= round) {
    this.scores_.push(new SlamRunner.Model.Score());
  }

  this.scores_[round].setScores(scores);

  document.dispatchEvent(new Event(SlamRunner.Model.Slam.Event.UPDATED));
};


SlamRunner.Model.Poet.prototype.getName = function() {
  return this.name_;
};


SlamRunner.Model.Poet.prototype.getScoreByRound = function(round) {
  return this.scores_[round];
};
