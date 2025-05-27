

function toggledButton(button) {
  const buttonElement = document.querySelector(button);
  if (!buttonElement.classList.contains("js-on-button")) {
    checkButton();
    buttonElement.classList.add("js-on-button");
  } else {
   buttonElement.classList.remove("js-on-button");
  }
}

function checkButton(){
  const button = document.querySelector('.js-on-button');
  if(button){
    button.classList.remove('js-on-button');
  }
}