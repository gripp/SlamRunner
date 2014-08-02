var PoetList = function() {
  this.registerListeners_()
};


PoetList.CssName_ = {
  ADD_POET_BUTTON: 'add-poet-button',
  POET_NAME_INPUT: 'poet-name-input',
  POET_NAME_SELECT: 'poet-select',
  REMOVE_POET_BUTTON: 'remove-poet-button',
};


PoetList.prototype.registerListeners_ = function() {
  document.getElementById(
      PoetList.CssName_.ADD_POET_BUTTON).onclick = this.addPoet_.bind(this);
  document.getElementById(
      PoetList.CssName_.REMOVE_POET_BUTTON).onclick = this.removePoet_.bind(
          this);
};


PoetList.prototype.addPoet_ = function() {
  var poetNameInput = document.getElementById(
      PoetList.CssName_.POET_NAME_INPUT);
  var poetNameSelect = document.getElementById(
      PoetList.CssName_.POET_NAME_SELECT);
  var poetName = poetNameInput.value.trim();

  if (!poetName) {
    return;
  }

  poetNameInput.value = '';
  var newPoetOption = document.createElement('option');
  newPoetOption.value = poetName;
  newPoetOption.textContent = poetName;
  poetNameSelect.appendChild(newPoetOption); 
};


PoetList.prototype.removePoet_ = function() {
  var poetNameSelect = document.getElementById(
      PoetList.CssName_.POET_NAME_SELECT);
  var selectedIndex = poetNameSelect.selectedIndex;
  poetNameSelect.remove(selectedIndex);
  selectedIndex = Math.max(0, selectedIndex);
  selectedIndex = Math.min(selectedIndex, poetNameSelect.length - 1);
  poetNameSelect.selectedIndex = selectedIndex;
};
