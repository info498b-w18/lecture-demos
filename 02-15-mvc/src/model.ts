//differentiates between players (Player[' '] is "none")
export enum Player {X = 0, O = 1, ' ' = ' '}

export interface Subject {
  register(obs:Observer);
  unregister(obs:Observer);
  notifyAll();
}

export interface Observer {
  notify();
}

/**
 * Represents a game of Tic Tac Toe.
 * Board size is hard-coded at 3.
 */
export class TTTGame {
  private gameBoard:Player[][];
  private currentPlayer:Player = Player.X;
  private winner:Player = Player[' '];
  public readonly size = 3; //hard-coded for simplicity

  constructor() {
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
  makeMove(x:number, y:number):boolean{ 
    if(this.winner !== Player[' ']) return false; //don't move if won
    if(x <0 || x > 2 || y < 0 || y > 2) return false; //out of bounds
    if(this.gameBoard[x][y] !== Player[' ']) return false; //don't move if occupied

    this.gameBoard[x][y] = this.currentPlayer; //make move

    //check if we now have a winner
    let gb = this.gameBoard;

    //check row
    if(gb[x][0] === gb[x][1] && gb[x][1] === gb[x][2]) this.winner = this.currentPlayer;
    
    //check col
    if(gb[0][y] === gb[1][y] && gb[1][y] === gb[2][y]) this.winner = this.currentPlayer;

     //check diag
    if( gb[1][1] !== Player[' '] && (
        (gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) || 
        (gb[2][0] === gb[1][1] && gb[1][1] === gb[0][2]) )) 
      this.winner = this.currentPlayer

    this.currentPlayer = (Number(this.currentPlayer)+1) % 2; //toggle

    this.notifyAll();
        
    return true; //valid move
  }

  getPiece(x:number, y:number):Player{
    if(x <0 || x > 2 || y < 0 || y > 2) return Player[' ']; //out of bounds
    return this.gameBoard[x][y];
  }

  getBoard() {
    return this.gameBoard;
  }
  
  getCurrentPlayer():Player {
    return this.currentPlayer;
  }

  getWinner():Player {
    return this.winner;
  }


  /* Subject methods */
  private observers:Observer[] = [];

  register(obs:Observer) {
    this.observers.push(obs);
  }

  unregister(obs:Observer) {
    let index = this.observers.indexOf(obs);
    this.observers.splice(index,1);
  }

  notifyAll() {
    this.observers.forEach((obs) => obs.notify());
  }
}
