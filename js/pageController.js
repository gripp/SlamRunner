var SlamRunner = {};


SlamRunner.Referee = function() {
  this.poetList_ = new SlamRunner.PoetList();
  this.scoreCalculator_ = new SlamRunner.ScoreCalculator();

  setInterval(this.tick_.bind(this), 1);
};


SlamRunner.Referee.prototype.tick_ = function() {
  this.scoreCalculator_.validateScores();
  this.scoreCalculator_.tickTimer();
};


SlamRunner.init = function() {
  new SlamRunner.Referee();
};
