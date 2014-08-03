SlamRunner.Model.Poet = function(name) {
  this.name_ = name;
  this.scores_ = [];

  for (var i = 0; i < SlamRunner.Model.Referee.NUM_SCORES; i++) {
    this.scores_.push(0);
  }
};


SlamRunner.Model.Poet.prototype.getName = function() {
  return this.name_;
};


SlamRunner.Model.Poet.prototype.getScores = function() {
  return this.scores_;
};


SlamRunner.Model.Poet.prototype.setScores = function(scores) {
  if (scores.length != SlamRunner.Model.Referee.NUM_SCORES) {
    throw 'Invalid score array.';
  }

  for (var i = 0; i < scores.length; i++) {
    this.scores_[i] = scores[i];
  }
};
