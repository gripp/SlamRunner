SlamRunner.Model.Slam = function() {
  this.poets_ = {};
  this.rounds_ = [];
  this.numRounds = 3;
  this.currentPoet_ = 0;
  this.currentRound_ = -1;
};


SlamRunner.Model.Slam.prototype.addPoet = function(name) {
  if (this.getAllPoets().indexOf(name) >= 0) {
    return false;
  }

  this.poets_[name] = new SlamRunner.Model.Poet();
  return true;
};


SlamRunner.Model.Slam.prototype.advanceRound = function() {
  if (this.currentRound_ < this.numRounds) {
    this.currentRound_++;
  }

  if (this.currentRound_ >= this.numRounds) {
    return false;
  }

  var nextRound = new SlamRunner.Model.Round();

  var poetList = 
      this.currentRound_ == -1 ?
      this.getAllPoets() :
      this.rounds_[this.currentRound_].getAllPoets();
  var numToDrop =
      this.currentRound_ == -1 ? 0 : Math.floor(poetList.length / 2);

  nextRound.setPoets(
      SlamRunner.Model.Round.getNewPoetOrder(
          SlamRunner.Model.Round.Order.HIGH_TO_LOW, poetList, numToDrop);
  this.rounds_.push(nextRound);
  return true;
};


SlamRunner.Model.Slam.prototype.getAllPoets = function() {
  return Object.keys(this.poets_);
};


SlamRunner.Model.Slam.prototype.start = function() {
  this.advanceRound();
};
