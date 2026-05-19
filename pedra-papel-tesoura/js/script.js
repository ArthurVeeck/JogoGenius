let player1 = "";

let player2 = "";

let currentPlayer = 1;

let player1Choice = "";

let player2Choice = "";

let score1 =
Number(
    localStorage.getItem("pptScore1")
) || 0;

let score2 =
Number(
    localStorage.getItem("pptScore2")
) || 0;

let maxWins = 3;

document.getElementById("score1")
.textContent = score1;

document.getElementById("score2")
.textContent = score2;

function startGame(){

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

    maxWins =
    Number(
        document.getElementById(
            "gameMode"
        ).value
    );

    document.getElementById(
        "player1Text"
    ).textContent = player1;

    document.getElementById(
        "player2Text"
    ).textContent = player2;

    document.getElementById(
        "registerScreen"
    ).style.display = "none";

    updateTurn();

}

function updateTurn(){

    document.getElementById(
        "turnText"
    ).textContent =

    currentPlayer === 1

    ? "Vez de " + player1

    : "Vez de " + player2;

}

function choose(choice){

    animateChoice();

    if(currentPlayer === 1){

        player1Choice = choice;

        currentPlayer = 2;

        document.getElementById(
            "result"
        ).textContent =

        player1
        +
        " escolheu!";

        updateTurn();

        return;
    }

    player2Choice = choice;

    checkWinner();

}

function checkWinner(){

    const result =
    document.getElementById("result");

    if(player1Choice === player2Choice){

        result.textContent =
        "Empate!";

    }

    else if(

        (
            player1Choice === "pedra"
            &&
            player2Choice === "tesoura"
        )

        ||

        (
            player1Choice === "papel"
            &&
            player2Choice === "pedra"
        )

        ||

        (
            player1Choice === "tesoura"
            &&
            player2Choice === "papel"
        )

    ){

        result.textContent =
        player1 + " venceu a rodada!";

        score1++;

    }

    else{

        result.textContent =
        player2 + " venceu a rodada!";

        score2++;

    }

    updateScore();

    currentPlayer = 1;

    updateTurn();

    player1Choice = "";
    player2Choice = "";

    checkFinalWinner();

}

function updateScore(){

    document.getElementById("score1")
    .textContent = score1;

    document.getElementById("score2")
    .textContent = score2;

    localStorage.setItem(
        "pptScore1",
        score1
    );

    localStorage.setItem(
        "pptScore2",
        score2
    );

}

function checkFinalWinner(){

    if(score1 >= maxWins){

        showWinner(player1);

    }

    if(score2 >= maxWins){

        showWinner(player2);

    }

}

function showWinner(player){

    document.getElementById(
        "winnerScreen"
    ).style.display = "flex";

    document.getElementById(
        "winnerText"
    ).textContent =

    player + " venceu o jogo!";

}

function restartGame(){

    location.reload();

}

function resetScore(){

    score1 = 0;

    score2 = 0;

    updateScore();

    document.getElementById(
        "result"
    ).textContent =

    "Placar reiniciado!";

}

function animateChoice(){

    const buttons =
    document.querySelectorAll(".choice");

    buttons.forEach(button => {

        button.classList.add("active");

        setTimeout(() => {

            button.classList.remove(
                "active"
            );

        }, 250);

    });

}

function goHome(){

    window.location.href = "../index.html";

}