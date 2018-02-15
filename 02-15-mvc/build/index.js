"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
class View {
    constructor(game) {
        this.game = game;
    }
    display() {
        console.log("displaying...");
        let gamebox = $('#game-box');
        gamebox.empty(); //clear old display
        // make grid of buttons
        for (let i = 0; i < this.game.size; i++) {
            let row = $('<div>'); //a row for the button
            for (let j = 0; j < this.game.size; j++) {
                let button = $('<button class="btn btn-outline-secondary">' + app_1.Player[this.game.getPiece(i, j)] + '</button>');
                button.click((e) => this.handleClick(i, j));
                row.append(button);
            }
            gamebox.append(row);
        }
        //show winner, if any
        let winner = this.game.getWinner();
        if (winner !== app_1.Player[' ']) {
            this.showWinner(winner);
            $('button').attr('disabled', 'disabled');
        }
        else {
            this.showPrompt();
        }
    }
    //callback for clicking
    handleClick(row, col) {
        // ???
    }
    showPrompt() {
        $('#message').html('<p class="lead">' + app_1.Player[this.game.getCurrentPlayer()] + "'s turn. Pick a spot!" + '</p>');
    }
    showWinner(winner) {
        $('#message').html('<p class="lead">' + app_1.Player[winner] + " is the winner!" + '</p>');
    }
}
//# sourceMappingURL=index.js.map