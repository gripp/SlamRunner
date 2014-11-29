SlamRunner.Model.Time = function() {
  this.time_ms_ = null;
};


// 10 secs * 1000 ms/sec
SlamRunner.Model.Time.PENALTY_PERIOD_ = 10 * 1000;


SlamRunner.Model.Time.PENALTY_POINTS_ = .5;


// 3 min * 60 secs/min * 1000 ms/sec
SlamRunner.Model.Time.TIME_LIMIT_ = 3 * 60 * 1000;


SlamRunner.Model.Time.prototype.getTimeMs = function() {
  return this.time_ms_;
};


SlamRunner.Model.Time.prototype.getTimePenalty = function() {
  var overflowTime = this.getTimeMs() - SlamRunner.Model.Time.TIME_LIMIT_;
  if (overflowTime < 0) {
    return 0;
  } else {
    return (
        Math.floor(overflowTime / SlamRunner.Model.Time.PENALTY_PERIOD_) *
        SlamRunner.Model.Time.PENALTY_POINTS_);
  }
};


SlamRunner.Model.Time.prototype.setTimeMs = function(time_ms) {
  this.time_ms_ = time_ms;
};
