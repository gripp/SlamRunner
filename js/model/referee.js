SlamRunner.Model.Referee = function() {
  this.pageController_ = new SlamRunner.PageController();
  document.addEventListener(
      SlamRunner.PageController.CHANGE, this.update_.bind(this));
};


SlamRunner.Model.Referee.prototype.update_ = function() {
  // TODO(gripp) Sync slam state to the cloud for automatic restores.
};


SlamRunner.init = function() {
  new SlamRunner.Model.Referee();
};
