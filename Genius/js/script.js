let player1 = "";

let player2 = "";

let currentPlayer = 1;

let player1Score = 0;

let player2Score = 0;

let difficulty = "medium";

const difficultySelect =
document.getElementById("difficulty");

difficultySelect.addEventListener(
    "change",
    () => {

        difficulty =
        difficultySelect.value;

        loadRanking();

    }
);

let gameStarted = false;
let playerName = "";

loadRanking();

function savePlayer(){
    
    const input =
    document.getElementById("playerName");
    
    if(input.value.trim() === ""){
        
        alert("Digite um nome");
        
        return;
    }
    
    playerName = input.value;
    
    document.getElementById(
        "registerScreen"
    ).style.display = "none";
    
}


const colors = ["green", "red", "yellow", "blue"];

let gameSequence = [];
let playerSequence = [];

let round = 0;
let score = 0;

const roundDisplay =
document.getElementById("round");

const scoreDisplay =
document.getElementById("score");

const message =
document.getElementById("message");

const startBtn =
document.getElementById("startBtn");

startBtn.addEventListener(
    "click",
    startGame
);

colors.forEach(color => {

    const button =
    document.getElementById(color);

    button.addEventListener("click", () => {

        playerClick(color);

    });

});

function startGame(){

    difficulty = difficultySelect.value;

    gameStarted = true;

    document.getElementById("dicaCard")
    .classList.add("hide-ui");

    document.getElementById("recordCard")
    .classList.add("hide-ui");

    document.getElementById("rankingCard")
    .classList.add("hide-ui");

    document.querySelector(".genius-board")
    .classList.add("board-active");

    gameSequence = [];
    playerSequence = [];

    round = 0;
    score = 0;

    nextRound();

}

function nextRound(){

    playerSequence = [];

    round++;

    if(round > 1){

        score += 50;

    }

    roundDisplay.textContent =
    round.toString().padStart(2,"0");

    scoreDisplay.textContent =
    score;

    message.textContent =
    "Observe a sequência";

    let availableColors = [...colors];

    if(difficulty === "easy"){

    availableColors =
    ["green","red","yellow"];

    document.getElementById("blue")
    .style.display = "none";

}else{

    document.getElementById("blue")
    .style.display = "block";

}

    const randomColor =
    availableColors[
        Math.floor(
            Math.random()
            *
            availableColors.length
        )
    ];

    gameSequence.push(randomColor);

    localStorage.setItem(
    "multiplayerSequence",
    JSON.stringify(gameSequence)
);

    showSequence();

}

function showSequence(){

    let delay = 0;

    let speed = 700;

    if(difficulty === "easy"){

        speed = 1200;

    }

    if(difficulty === "hard"){

        speed = 500;

    }

    gameSequence.forEach(color => {

        setTimeout(() => {

            if(difficulty !== "hard"){

                flashColor(color);

            }

            playSound(color);

        }, delay);

        delay += speed;

    });

}

function flashColor(color){

    const element =
    document.getElementById(color);

    element.classList.add("active");

    setTimeout(() => {

        element.classList.remove("active");

    }, 350);

}

function playerClick(color){

    if(!gameStarted) return;

    playerSequence.push(color);

    flashColor(color);

    playSound(color);

    checkAnswer();

}

function checkAnswer(){

    const currentIndex =
    playerSequence.length - 1;

    if(
        playerSequence[currentIndex]
        !==
        gameSequence[currentIndex]
    ){

        gameOver();

        return;
    }

    if(
        playerSequence.length
        ===
        gameSequence.length
    ){

        message.textContent =
        "Você acertou!";

        setTimeout(() => {

            nextRound();

        }, 1000);

    }

}

function gameOver(){

    gameStarted = false;

    document.getElementById("gameOver")
    .style.display = "flex";

    document.getElementById("finalScore")
    .textContent = score;

    if(currentPlayer === 1){

        player1Score = score;

    }else{

        player2Score = score;

    }

    saveRanking();

    if(currentPlayer === 1){

        currentPlayer = 2;

        score = 0;

        round = 0;

        message.textContent =

        "Agora é a vez do Jogador 2";

    }else{

        message.textContent =

        "Os dois jogadores terminaram";

    }

    updateCurrentPlayer();

}

function restartGame(){

    document.getElementById("gameOver")
    .style.display = "none";

    gameStarted = true;

    gameSequence = [];

    playerSequence = [];

    round = 0;

    score = 0;

    nextRound();

}

function stopGame(){

    gameStarted = false;

    document.getElementById("dicaCard")
    .classList.add("hide-ui");

    document.getElementById("recordCard")
    .classList.remove("hide-ui");

    document.getElementById("rankingCard")
    .classList.remove("hide-ui");

    document.querySelector(".genius-board")
    .classList.remove("board-active");

    document.getElementById("gameOver")
    .style.display = "none";

    message.textContent =
    "Obrigado por jogar!";

    roundDisplay.textContent = "00";

    scoreDisplay.textContent = "0";

    gameSequence = [];
    playerSequence = [];

    round = 0;
    score = 0;

}

function playSound(color){

    const audio = new Audio();

    switch(color){

        case "green":
            audio.src =
            "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
            break;

        case "red":
            audio.src =
            "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
            break;

        case "yellow":
            audio.src =
            "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
            break;

        case "blue":
            audio.src =
            "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
            break;
    }

    audio.play();

}

function saveRanking(){

    const rankingKey =

    "ranking_" + difficulty;

    let ranking =

    JSON.parse(
        localStorage.getItem(rankingKey)
    ) || [];

    const currentName =

    currentPlayer === 1

    ? player1

    : player2;

    ranking.push({

        name: currentName,

        points: score

    });

    ranking.sort((a,b) => b.points - a.points);

    ranking = ranking.slice(0,10);

    localStorage.setItem(

        rankingKey,

        JSON.stringify(ranking)

    );

    loadRanking();

}

function loadRanking(){

    const rankingKey =
    "ranking_" + difficulty;

    const ranking =
    JSON.parse(
        localStorage.getItem(rankingKey)
    ) || [];

    const rankingList =
    document.getElementById("rankingList");

    if(!rankingList) return;

    rankingList.innerHTML = "";

    ranking.forEach(player => {

        rankingList.innerHTML += `

            <div class="ranking-item">

                <p>${player.name}</p>

                <span>${player.points}</span>

            </div>

        `;

    });

}

let bestScore =
localStorage.getItem("bestScore") || 0;

document.getElementById("bestScore")
.textContent = bestScore;

document.getElementById("openPlayer2")
.addEventListener("click", () => {

    window.open(
        "player2.html",
        "_blank"
    );

});

function savePlayers(){

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
        "playersRegister"
    ).style.display = "none";

    updateCurrentPlayer();

}

function updateCurrentPlayer(){

    const playerText =

    currentPlayer === 1

    ? player1

    : player2;

    document.getElementById(
        "currentPlayer"
    ).textContent =

    "Vez de: " + playerText;

}

const BotaoVoltar = document.querySelector(".Voltar");

BotaoVoltar.addEventListener("click", function(){
    window.location.href = "../index.html";
});


function goHome(){

    window.location.href = "../index.html";

}