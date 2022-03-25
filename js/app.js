// Elements
const easyModeEl = document.querySelector('#easy-mode');
const hardModeEl = document.querySelector('#hard-mode');
const replayBtn = document.querySelector('#replay');
const randomProblemEl = document.querySelector('.random-problem');
const timeLimitEl = document.querySelector('.time-limit');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const answerInputEasy = document.querySelector('#answer-easy');
const answerInputHard = document.querySelector('#answer-hard');
const nameboard1 = document.querySelector('#scoreboard1');
const nameboard2 = document.querySelector('#scoreboard2');
const nameboard3 = document.querySelector('#scoreboard3');
const timefinish1 = document.querySelector('#time-finished1');
const timefinish2 = document.querySelector('#time-finished2');
const timefinish3 = document.querySelector('#time-finished3');

//Event Listners
easyModeEl.addEventListener('click', easyMode);
hardModeEl.addEventListener('click', hardMode);
replayBtn.addEventListener('click', init);
answerInputEasy.addEventListener('keydown', keydown);
answerInputHard.addEventListener('keydown', keydown);

// Variables
let playerAnswerEasy = null;
let playerAnswerHard = null;
let correctAnswerCount = 0;
let answer = null;
let count = 0;
let playerName = '';
let intervalId;
let highScore = [];
let replayCount = 0;

// Audio
let tickTockSound = new Audio('sound/clock-tick-tock.mp3');
let correctSound = new Audio('sound/correct.mp3');
let incorrectSound = new Audio('sound/incorrect.mp3');

const gameObj = {
    arrOperatorEasy: ['+', '-'],
    randomInt: function() {
       return Math.floor(1 + Math.random() * 10)
    },
    raiseDifficulty: function() {
       return Math.floor(11 + Math.random() * 30)
    } 
};

function keydown(e) {
    if(e.key === 'Enter') {
        compareAnswer(e);
        document.querySelector('form').reset();
    }
};

function init() {
   easyModeEl.style.display = 'inline-block';
   hardModeEl.style.display = 'inline-block';
   end.style.display = 'none';
   playerAnswerEasy = null;
   playerAnswerHard = null;
   correctAnswerCount = null;
   answer = null;
   count = 0;
   timeLimitEl.innerHTML = `${count}`;
   replayCount++;
};

function randomOperatorEasy() {
    let operator =  Math.floor(Math.random() * gameObj.arrOperatorEasy.length);
    return gameObj.arrOperatorEasy[operator];
};

function easyMode() {
    start.style.display = 'block';
    easyModeEl.style.display = 'none';
    hardModeEl.style.display = 'none';
    answerInputHard.style.display = 'none';
    easyProblem();
    timeStart();
    tickTockSound.play();
    tickTockSound.volume = 0.2;
};

function hardMode() {
    start.style.display = 'block';
    easyModeEl.style.display = 'none';
    hardModeEl.style.display = 'none';
    answerInputEasy.style.display = 'none';
    answerInputHard.style.display = 'block';
    hardProblem();
    timeStart();
    tickTockSound.play();
    tickTockSound.volume = 0.2;
};

function easyProblem() {
    if(correctAnswerCount <= 5) {
        let operand1 = gameObj.randomInt();
        let operand2 = gameObj.randomInt();
        let operator = randomOperatorEasy();
        answer = operator === '+' ? operand1 + operand2 : operand1 - operand2;
        randomProblemEl.innerText = `${operand1} ${operator} ${operand2}`;
    } else if(correctAnswerCount > 5 && correctAnswerCount <= 10) {
        let operand1 = gameObj.raiseDifficulty();
        let operand2 = gameObj.raiseDifficulty();
        let operator = randomOperatorEasy();
        answer = operator === '+' ? operand1 + operand2 : operand1 - operand2;
        randomProblemEl.innerText = `${operand1} ${operator} ${operand2}`;
    } else {
        scoreBoard();
    }
};

function hardProblem() {
    if(correctAnswerCount <= 5) {
        let operand1 = gameObj.randomInt();
        let operand2 = gameObj.randomInt();
        answer = operand1 * operand2;
        randomProblemEl.innerText = `${operand1} * ${operand2}`;
    } else if(correctAnswerCount > 5 && correctAnswerCount <= 10) {
        let operand1 = gameObj.raiseDifficulty();
        let operand2 = gameObj.randomInt();
        answer = operand1 * operand2;
        randomProblemEl.innerText = `${operand1} * ${operand2}`;
    } else {
        scoreBoard();
    } 
};

function compareAnswer(e) {
    e.preventDefault();
    playerAnswerEasy = document.querySelector('#answer-easy').value;
    playerAnswerHard = document.querySelector('#answer-hard').value;
    if(answer == playerAnswerEasy) {
        correctAnswerCount++;
        correctSound.play();
        correctSound.volume = 0.1;
        correctSound.currentTime = 0;
        easyProblem();
    } else if(answer == playerAnswerHard) {
        correctAnswerCount++;
        correctSound.play();
        correctSound.volume = 0.1;
        correctSound.currentTime = 0;
        hardProblem();
    } else {
        incorrectSound.play();
        incorrectSound.volume = 0.1;
        incorrectSound.currentTime = 0;
    }
};

function timeLimit() {
    count++;
    timeLimitEl.innerHTML = `${count}`;
};

function timeStart() {
    intervalId = setInterval(timeLimit, 1000);
};

function scoreBoard() {
    tickTockSound.pause();
    correctSound.pause();
    incorrectSound.pause();
    alert(`Congratulation! You have completed 10 questions, your time is ${count} sec`);
    playerName = prompt(`Enter player's name`);
    highScore.push([count, playerName]);
    inpScoreInfo();
    end.style.display = 'block';
    start.style.display = 'none';
    clearInterval(intervalId);
};

function inpScoreInfo() {
    highScore.sort(function(a, b) {
        return a[0] - b[0];
    });
    if(replayCount === 0) {
        nameboard1.innerHTML = `${highScore[0][1]}`;
        timefinish1.innerHTML = `${highScore[0][0]} sec`;
    } else if(replayCount === 1) {
        nameboard1.innerHTML = `${highScore[0][1]}`;
        timefinish1.innerHTML = `${highScore[0][0]} sec`;
        nameboard2.innerHTML = `${highScore[1][1]}`;
        timefinish2.innerHTML = `${highScore[1][0]} sec`;
    } else if(replayCount === 2) {
        nameboard1.innerHTML = `${highScore[0][1]}`;
        timefinish1.innerHTML = `${highScore[0][0]} sec`;
        nameboard2.innerHTML = `${highScore[1][1]}`;
        timefinish2.innerHTML = `${highScore[1][0]} sec`;
        nameboard3.innerHTML = `${highScore[2][1]}`;
        timefinish3.innerHTML = `${highScore[2][0]} sec`;
    }
};
