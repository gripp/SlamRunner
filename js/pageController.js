SlamRunner.PageController = function() {
  this.poetList_ = new SlamRunner.PoetList();
  this.scoreCalculator_ = new SlamRunner.ScoreCalculator();

  this.registerListeners_();

  setInterval(this.tick_.bind(this), 1);
};


SlamRunner.PageController.CHANGE = 'pageControllerChange';


SlamRunner.PageController.prototype.registerListeners_ = function() {
  this.poetList_.getSelectElement().addEventListener(
      'onchange', this.dispatchChange_.bind(this));
  this.scoreCalculator_.getElement().addEventListener(
      'onchange', this.dispatchChange_.bind(this));
};


SlamRunner.PageController.prototype.tick_ = function() {
  this.scoreCalculator_.validateScores();
  this.scoreCalculator_.tickTimer();
};


SlamRunner.PageController.prototype.dispatchChange_ = function() {
  document.dispatchEvent(new Event(SlamRunner.PageController.CHANGE));
};
