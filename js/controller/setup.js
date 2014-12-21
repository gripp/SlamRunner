SlamRunner.Controller.Setup = function() {
  this.poetNameInput_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.POET_NAME_INPUT);
  this.poetList_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.ADD_POETS_LIST);
  this.addButton_ = document.getElementById(
      SlamRunner.Controller.HtmlNames_.ADD_POET_BUTTON);

  this.addButton_.onclick = function() {
    document.dispatchEvent(
        new Event(SlamRunner.Controller.Setup.POET_ADDED_EVENT));
  };

  document.getElementById(
      SlamRunner.Controller.HtmlNames_.START_SLAM_BUTTON).onclick =
          function() {
            document.dispatchEvent(
                new Event(SlamRunner.Controller.Setup.START_SLAM_EVENT));
          };
};


SlamRunner.Controller.Setup.POET_ADDED_EVENT = 'stp-poetadded';
SlamRunner.Controller.Setup.START_SLAM_EVENT = 'stp-startslam';


SlamRunner.Controller.Setup.prototype.clearEnteredPoetName = function() {
  this.poetNameInput_.value = '';
};


SlamRunner.Controller.Setup.prototype.getEnteredPoetName = function() {
  return this.poetNameInput_.value.trim();
};


SlamRunner.Controller.Setup.prototype.isReady = function() {
  return this.poetList_.length > 0;
};


SlamRunner.Controller.Setup.prototype.setPoetList = function(poets) {
  var selectedIndex = this.poetList_.selectedIndex;

  while (this.poetList_.length > 0) {
    this.poetList_.remove(0);
  }

  var option;
  for (var i = 0; i < poets.length; i++) {
    option = document.createElement('option');
    option.text = poets[i];
    this.poetList_.add(option);
  }

  this.poetList_.selectedIndex = selectedIndex;
};
