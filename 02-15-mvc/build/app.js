"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
//for CLI interactiv
const readline = require('readline');
const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
    }
    start() {
        this.view.display();
        this.takeTurn();
    }
    takeTurn() {
        this.view.showPrompt();
        io.question('> ', (input) => {
            try {
                let cell = input.split(',');
                let result = game.makeMove(Number(cell[0]), Number(cell[1]));
                if (result) {
                    this.view.display();
                    if (game.getWinner() !== model_1.Player[' ']) {
                        this.view.showWinner(game.getWinner());
                        io.close();
                        return; //end
                    }
                }
            }
            catch (e) { } //for parsing errors
            this.takeTurn(); //recurse!
        });
    }
}
class View {
    constructor(game) {
        this.game = game;
    }
    //draw the game board
    display() {
        console.log("    0   1   2");
        for (let i = 0; i < this.game.size; i++) {
            let row = i + "   ";
            for (let j = 0; j < this.game.size; j++) {
                row += model_1.Player[this.game.getPiece(i, j)];
                if (j < this.game.size - 1)
                    row += " | ";
            }
            console.log(row);
            if (i < this.game.size - 1)
                console.log("   -----------");
        }
        console.log("");
    }
    showPrompt() {
        console.log(model_1.Player[game.getCurrentPlayer()] + "'s turn. Pick a spot [row, col]");
    }
    showWinner(winner) {
        console.log(model_1.Player[winner] + " is the winner!");
    }
}
//run the program!
let game = new model_1.TTTGame();
let view = new View(game);
let ctrl = new Controller(game, view);
ctrl.start();
//# sourceMappingURL=app.js.map