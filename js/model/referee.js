SlamRunner.Model.Referee = function() {
  this.pageController_ = new SlamRunner.PageController();

  this.poetList_ = [];
  this.currentPoetIndex_ = null;

  document.addEventListener(
      SlamRunner.PageController.POET_LIST_CHANGE,
      this.updatePoets_.bind(this));
  document.addEventListener(
      SlamRunner.PageController.SCORE_CALCULATOR_CHANGE,
      this.updateScores_.bind(this));
};


SlamRunner.Model.Referee.NUM_SCORES = 5;


SlamRunner.Model.Referee.prototype.updateScores_ = function() {
  this.poetList_[this.currentPoetIndex_].setScores(
      this.pageController_.getCurrentScores());
};


SlamRunner.Model.Referee.prototype.updatePoets_ = function() {
  var viewPoetList = this.pageController_.getPoetList();
  this.pageController_.setScoreCalculatorEnabled(false);
  for (var i = 0; i < viewPoetList.length; i++) {
    this.pageController_.setScoreCalculatorEnabled(true);
    var currentPoetName = viewPoetList[i];
    if (this.isInPoetList_(currentPoetName)) {
      continue;
    }
    this.poetList_.push(new SlamRunner.Model.Poet(currentPoetName));
  }
  this.currentPoetIndex_ = this.pageController_.getCurrentPoetIndex();
  this.pageController_.setCurrentScores(
      this.poetList_[this.currentPoetIndex_].getScores());
};


SlamRunner.Model.Referee.prototype.isInPoetList_ = function(poetName) {
  for (var i = 0; i < this.poetList_; i++) {
    if (poetName == this.poetList_[i].getName()) {
      return true;
    }
  }
  return false;
};


SlamRunner.init = function() {
  new SlamRunner.Model.Referee();
};
