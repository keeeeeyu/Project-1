// Set the elements here.
const easyModeEl = document.querySelector('#easy-mode');
const hardModeEl = document.querySelector('#hard-mode');
const replayBtn = document.querySelector('#replay');
// const scoreBoardEl = document.querySelector('.score-board');
const randomProblemEl = document.querySelector('.random-problem');
const timeLimitEl = document.querySelector('.time-limit');
// const finalScoreBoard = document.querySelector('#final');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const answerInputEasy = document.querySelector('#answer-easy');
const answerInputHard = document.querySelector('#answer-hard');
// const time = document.querySelector('.time-finished');
// const nameDisplay = document.querySelector('.scoreboard');

// Variables

let playerAnswerEasy = null;
let playerAnswerHard = null;
let correctAnswerCount = null;
let answer = null;
let count = 0;
let playerName = '';
let intervalId;
let gameTime = [];
let gameName = [];

const gameObj = {
    arrOperatorEasy: ['+', '-'],
    randomInt: function() {
       return Math.floor(1 + Math.random() * 10)
    },
    raiseDifficulty: function() {
       return Math.floor(11 + Math.random() * 30)
    } 
};

easyModeEl.addEventListener('click', easyMode);
hardModeEl.addEventListener('click', hardMode);
replayBtn.addEventListener('click', init);

function keydown(e) {
    if(e.key === 'Enter') {
        compareAnswer(e);
        document.querySelector('form').reset();
    }
};

answerInputEasy.addEventListener('keydown', keydown);
answerInputHard.addEventListener('keydown', keydown);

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
};

function randomOperatorEasy() {
    let operator =  Math.floor(Math.random() * gameObj.arrOperatorEasy.length);
    return gameObj.arrOperatorEasy[operator];
};

function compareAnswer(e) {
    e.preventDefault();
    playerAnswerEasy = document.querySelector('#answer-easy').value;
    playerAnswerHard = document.querySelector('#answer-hard').value;
    if(answer == playerAnswerEasy) {
        correctAnswerCount++;
        easyProblem();
    } else if(answer == playerAnswerHard) {
        correctAnswerCount++;
        hardProblem();
    }
};

function easyMode() {
    start.style.display = 'block';
    easyModeEl.style.display = 'none';
    hardModeEl.style.display = 'none';
    answerInputHard.style.display = 'none';
    easyProblem();
    timeStart();
}
function hardMode() {
    start.style.display = 'block';
    easyModeEl.style.display = 'none';
    hardModeEl.style.display = 'none';
    answerInputEasy.style.display = 'none';
    answerInputHard.style.display = 'block';
    hardProblem();
    timeStart();
};

function easyProblem() {
    if(correctAnswerCount <= 0) {
        let operand1 = gameObj.randomInt();
        let operand2 = gameObj.randomInt();
        let operator = randomOperatorEasy();
        answer = operator === '+' ? operand1 + operand2 : operand1 - operand2;
        randomProblemEl.innerText = `${operand1} ${operator} ${operand2}`;
    } else if(correctAnswerCount > 0 && correctAnswerCount <= 0) {
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

function timeLimit() {
    count++;
    timeLimitEl.innerHTML = `${count}`;
};
function timeStart() {
    intervalId = setInterval(timeLimit, 1000);
};

// function scoreBoard() {
//     alert(`Congratulation! You have completed 10 questions, your time is ${count} sec`);
//     playerName = prompt(`Enter player's name`);
//     time.innerHTML = `${count} sec`;
//     nameDisplay.innerHTML = `${playerName}`;
//     end.style.display = 'block';
//     start.style.display = 'none';
//     clearInterval(intervalId);
// };
function scoreBoard() {
    alert(`Congratulation! You have completed 10 questions, your time is ${count} sec`);
    playerName = prompt(`Enter player's name`);
    gameTime.push(count);
    gameName.push(playerName);
    inpScoreInfo();
    end.style.display = 'block';
    start.style.display = 'none';
    clearInterval(intervalId);
};
function inpScoreInfo() {
    gameTime.sort(function(a, b) {
        return a - b;
    });
    document.querySelector('#scoreboard1').innerHTML = `${gameName[0]}`
    document.querySelector('#time-finished1').innerHTML = `${gameTime[0]} sec`
    document.querySelector('#scoreboard2').innerHTML = `${gameName[1]}`
    document.querySelector('#time-finished2').innerHTML = `${gameTime[1]} sec`
    document.querySelector('#scoreboard3').innerHTML = `${gameName[2]}`
    document.querySelector('#time-finished3').innerHTML = `${gameTime[2]} sec`
};