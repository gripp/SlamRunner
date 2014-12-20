SlamRunner.Controller.Setup = function() {};


SlamRunner.Controller.Setup.prototype.isReady = function() {
  return document.getElementById(
      SlamRunner.Controller.HtmlNames_.POET_NAME_INPUT).value.trim().length > 0;
};


SlamRunner.Controller.Setup.prototype.getAllPoets = function() {
  return [
      document.getElementById(
          SlamRunner.Controller.HtmlNames_.POET_NAME_INPUT).value.trim()];
};
