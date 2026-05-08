// ==UserScript==
// @name     GitHub Clear Squash Merge Title
// @version  1
// @grant    none
// @match    https://github.com/*/pull/*
// ==/UserScript==

function clearInput(fieldId) {
  input = document.getElementById(fieldId)
  if (input && !input['data-already-cleared']) {
    console.log("Greasemonkey Script: squash merge title field cleared");
    input.value = "";
    input['data-already-cleared'] = true; // only clear it once
  }
}

function disableButton(button) {
  button.disabled = true
}

function enableButton(button) {
  button.disabled = false
}


function checkButton() {
  const candidateButtons = document.querySelectorAll('button[value="squash"]');
  const confirmButton = candidateButtons[candidateButtons.length - 1];
  const squashMergeTitle = document.getElementById("merge_title_field");
  disableButton(confirmButton); // ensure button is disabled at first
  if (confirmButton && squashMergeTitle) {
    function checkSquashMergeTitle(event) {
      if (squashMergeTitle.value.trim().length === 0) {
        disableButton(confirmButton);
      } else {
        enableButton(confirmButton);
      }
    }
    squashMergeTitle.addEventListener('input', checkSquashMergeTitle);
  }
}

const pageObserver = new MutationObserver(_changes => {
  clearInput("merge_title_field");
  checkButton();
});

pageObserver.observe(document, {
  subtree: true,
  childList: true
});
