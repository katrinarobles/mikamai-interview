//Clicking on the “remove” link of each row must remove the row
const removeButtons = document.querySelectorAll('tbody .remove-action')
const rows = document.querySelectorAll('.product');
const mainCheckbox = document.querySelector('thead .selection')
const checkboxes = document.querySelectorAll('tbody .selection')
const mainRemoveButton = document.querySelector('thead .remove-action');
const div = document.querySelector('hidden-div');


const removeLink = removeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
     button.closest('tr').remove();
  })
});

//Clicking on the “remove selected” link must remove the selected lines
const removeSelected = mainRemoveButton.addEventListener('click', (event) => {
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked === true ) {
        checkbox.closest('tr').remove();
    }
  })
});

//Clicking on the checkbox in the header of the table must select or deselect all rows

const clickAll = mainCheckbox.addEventListener('click', (event) => {
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked === true) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
  })
})


