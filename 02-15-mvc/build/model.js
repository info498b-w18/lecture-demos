"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//differentiates between players (Player[' '] is "none")
var Player;
(function (Player) {
    Player[Player["X"] = 0] = "X";
    Player[Player["O"] = 1] = "O";
    Player[" "] = " ";
})(Player = exports.Player || (exports.Player = {}));
/**
 * Represents a game of Tic Tac Toe.
 * Board size is hard-coded at 3.
 */
class TTTGame {
    constructor() {
        this.currentPlayer = Player.X;
        this.winner = Player[' '];
        this.size = 3; //hard-coded for simplicity
        /* Subject methods */
        this.observers = [];
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
        //check row
        if (gb[x][0] === gb[x][1] && gb[x][1] === gb[x][2])
            this.winner = this.currentPlayer;
        //check col
        if (gb[0][y] === gb[1][y] && gb[1][y] === gb[2][y])
            this.winner = this.currentPlayer;
        //check diag
        if (gb[1][1] !== Player[' '] && ((gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) ||
            (gb[2][0] === gb[1][1] && gb[1][1] === gb[0][2])))
            this.winner = this.currentPlayer;
        this.currentPlayer = (Number(this.currentPlayer) + 1) % 2; //toggle
        return true; //valid move
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
    register(obs) {
        this.observers.push(obs);
    }
    unregister(obs) {
        let index = this.observers.indexOf(obs);
        this.observers.splice(index, 1);
    }
    notifyAll() {
        this.observers.forEach((obs) => obs.notify());
    }
}
exports.TTTGame = TTTGame;
//# sourceMappingURL=model.js.map