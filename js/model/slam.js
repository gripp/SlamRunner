SlamRunner.Model.Slam = function() {
  this.poets_ = {};
  this.rounds_ = [];
  this.numRounds_ = 3;
  this.currentPoet_ = 0;
  this.currentRound_ = -1;
};


SlamRunner.Model.Slam.Event = {
    ENDED: 'slm-ended',
    STARTED: 'slm-started',
    UPDATED: 'slm-updated',
};


SlamRunner.Model.Slam.prototype.addPoet = function(name) {
  if (this.getAllPoets().indexOf(name) >= 0) {
    return false;
  }

  this.poets_[name] = new SlamRunner.Model.Poet(name);
  document.dispatchEvent(new Event(SlamRunner.Model.Slam.Event.UPDATED));
  return true;
};


SlamRunner.Model.Slam.prototype.advance = function() {
  this.currentPoet_++;
  if (
      this.currentPoet_ ==
      this.rounds_[this.currentRound_].getAllPoets().length) {
    this.advanceRound();
  }

  if (this.hasEnded()) {
    document.dispatchEvent(new Event(SlamRunner.Model.Slam.Event.ENDED));
  } else {
    document.dispatchEvent(new Event(SlamRunner.Model.Slam.Event.UPDATED));
  }
};


SlamRunner.Model.Slam.prototype.advanceRound = function() {
  if (this.currentRound_ < this.numRounds_) {
    this.currentRound_++;
    this.currentPoet_ = 0;
  }

  if (this.hasEnded()) {
    return;
  }

  var nextRound = new SlamRunner.Model.Round();

  var poetList =
      this.currentRound_ == 0 ?
      this.getAllPoets() :
      this.rounds_[this.currentRound_ - 1].getAllPoets();
  var poetList = this.getPoetsFromNames(poetList);

  var numToDrop = 0;
  // TODO(gripp) Add dropping of poets back in.
  // this.currentRound_ == 0 ? 0 : Math.floor(poetList.length / 2);

  nextRound.setPoets(
      SlamRunner.Model.Round.getNewPoetOrder(
          SlamRunner.Model.Round.Order.HIGH_TO_LOW, poetList, numToDrop));
  this.rounds_.push(nextRound);
};


SlamRunner.Model.Slam.prototype.getAllPoets = function() {
  return Object.keys(this.poets_);
};


SlamRunner.Model.Slam.prototype.getCurrentPoet = function() {
  if (this.hasEnded()) {
    return false;
  }

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


SlamRunner.Model.Slam.prototype.hasEnded = function() {
  return this.currentRound_ >= this.numRounds_;
};


SlamRunner.Model.Slam.prototype.hasStarted = function() {
  return this.currentRound_ >= 0;
};


SlamRunner.Model.Slam.prototype.start = function() {
  this.advanceRound();
  document.dispatchEvent(new Event(SlamRunner.Model.Slam.Event.STARTED));
};
