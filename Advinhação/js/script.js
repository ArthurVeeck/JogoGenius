let player1 = "";

let player2 = "";

let currentPlayer = 1;

let player1Attempts = 0;

let player2Attempts = 0;

let player1Finished = false;

let player2Finished = false;

const guessInput =
document.getElementById("guessInput");

const message =
document.getElementById("message");

const attemptsDisplay =
document.getElementById("attempts");

const bestScoreDisplay =
document.getElementById("bestScore");

const victoryScreen =
document.getElementById("victoryScreen");

const victoryText =
document.getElementById("victoryText");

const difficultySelect =
document.getElementById("difficulty");

let min = 1;
let max = 100;

let randomNumber =
generateRandom();

let attempts = 0;

let bestScore =
localStorage.getItem("bestGuess")
|| 0;

bestScoreDisplay.textContent =
bestScore;

function generateRandom(){

    return Math.floor(
        Math.random()
        *
        (max - min + 1)
    ) + min;

}

function updateDifficulty(){

    const difficulty =
    difficultySelect.value;

    if(difficulty === "easy"){

        min = 1;
        max = 50;

    }

    if(difficulty === "medium"){

        min = 1;
        max = 100;

    }

    if(difficulty === "hard"){

        min = 1;
        max = 500;

    }

    document.getElementById("min")
    .textContent = min;

    document.getElementById("max")
    .textContent = max;

    restartGame();

}

difficultySelect.addEventListener(
    "change",
    updateDifficulty
);

function checkGuess(){

    const guess =
    Number(guessInput.value);

    if(!guess){

        message.textContent =
        "Digite um número!";

        return;
    }

    attempts++;

    attemptsDisplay.textContent =
    attempts;

    if(guess < randomNumber){

        message.textContent =
        "O número é maior!";

    }else if(guess > randomNumber){

        message.textContent =
        "O número é menor!";

    }else{

        message.textContent =
        "Você acertou!";

        guessInput.disabled = true;

        if(currentPlayer === 1){

            player1Attempts = attempts;

            player1Finished = true;

        }else{

            player2Attempts = attempts;

            player2Finished = true;

        }

        setTimeout(() => {

            nextPlayer();

        }, 1500);

    }

}

function restartGame(){

    randomNumber =
    generateRandom();

    attempts = 0;

    attemptsDisplay.textContent =
    0;

    message.textContent =
    "Novo jogo iniciado!";

    guessInput.value = "";

    guessInput.disabled = false;

}

function closeVictory(){

    victoryScreen.style.display =
    "none";

    restartGame();

}

function startPlayers(){

    const p1 =
    document.getElementById("player1Name");

    const p2 =
    document.getElementById("player2Name");

    if(
        p1.value.trim() === ""
        ||
        p2.value.trim() === ""
    ){

        alert("Digite os nomes");

        return;
    }

    player1 = p1.value;

    player2 = p2.value;

    document.getElementById(
        "registerScreen"
    ).style.display = "none";

    updateTurn();

}

function updateTurn(){

    const currentName =

    currentPlayer === 1

    ? player1

    : player2;

    document.getElementById(
        "playerTurn"
    ).textContent =

    "Vez de: " + currentName;

}

function nextPlayer(){

    if(currentPlayer === 1){

        currentPlayer = 2;

        restartRound();

        updateTurn();

        return;

    }

    showWinner();

}

function restartRound(){

    randomNumber =
    generateRandom();

    attempts = 0;

    attemptsDisplay.textContent =
    0;

    guessInput.value = "";

    guessInput.disabled = false;

    message.textContent =
    "Novo turno iniciado!";

}

function showWinner(){

    const winnerScreen =
    document.getElementById(
        "winnerScreen"
    );

    const winnerTitle =
    document.getElementById(
        "winnerTitle"
    );

    const winnerMessage =
    document.getElementById(
        "winnerMessage"
    );

    let winner = "";

    if(player1Attempts < player2Attempts){

        winner = player1;

    }else if(player2Attempts < player1Attempts){

        winner = player2;

    }else{

        winner = "Empate";

    }

    winnerTitle.textContent =

    winner === "Empate"

    ? "Empate!"

    : winner + " venceu!";

    winnerMessage.textContent =

    player1
    +
    ": "
    +
    player1Attempts
    +
    " tentativas | "
    +
    player2
    +
    ": "
    +
    player2Attempts
    +
    " tentativas";

    winnerScreen.style.display =
    "flex";

}

function restartMultiplayer(){

    location.reload();

}


function goHome(){

    window.location.href = "../index.html";

}