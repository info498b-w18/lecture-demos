import {TTTGame as Game, Player} from "./app"; //FIX ME!!

class View {
  constructor(private game:Game){}

  display() {
    console.log("displaying...");

    let gamebox = $('#game-box');
    gamebox.empty(); //clear old display

    // make grid of buttons
    for(let i=0; i<this.game.size; i++){ //row
      let row = $('<div>'); //a row for the button
      for(let j=0; j<this.game.size; j++) {
        let button = $('<button class="btn btn-outline-secondary">'+Player[this.game.getPiece(i,j)]+'</button>')
        button.click((e) => this.handleClick(i,j));
        row.append(button);
      }
      gamebox.append(row);
    }

    //show winner, if any
    let winner = this.game.getWinner();
    if(winner !== Player[' ']){
      this.showWinner(winner)
      $('button').attr('disabled','disabled');
    }
    else {
      this.showPrompt();
    }
  }

  //callback for clicking
  handleClick(row, col) {
    // ???
  }

  showPrompt():void {
    $('#message').html('<p class="lead">'+Player[this.game.getCurrentPlayer()]+"'s turn. Pick a spot!"+'</p>')
  }

  showWinner(winner:number):void {
    $('#message').html('<p class="lead">'+Player[winner]+" is the winner!"+'</p>')
  }
}
