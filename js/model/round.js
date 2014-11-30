SlamRunner.Model.Round = function() {
  this.poets_ = [];
};


SlamRunner.Model.Round.Order = {
  HIGH_TO_LOW: 1,
};


SlamRunner.Model.Round.comparePoetsByScoreDescending = function(poet1, poet2) {
  return poet1.getCumulativeScore() >= poet2.getCumulativeScore();
};


SlamRunner.Model.Round.getNewPoetOrder = function(order, poetList, numToDrop) {
  var returnLength = poetList.length - numToDrop;
  var newPoets = [];

  var comparisonFunction = null;
  switch (order) {
    case HIGH_TO_LOW: 
    default:
      comparisonFunction = SlamRunner.Model.Round.comparePoetsByScoreDescending;
  }

  while (newPoets.length < returnLength) {
    var max = 0;
    for (var i = 1; i < poetList.length; i++) {
      max = comparisonFunction(poet[max], poet[i]) ? max : i;
    }
    newPoets.push(poetList[max]);
    poetList = poetList.splice(max, 1);
  }

  return newPoets;
};


SlamRunner.Model.Round.prototype.addPoet = function(name) {
  this.poets_.push(name);
};


SlamRunner.Model.Score.prototype.getAllPoets = function() {
  return this.poets_;
};


SlamRunner.Model.Score.prototype.getNthPoet = function(n) {
  return this.poets_[n];
};
