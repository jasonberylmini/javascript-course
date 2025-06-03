let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*if(!score){
        score = {
          wins: 0,
          losses: 0,
          ties: 0,
        };
      }
      */

const autoplayButton = document.querySelector('.js-auto-play-button');

let isAutoPlaying = false;
let intervalId; 

function autoPlay() {
 if (!isAutoPlaying) {
      intervalId = setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

autoplayButton.addEventListener('click',event => {
 autoPlay();
})

document.body.addEventListener('keydown', event =>{
  if(event.key === 'a'){
    autoPlay();
  }
})

const resetButton = document.querySelector('.js-reset-score-button');

function resetScore(){
  document.body.innerHTML = `<div class="reset-message">Are you sure you want to reset the score</div> <button>Yes</button> <button>No</button>`;
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
}

resetButton.addEventListener('click', () => {
  resetScore();
});

document.body.addEventListener('keydown', event => {
  if(event.key === 'Backspace'){
    resetScore();
  }
})
// const autoPlay = () => {
  
// }


document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown',(event) => {
  if(event.key === 'r'){
    playGame('rock');
  } else if (event.key === 'p'){
    playGame('paper');
  } else if (event.key ==='s'){
    playGame('scissors')
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = `${result}`;
  document.querySelector(".js-moves").innerHTML = `You
      <img src="images/${playerMove}.png" class="move-icon">
      <img src="images/${computerMove}.png" class="move-icon">
      computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}
