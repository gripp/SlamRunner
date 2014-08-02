var Referee = function() {
  this.poetList_ = new PoetList();
  this.scoreCalculator_ = new ScoreCalculator();

  setInterval(this.tick_.bind(this), 1);
};


Referee.prototype.tick_ = function() {
  this.scoreCalculator_.validateScores();
  this.scoreCalculator_.tickTimer();
};


var init = function() {
  new Referee();
};
