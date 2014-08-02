var CssName_ = {
  POET_NAME_INPUT: 'poet-name-input',
  POET_NAME_SELECT: 'poet-select',
};


var addPoet = function() {
  var poetNameInput = document.getElementById(CssName_.POET_NAME_INPUT);
  var poetNameSelect = document.getElementById(CssName_.POET_NAME_SELECT);
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


var removePoet = function() {
  var poetNameSelect = document.getElementById(CssName_.POET_NAME_SELECT);
  var selectedIndex = poetNameSelect.selectedIndex;
  poetNameSelect.remove(selectedIndex);
  selectedIndex = Math.max(0, selectedIndex);
  selectedIndex = Math.min(selectedIndex, poetNameSelect.length - 1);
  poetNameSelect.selectedIndex = selectedIndex;
};
