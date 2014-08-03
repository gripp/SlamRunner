// Constructor.
SlamRunner.PoetList = function() {
  this.registerListeners_()
};


// Static members.
SlamRunner.PoetList.CssName_ = {
  ADD_POET_BUTTON: 'add-poet-button',
  INPUT_ERROR: 'input-error',
  POET_NAME_INPUT: 'poet-name-input',
  POET_NAME_SELECT: 'poet-select',
  REMOVE_POET_BUTTON: 'remove-poet-button',
};
SlamRunner.PoetList.ENTER_BUTTON_ = 13;


// Public methods.
SlamRunner.PoetList.prototype.getSelectElement = function() {
  return document.getElementById(SlamRunner.PoetList.CssName_.POET_NAME_SELECT);
};


SlamRunner.PoetList.prototype.getCurrentPoetIndex = function(enabled) {
  return this.getSelectElement().selectedIndex;
};


SlamRunner.PoetList.prototype.getPoetList = function() {
  var poetNameSelect = this.getSelectElement(); 
  var poetList = [];
  for (var i = 0; i < poetNameSelect.length; i++) {
    poetList.push(poetNameSelect.options[i].value.toLowerCase());
  }
  return poetList;
};


// Private methods.
SlamRunner.PoetList.prototype.addPoet_ = function() {
  var poetNameInput = document.getElementById(
      SlamRunner.PoetList.CssName_.POET_NAME_INPUT);
  var poetNameSelect = this.getSelectElement(); 
  var poetName = poetNameInput.value.trim();

  if (!poetName) {
    return;
  }

  for (var i = 0; i < poetNameSelect.length; i++) {
    if (
        poetName.toLowerCase() ==
        poetNameSelect.options[i].value.toLowerCase()) {
      poetNameInput.className = [
          SlamRunner.PoetList.CssName_.POET_NAME_INPUT,
          SlamRunner.PoetList.CssName_.INPUT_ERROR].join(' ');
      return;
    }
  }

  poetNameInput.value = '';
  var newPoetOption = document.createElement('option');
  newPoetOption.value = poetName;
  newPoetOption.textContent = poetName;
  poetNameSelect.appendChild(newPoetOption); 
  poetNameInput.className = SlamRunner.PoetList.CssName_.POET_NAME_INPUT;
  poetNameInput.focus();
  this.updateSelection_();
};


SlamRunner.PoetList.prototype.registerListeners_ = function() {
  document.getElementById(
      SlamRunner.PoetList.CssName_.ADD_POET_BUTTON).onclick =
          this.addPoet_.bind(this);
  document.getElementById(
      SlamRunner.PoetList.CssName_.REMOVE_POET_BUTTON).onclick =
          this.removePoet_.bind(this);
  document.getElementById(
      SlamRunner.PoetList.CssName_.POET_NAME_INPUT).onkeypress =
          function(e) {
            if (e.keyCode == SlamRunner.PoetList.ENTER_BUTTON_) {
              this.addPoet_();
            }
          }.bind(this);
  this.getSelectElement().onchange = function() {
    this.getSelectElement().dispatchEvent(new Event('onchange'));
  }.bind(this);
};


SlamRunner.PoetList.prototype.removePoet_ = function() {
  var poetNameSelect = this.getSelectElement();
  var selectedIndex = poetNameSelect.selectedIndex;
  poetNameSelect.remove(selectedIndex);
  this.updateSelection_(selectedIndex);
};


SlamRunner.PoetList.prototype.updateSelection_ = function(opt_selectedIndex) {
  var poetNameSelect = this.getSelectElement();
  var selectedIndex = opt_selectedIndex || poetNameSelect.selectedIndex;
  selectedIndex = Math.min(selectedIndex, poetNameSelect.length - 1);
  selectedIndex = Math.max(0, selectedIndex);
  poetNameSelect.selectedIndex = selectedIndex;
  this.getSelectElement().dispatchEvent(new Event('onchange'));
};
