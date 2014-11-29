SlamRunner.Model.Round = function() {
  this.poets_ = [];
};


SlamRunner.Model.Round.prototype.addPoet = function(name) {
  this.poets_.push(name);
};


SlamRunner.Model.Score.prototype.getNthPoet = function(n) {
  return this.poets_[n];
};
