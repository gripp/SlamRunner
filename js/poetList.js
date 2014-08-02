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
