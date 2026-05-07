alert("JS is connected!");

// Game state
let score = 0;
let timeLeft = 30; // Matches your HTML starting time
let currentCorrectResult = 0;

// Elements from HTML (Updated to match your HTML IDs)
const timerEl = document.querySelector('#timer span');
const scoreEl = document.querySelector('#score span');
const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const operatorEl = document.getElementById('operator');
const inputField = document.getElementById('answer-input');
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameArea = document.getElementById('game-area');
const finalScoreEl = document.getElementById('final-score');
const resultScreen = document.getElementById('result-screen');

// Function to start the game
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameArea.classList.remove('hidden');
    generateMathProblem();
    startCountdown();
});

function generateMathProblem() {
    const n1 = Math.floor(Math.random() * 900) + 100;
    const n2 = Math.floor(Math.random() * 900) + 100;
    const isAddition = Math.random() < 0.5;

    num1El.textContent = n1;
    num2El.textContent = n2;
    operatorEl.textContent = isAddition ? '+' : '-';
    
    currentCorrectResult = isAddition ? (n1 + n2) : (n1 - n2);
    inputField.value = ''; 
    inputField.focus(); // Keeps the cursor in the box
}

function startCountdown() {
    const interval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

// Logic for the Submit button
document.getElementById('submit-btn').addEventListener('click', checkAnswer);

// Allow pressing "Enter" to submit
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

function checkAnswer() {
    if (parseInt(inputField.value) === currentCorrectResult) {
        score++;
        scoreEl.textContent = score;
        generateMathProblem();
    } else {
        inputField.value = ''; // Clear if wrong
    }
}

function endGame() {
    gameArea.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreEl.textContent = score;
}