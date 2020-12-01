/*
Orientation-JS assignment 2
Solution by: Miguel Andrade-Cheneuer
*/
const game = () => {
    
    //score counts
    let pScore = 0;
    let cScore = 0;
    
    //result history
    let gameHistory = [];
    
    //intro screen
    const introScreen = document.querySelector('.intro');
    const playBtn = document.querySelector('.intro button');
        
    //match screen
    const matchScreen = document.querySelector('.match');
    const winner = document.querySelector('.winner');
    const hands = document.querySelectorAll('.hands img');
    const playerScore = document.querySelector('.player-score h1');
    const computerScore = document.querySelector('.computer-score h1');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const optionSelection = document.querySelector('.options');
    const optionButtons = document.querySelectorAll('.options button');
    const pStreak = document.querySelector('.player-score p');
    const cStreak = document.querySelector('.computer-score p');
    
    //Backgroud mp3 music
    const gameMusic = document.querySelector('.gameMusic');
    gameMusic.volume = 0.1;
    gameMusic.loop = true;
    const endMusic = document.querySelector('.endMusic');
    endMusic.volume = 0.1;
    
    //play again screen
    const endMessage = document.querySelector('.end h2');
    const endScreen = document.querySelector('.end');
    const playAgainBtn = document.querySelector('.playAgain');

    //starts the game by fading from intro to match screen
    const startGame = () => {
        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            matchScreen.classList.add('fadeIn');
            gameMusic.play();
        });
    };
    //play a match 
    const playMatch = () => {
        for (hand of hands) {
            hand.addEventListener('animationend', function () {
                this.style.animation = '';
            });
        };
    //computer options
    const computerOptions = ['rock', 'paper', 'scissors'];
        for (option of optionButtons) {
            option.addEventListener('click', function () {
                
                //start-up hands 
                playerHand.src = "assets/rock.png";
                computerHand.src = "assets/rock.png";
                
                //Scrrens fades by a click
                optionSelection.classList.remove('fadeOut');
                optionSelection.classList.remove('respawn');
                winner.classList.remove('fadeOut');
                winner.classList.remove('fadeIn');
                
                //computer random choice of hands
                const computerNumber = Math.floor(Math.random()*3);
                const computerChoice = computerOptions[computerNumber];
                
                //hide screen options
                optionSelection.classList.add('fadeOut');
                winner.classList.add('fadeOut');
                    
                setTimeout(() => {
                
                //call compareHands
                 compareHands(this.textContent, computerChoice);
                
                 //update images
                playerHand.src = `assets/${this.textContent}.png`;
                computerHand.src = `assets/${computerChoice}.png`;
                
                //respawn screen options
                optionSelection.classList.add('respawn');
                winner.classList.add('fadeIn');
            }, 500);
                    
                //hands animation
                playerHand.style.animation = 'shakePlayer 0.5s ease';
                computerHand.style.animation = 'shakeComputer 0.5s ease';
                    
            });
        };
    };
    
    //streaks (with 3 wins player/computer can win, if tied streaks restarts)
    const getStreak = (user) => {
        let lastThree = gameHistory.slice(Math.max(gameHistory.length - 3, 0));
        let p = lastThree.length-1;
        let streak = 0;
           
            if (lastThree[p] == user) {
                streak = 1;
                if (lastThree[p-1] == user) {
                    streak = 2;
                    if (lastThree[p-2] == user) {
                        streak = 3;
                    };
                };
            };
            
        return streak;
    };
    //update streaks
    const updateStreak = () => {
        pStreak.textContent = "Streak: " + getStreak('player');
        cStreak.textContent = "Streak: " + getStreak('computer');
     
    };
    
    //update pScore and cScore
    const updateScore = () => {
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
        updateStreak();
    };
    //play again button
    const playAgain = () => {
        playAgainBtn.addEventListener('click', () => {
            pScore = 0;
            cScore = 0;
            updateScore();
            gameHistory = [];
            endMusic.pause();
            endMusic.load();
            gameMusic.play();
            for (option of optionButtons) {
                option.disabled = false;
            }    
            endScreen.classList.remove('fadeIn');
            playerHand.style.animation = 'playerIn 1s ease 0.5s';
            computerHand.style.animation = 'computerIn 1s ease 0.5s';
            matchScreen.classList.add('fadeIn');
            playerHand.src = "assets/rock.png";
            computerHand.src = "assets/rock.png";
        });
    };
        
    //ending the game with 10 wins for both player and computer 
    const gameOver = () => {
        
    
        if (pScore === 10 || getStreak('player') === 3) {
            matchScreen.classList.remove('fadeIn');
            endScreen.classList.add('fadeIn');
            endMessage.textContent = 'Mega-Man WINS!';
            gameMusic.pause();
            endMusic.play();
            for (option of optionButtons) {
                option.disabled = true;
            }
            playAgain();
            return "over";
        };
        if (cScore === 10 || getStreak('computer') === 3) {
            matchScreen.classList.remove('fadeIn');
            endScreen.classList.add('fadeIn');
            endMessage.textContent = 'Dr. Wily WINS!';
            gameMusic.pause();
            endMusic.play();
            for (option of optionButtons) {
                option.disabled = true;
            }
            playAgain();
            return "over";
        };
    };

    
    //update scores
    const compareHands = (playerChoice, computerChoice) => {
        
        //checks for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = "Tie!";
            gameHistory.push('tie');
            updateScore();
            gameOver();
            return;
        };
        //checks for rock
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Mega-Man Hits!';
                pScore ++;
                gameHistory.push('player');
                updateScore();
                gameOver();
                return;
            } else {
                winner.textContent = 'Dr. Wily Strikes!';
                cScore ++;
                gameHistory.push('computer');
                updateScore();
                gameOver();
                return;
            };
        };   
        //checks for paper
        if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Dr. Wily Strikes!';
                cScore ++;
                gameHistory.push('computer');
                updateScore();
                gameOver();
                return;
            } else {
                winner.textContent = 'Mega-Man Hits!';
                pScore ++;
                gameHistory.push('player');
                updateScore();
                gameOver();
                return;
            };
        }; 
        //checks for scissors
        if (playerChoice === 'scissors') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Mega-Man Hits!';
                pScore ++;
                gameHistory.push('player');
                updateScore();
                gameOver();
                return;
            } else {
                winner.textContent = 'Dr. Wily Strikes!';
                cScore ++;
                gameHistory.push('computer');
                updateScore();
                gameOver();
                return;
            };
        };
    };
    //mute and unmute buttons
    const muteAll = () => {
        muteBtn = document.querySelector('.mute');
        allSounds = document.querySelectorAll('audio');
    
        muteBtn.addEventListener('click', () => {
            for (sound of allSounds){
                sound.muted = true;
            };
        });
    };    
    const unmuteAll = () => {
        muteBtn = document.querySelector('.unmute');
        allSounds = document.querySelectorAll('audio');
    
        muteBtn.addEventListener('click', () => {
            for (sound of allSounds){
                sound.muted = false;
            };
        });
    };   
        
//call all inner functions
startGame();
playMatch();
muteAll();
unmuteAll();
};
    
//call the game function
game();
    
    