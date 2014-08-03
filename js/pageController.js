SlamRunner.PageController = function() {
  this.poetList_ = new SlamRunner.PoetList();
  this.scoreCalculator_ = new SlamRunner.ScoreCalculator();

  this.registerListeners_();

  setInterval(this.tick_.bind(this), 1);
};


SlamRunner.PageController.POET_LIST_CHANGE = 'poetListChange';
SlamRunner.PageController.SCORE_CALCULATOR_CHANGE = 'scoreCalculatorChange';


SlamRunner.PageController.prototype.registerListeners_ = function() {
  this.poetList_.getSelectElement().addEventListener(
      'onchange', this.dispatchPoetListChange_.bind(this));
  this.scoreCalculator_.getElement().addEventListener(
      'onchange', this.dispatchScoreCalculatorChange_.bind(this));
};


SlamRunner.PageController.prototype.tick_ = function() {
  this.scoreCalculator_.validateScores();
  this.scoreCalculator_.tickTimer();
};


SlamRunner.PageController.prototype.dispatchPoetListChange_ = function() {
  document.dispatchEvent(new Event(SlamRunner.PageController.POET_LIST_CHANGE));
};


SlamRunner.PageController.prototype.dispatchScoreCalculatorChange_ =
    function() {
  document.dispatchEvent(
      new Event(SlamRunner.PageController.SCORE_CALCULATOR_CHANGE));
};


SlamRunner.PageController.prototype.getPoetList = function() {
  return this.poetList_.getPoetList();
};


SlamRunner.PageController.prototype.setScoreCalculatorEnabled =
    function(enabled) {
  this.scoreCalculator_.setEnabled(enabled);
};


SlamRunner.PageController.prototype.getCurrentPoetIndex = function(enabled) {
  return this.poetList_.getCurrentPoetIndex();
};


SlamRunner.PageController.prototype.getCurrentScores = function() {
  return this.scoreCalculator_.getScores();
};


SlamRunner.PageController.prototype.setCurrentScores = function(scores) {
  return this.scoreCalculator_.setScores(scores);
};
