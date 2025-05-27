let calculation = localStorage.getItem('calculation') || '';
    
    displayResult();

    function updateCalculation(pickedValue){
      calculation+=pickedValue;
      // console.log(calculation);
      localStorage.setItem('calculation',calculation);
      displayResult();
    };

    function displayResult(){
      document.querySelector('.js-display-result').innerHTML = `${calculation}`;
    };