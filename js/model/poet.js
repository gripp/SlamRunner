SlamRunner.Model.Poet = function(name) {
  this.name_ = name;
  this.scores_ = [];
};


SlamRunner.Model.Poet.prototype.addOrUpdateScoresByRound = function(
    scores, round) {
  this.fillScoresToRound_(round);
  this.scores_[round].setScores(scores);
  document.dispatchEvent(new Event(SlamRunner.Model.Slam.Event.UPDATED));
};


SlamRunner.Model.Poet.prototype.getCumulativeScore = function() {
  var cumulativeScore = 0;
  for (var i = 0; i < this.scores_.length; i++) {
    cumulativeScore += this.scores_[i].getTotalScore();
  }
  return cumulativeScore;
};


SlamRunner.Model.Poet.prototype.getName = function() {
  return this.name_;
};


SlamRunner.Model.Poet.prototype.getScoreByRound = function(round) {
  this.fillScoresToRound_(round);
  return this.scores_[round];
};


SlamRunner.Model.Poet.prototype.fillScoresToRound_ = function(round) {
  while (this.scores_.length <= round) {
    this.scores_.push(new SlamRunner.Model.Score());
  }
};
