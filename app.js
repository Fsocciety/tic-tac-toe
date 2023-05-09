const gameBoard = (() => {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = '';
        gameboard.forEach((item, index) => {
            boardHTML += `<div class="item" id="box-${index}">${item}</div>`;
        });
        document.querySelector('.gameboard').innerHTML = boardHTML;
        const items = document.querySelectorAll(".item");
        items.forEach((e) => {
            e.addEventListener("click", Game.handleClick);
        });
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameboard = () => gameboard;


    return {
        render,
        update,
        getGameboard,
    };
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;
    
    const start = () => {
        players = [
            createPlayer(document.querySelector(".player1").value, 'X'),
            createPlayer(document.querySelector(".player2").value, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.render();
        const items = document.querySelectorAll(".item");
        items.forEach((e) => {
            e.addEventListener("click", Game.handleClick);
        });
    }

    const handleClick = (event) => {
        let index = (event.target.id.split("-")[1]);
        
        if (gameBoard.getGameboard()[index] !== "")
            return;

        gameBoard.update(index, players[currentPlayerIndex].mark);

        if (checkForWin(gameBoard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            alert(`${players[currentPlayerIndex].name} won!`);
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            gameBoard.update(i, "");
        }
        gameBoard.render();
    }

    return {
      start,
      handleClick,
    };
})();

function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};


const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
    Game.restart();
})


const start = document.querySelector('.start');
start.addEventListener('click', () => {
    Game.start();
})