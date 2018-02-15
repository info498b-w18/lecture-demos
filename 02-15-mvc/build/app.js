"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//for CLI interactiv
const readline = require('readline');
const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//differentiates between players (Player[' '] is "none")
var Player;
(function (Player) {
    Player[Player["X"] = 0] = "X";
    Player[Player["O"] = 1] = "O";
    Player[" "] = " ";
})(Player || (Player = {}));
/**
 * Represents a game of Tic Tac Toe.
 * Board size is hard-coded at 3.
 */
class TTTGame {
    constructor() {
        this.currentPlayer = Player.X;
        this.winner = Player[' '];
        this.size = 3; //hard-coded for simplicity
        this.resetBoard(); //initialize board
    }
    resetBoard() {
        this.gameBoard = [
            [Player[' '], Player[' '], Player[' ']],
            [Player[' '], Player[' '], Player[' ']],
            [Player[' '], Player[' '], Player[' ']],
        ];
    }
    //returns if sucessful or not
    makeMove(x, y) {
        if (this.winner !== Player[' '])
            return false; //don't move if won
        if (x < 0 || x > 2 || y < 0 || y > 2)
            return false; //out of bounds
        if (this.gameBoard[x][y] !== Player[' '])
            return false; //don't move if occupied
        this.gameBoard[x][y] = this.currentPlayer; //make move
        //check if we now have a winner
        let gb = this.gameBoard;
        console.log(x, y, gb);
        //check row
        if (gb[x][0] === gb[x][1] && gb[x][1] === gb[x][2])
            this.winner = this.currentPlayer;
        console.log('row', gb[x][0], gb[x][1], gb[x][2], gb[x][0] === gb[x][1], Player[this.winner]);
        //check col
        if (gb[0][y] === gb[1][y] && gb[1][y] === gb[2][y])
            this.winner = this.currentPlayer;
        console.log('col', Player[this.winner]);
        //check diag
        if (gb[1][1] !== Player[' '] && ((gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) ||
            (gb[2][0] === gb[1][1] && gb[1][1] === gb[0][2])))
            this.winner = this.currentPlayer;
        console.log('diag', Player[this.winner]);
        console.log('before toggle', Number(this.currentPlayer));
        this.currentPlayer = (Number(this.currentPlayer) + 1) % 2; //toggle
        console.log('after toggle', this.currentPlayer);
        return true;
    }
    getPiece(x, y) {
        if (x < 0 || x > 2 || y < 0 || y > 2)
            return Player[' ']; //out of bounds
        return this.gameBoard[x][y];
    }
    getBoard() {
        return this.gameBoard;
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    getWinner() {
        return this.winner;
    }
    //starts the game
    play() {
        this.printBoard();
        this.takeTurn();
    }
    takeTurn() {
        this.printPrompt();
        io.question('> ', (input) => {
            try {
                let cell = input.split(',');
                //make a move!
                let result = this.makeMove(Number(cell[0]), Number(cell[1]));
                if (result) {
                    this.printBoard();
                    if (this.getWinner() !== Player[' ']) {
                        this.printWinner(this.getWinner());
                        io.close();
                        return; //end
                    }
                }
            }
            catch (e) { } //for parsing errors
            this.takeTurn(); //recurse!
        });
    }
    printBoard() {
        //print the board
        console.log("    0   1   2");
        for (let i = 0; i < this.size; i++) {
            let row = i + "   ";
            for (let j = 0; j < this.size; j++) {
                let player = this.getPiece(i, j);
                // if(player === undefined) player = -1;
                // row += this.playerSymbols[player+1];
                row += Player[player];
                if (j < this.size - 1)
                    row += " | ";
            }
            console.log(row);
            if (i < this.size - 1)
                console.log("   -----------");
        }
        console.log("");
    }
    printPrompt() {
        let player = game.getCurrentPlayer();
        console.log(Player[player] + "'s turn. Pick a spot [row, col]");
    }
    printWinner(winner) {
        //let player = this.playerSymbols[winner+1]
        console.log(Player[winner] + " is the winner!");
    }
}
exports.TTTGame = TTTGame;
let game = new TTTGame();
game.play();
//# sourceMappingURL=app.js.map