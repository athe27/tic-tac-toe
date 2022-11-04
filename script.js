const squares = document.querySelector(".container").children;
const resultText = document.querySelector(".result")

const gameBoard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    let player1Turn = true;
    let gameOver = false;

    const startGame = function() {
        this.player1 = player(false);
        this.player2 = player(true);

        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener("click", () => {
                const x = i % 3;
                const y = Math.floor(i / 3);
                this.player1.selectMove([x, y]);
            })
        }

        this.player1Turn = true;
    }

    const verifyMove = function(point) {
        console.log(point)
        if (this.board[point[1]][point[0]] === "") {
            return true;
        }
        return false;
    };

    const checkForWin = function() {
        let won = false
        if (this.board[0][0] !== "" && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
            // Diagonal win
            won = true
        }

        if (this.board[0][2] !== "" && this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
            // Diagonal win
            won = true
        }

        for (let y = 0; y < this.board.length; y++) {
            if (this.board[y][0] !== "" && this.board[y][0] === this.board[y][1] && this.board[y][0] === this.board[y][2]) {
                // horizontal win
                won = true
            }
        }
        for (let x = 0; x < this.board[0].length; x++) {
            if (this.board[0][x] !== "" && this.board[0][x] === this.board[1][x] && this.board[0][x] === this.board[2][x]) {
                // vertical win
                won = true
            }
        }

        draw = true;
        for (let y = 0; y < gameBoard.board.length; y++) {
            for (let x = 0; x < gameBoard.board[y].length; x++) {
                if (gameBoard.board[y][x] === "") {
                    draw = false
                }
            }
        }

        if (won) {
            this.gameOver = true;
            if (!player1Turn) {
                return "You Won!"
            } else {
                return "You Lost!"
            }
        } else if (draw) {
            this.gameOver = true;
            return "You Drew!"
        }
    }

    const placeMarker = function(player, point) {
        if (!this.verifyMove(point) || this.gameOver) return;
        if (player === this.player1 && player1Turn) {
            this.board[point[1]][point[0]] = "X";
            player1Turn = false;
        } else if (player === this.player2 && !player1Turn) {
            this.board[point[1]][point[0]] = "O";
            player1Turn = true;
        }

        let winner = this.checkForWin()
        if (winner !== undefined) {
            resultText.innerHTML = winner;
        }
        if (!gameOver && !player1Turn) {
            this.player2.selectMove()
        }
        displayController.displayBoard()
    };

    return {gameOver, board, verifyMove, placeMarker, startGame, checkForWin};
})();

const displayController = (() => {
    const displayBoard = () => {
        for (let y = 0; y < gameBoard.board.length; y++) {
            for (let x = 0; x < gameBoard.board[y].length; x++) {
                squares.item(y * 3 + x).innerHTML = gameBoard.board[y][x];
            }
        }
    }

    return {displayBoard}
})();

const player = (isAI) => {
    let selectMove;
    if (isAI) {
        selectMove = function() {
            let AIMove = [Math.floor(Math.random()*3), Math.floor(Math.random()*3)];
            while (!gameBoard.verifyMove(AIMove)) {
                AIMove = [Math.floor(Math.random()*3), Math.floor(Math.random()*3)];
            }
            console.log(this)
            gameBoard.placeMarker(this, AIMove);
        }
    } else {
        selectMove = function(point) {
            gameBoard.placeMarker(this, point)
        }
    }

    return {selectMove};
}

gameBoard.startGame();

