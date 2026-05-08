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

    score += 50;

    roundDisplay.textContent =
    round.toString().padStart(2,"0");

    scoreDisplay.textContent =
    score;

    message.textContent =
    "Observe a sequência";

    const randomColor =
    colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];

    gameSequence.push(randomColor);

    showSequence();

}

function showSequence(){

    let delay = 0;

    gameSequence.forEach(color => {

        setTimeout(() => {

            flashColor(color);

            playSound(color);

        }, delay);

        delay += 700;

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

    document.getElementById("gameOver")
    .style.display = "flex";

    document.getElementById("finalScore")
    .textContent = score;

    if(score > bestScore){

        bestScore = score;

        localStorage.setItem(
            "bestScore",
            bestScore
        );

        document.getElementById("bestScore")
        .textContent = bestScore;
    }

    saveRanking();

}

function restartGame(){

    document.getElementById("gameOver")
    .style.display = "none";

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

    let ranking =
    JSON.parse(
        localStorage.getItem("ranking")
    ) || [];

    ranking.push({

        name: playerName,
        points: score

    });

    ranking.sort((a,b) => b.points - a.points);

    ranking = ranking.slice(0,5);

    localStorage.setItem(
        "ranking",
        JSON.stringify(ranking)
    );

    loadRanking();

}

function loadRanking(){

    const ranking =
    JSON.parse(
        localStorage.getItem("ranking")
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

        ` ;

    });

}

let bestScore =
localStorage.getItem("bestScore") || 0;

document.getElementById("bestScore")
.textContent = bestScore;