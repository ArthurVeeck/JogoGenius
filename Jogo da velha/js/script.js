const cells =
document.querySelectorAll(".cell");

const turnText =
document.getElementById("turnText");

const winnerScreen =
document.getElementById("winnerScreen");

const winnerText =
document.getElementById("winnerText");

let board = [

    "","","",
    "","","",
    "","",""

];

let currentPlayer = "X";

let gameOver = false;

let playerX = "";
let playerO = "";

let ranking =
JSON.parse(
    localStorage.getItem("velhaRanking")
) || [];

const wins = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

function startGame(){

    playerX =
    document.getElementById("player1").value;

    playerO =
    document.getElementById("player2").value;

    if(
        playerX.trim() === ""
        ||
        playerO.trim() === ""
    ){

        alert("Digite os nomes");

        return;
    }

    document.getElementById(
        "registerScreen"
    ).style.display = "none";

    updateTurn();

}

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        const index =
        cell.dataset.index;

        if(
            board[index] !== ""
            ||
            gameOver
        ) return;

        board[index] =
        currentPlayer;

        cell.textContent =
        currentPlayer;

        checkWinner();

        currentPlayer =
        currentPlayer === "X"
        ? "O"
        : "X";

        updateTurn();

    });

});

function updateTurn(){

    const playerName =

    currentPlayer === "X"

    ? playerX

    : playerO;

    turnText.textContent =

    "Vez de: " + playerName;

}

function checkWinner(){

    wins.forEach(win => {

        const [a,b,c] = win;

        if(
            board[a]
            &&
            board[a] === board[b]
            &&
            board[a] === board[c]
        ){

            gameOver = true;

            const winner =

            board[a] === "X"

            ? playerX

            : playerO;

            winnerText.textContent =

            winner + " venceu!";

            winnerScreen.style.display =
            "flex";

            saveRanking(winner);

        }

    });

    if(!gameOver && checkDraw()){

    gameOver = true;

    winnerText.textContent =

    "Deu velha!";

    winnerScreen.style.display =

    "flex";

}
}

function saveRanking(player){

    let existingPlayer =
    ranking.find(
        p => p.name === player
    );

    if(existingPlayer){

        existingPlayer.points += 1;

    }else{

        ranking.push({

            name: player,

            points: 1

        });

    }

    ranking.sort(
        (a,b) => b.points - a.points
    );

    localStorage.setItem(

        "velhaRanking",

        JSON.stringify(ranking)

    );

    loadRanking();

}

function loadRanking(){

    const rankingList =
    document.getElementById("rankingList");

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

function restartGame(){

    board = [

        "","","",
        "","","",
        "","",""

    ];

    currentPlayer = "X";

    gameOver = false;

    cells.forEach(cell => {

        cell.textContent = "";

    });

    updateTurn();

}

function closeWinner(){

    winnerScreen.style.display =
    "none";

    restartGame();

}

loadRanking();

function checkDraw(){

    return board.every(cell => cell !== "");

}