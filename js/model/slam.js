SlamRunner.Model.Slam = function() {
  this.poets_ = {};
  this.rounds_ = [];
  this.numRounds = 3;
  this.currentPoet_ = 0;
  this.currentRound_ = -1;
};


SlamRunner.Model.Slam.Event = {
    STARTED: 'slm-started',
    UPDATED: 'slm-updated',
};


SlamRunner.Model.Slam.prototype.addPoet = function(name) {
  if (this.getAllPoets().indexOf(name) >= 0) {
    return false;
  }

  this.poets_[name] = new SlamRunner.Model.Poet(name);
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
      this.currentRound_ == 0 ?
      this.getAllPoets() :
      this.rounds_[this.currentRound_].getAllPoets();
  var poetList = this.getPoetsFromNames(poetList);

  var numToDrop =
      this.currentRound_ == 0 ? 0 : Math.floor(poetList.length / 2);

  nextRound.setPoets(
      SlamRunner.Model.Round.getNewPoetOrder(
          SlamRunner.Model.Round.Order.HIGH_TO_LOW, poetList, numToDrop));
  this.rounds_.push(nextRound);
  return true;
};


SlamRunner.Model.Slam.prototype.getAllPoets = function() {
  return Object.keys(this.poets_);
};


SlamRunner.Model.Slam.prototype.getCurrentPoet = function() {
  return this.poets_[
      this.rounds_[this.currentRound_].getNthPoet(this.currentPoet_)];
};


SlamRunner.Model.Slam.prototype.getCurrentRound = function() {
  return this.currentRound_;
};


SlamRunner.Model.Slam.prototype.getCurrentScore = function() {
  return this.getCurrentPoet().getScoreByRound(this.getCurrentRound());
};


SlamRunner.Model.Slam.prototype.getPoetsFromNames = function(poetNames) {
  var poets = [];
  for (var i = 0; i < poetNames.length; i++) {
    poets.push(this.poets_[poetNames[i]]);
  }
  return poets;
};


SlamRunner.Model.Slam.prototype.hasStarted = function() {
  return this.currentRound_ >= 0;
};


SlamRunner.Model.Slam.prototype.start = function() {
  this.advanceRound();
  document.dispatchEvent(new Event(SlamRunner.Model.Slam.Event.STARTED));
};
