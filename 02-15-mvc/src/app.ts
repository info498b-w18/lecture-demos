import {TTTGame as Game, Player} from "./model";

//for CLI interactiv
const readline = require('readline');
const io = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout
});


class Controller {
  constructor(private game:Game, private view:View){}

  start() {
    this.view.display();
    this.takeTurn();
  }

  takeTurn() {
    this.view.showPrompt();
    io.question('> ', (input) => {
      try {
        let cell = input.split(',');
        let result = game.makeMove(Number(cell[0]),Number(cell[1]));
        if(result){ //legal move
          this.view.display();          
          if(game.getWinner() !== Player[' ']){
            this.view.showWinner(game.getWinner());
            io.close()
            return; //end
          }
        }
      } catch(e) {} //for parsing errors

      this.takeTurn(); //recurse!
    })
  }
}

class View {
  constructor(private game:Game){}

  //draw the game board
  display() {
    console.log("    0   1   2")
    for(let i=0; i<this.game.size; i++) {
      let row = i+"   ";
      for(let j=0; j<this.game.size; j++) {
        row += Player[this.game.getPiece(i,j)];
        if(j < this.game.size - 1) 
          row += " | ";
      }
      console.log(row);
      if(i < this.game.size -1)
        console.log("   -----------");
    }
    console.log("");
  }

  showPrompt():void {
    console.log(Player[game.getCurrentPlayer()]+"'s turn. Pick a spot [row, col]");
  }

  showWinner(winner:Player):void {
    console.log(Player[winner]+" is the winner!");
  }
}


//run the program!
let game:Game = new Game();
let view:View = new View(game);
let ctrl:Controller = new Controller(game, view);
ctrl.start();