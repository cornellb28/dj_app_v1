function getSelectedOptions() {
  const selectElement = document.getElementById("my-select");
  const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
  const selectedOptionsString = selectedOptions.join(", ");
  console.log(selectedOptionsString);
}

const button = document.getElementsByClassName('button')[0];
button.addEventListener("click", getSelectedOptions);


// should return string like this ex....... option-1, option-2
