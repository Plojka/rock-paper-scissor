const game = () => {
    let pScore = 0;
    let cScore = 0;

    //Start the Game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };
    //Play Match
    const playMatch = () => {
      const options = document.querySelectorAll('.options button');
      const playerHand = document.querySelector('.player-hand');
      const computerHand = document.querySelector('.computer-hand');
      const hands = document.querySelectorAll('.hands img');

      hands.forEach(hand => {
          hand.addEventListener('animationend', function() {
              this.style.animation = '';
          });
      });
      //Computer Options
      const computerOptions = ['rock', 'paper', 'scissors'];
      
      options.forEach(option => {
          option.addEventListener('click', function() {
            
            //Computer Choice
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[computerNumber];
            
            setTimeout(() => {
                //Here is where we call compare hands
                compareHands(this.textContent, computerChoice);
                //Update Images
                playerHand.src = `./assets/${this.textContent}.png`;
                computerHand.src = `./assets/${computerChoice}.png`;
                }, 2000)

            //Animotion
            playerHand.style.animation = 'shakePlayer 2s ease';
            computerHand.style.animation = 'shakeComputer 2s ease';
          });
      });
    };

    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    const compareHands = (playerChoice, computerChoice) => {
        //Update Text
        const winner = document.querySelector('.winner');
        //Checking for a tie
        if(playerChoice === computerChoice) {
            winner.textContent = 'It is a tie';
            return;
        }
        //Check for Rock
        if(playerChoice === 'rock') {
            if(computerChoice === 'scissors') {
                winner.textContent = 'Player Wins'
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }
        //Check for Paper
        if(playerChoice === 'paper') {
            if(computerChoice === 'rock') {
                winner.textContent = 'Player Wins'
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }
        //Check for Scissors
        if(playerChoice === 'paper') {
            if(computerChoice === 'scissors') {
                winner.textContent = 'Computer Wins'
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                return;
            }
        }
    }

    //Is call all the inner function
    startGame();
    playMatch();
};

// strart the game function
game();


//text animation
// const TEXT_DATA = 'Rock Paper and Scissors';
const ANIMATION_DELAY = 50;
const RESET_DELAY = 1000;
const REPEAT_DELAY = 2000;
const INFINITE_REPETITION = true;

const animatedTag = document.querySelector(".intro");
const splitTextData = TEXT_DATA.split("");

for (let i = 0; i < splitTextData.length; i++) {
    animatedTag.innerHTML += "<span class='letter'>" + splitTextData[i] + "</span";
}

let char = 0;
let timer;

function initAnimation(){
    timer = setInterval(onTick, ANIMATION_DELAY)
}
initAnimation();

function resetAnimationData(){
    char = 0;
    animatedTag.querySelectorAll('.letter').forEach(el=>
        el.classList.remove('fade'))
}

function finishAnimation(){
    clearInterval(timer);
    timer = null;
}

function allowRepetition(){
    setTimeout(resetAnimationData, RESET_DELAY)
    setTimeout(initAnimation, REPEAT_DELAY)
}

function onTick () {
    animatedTag.querySelectorAll('.letter')[char].classList.add('fade');
    char++;

    if(char === splitTextData.length)  {
        finishAnimation();
        INFINITE_REPETITION && allowRepetition()
    }

}