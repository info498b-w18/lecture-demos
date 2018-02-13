import { IQuacker as Quacker } from './quackers'; //general class
import * as Quackers from './quackers'; //subclasses

class DuckSymphony {
  private quackers:Quacker[] = [];

  constructor() {
    this.quackers.push( new Quackers.MallardDuck() );
    this.quackers.push( new Quackers.RedheadDuck() );
    this.quackers.push( new Quackers.RubberDuck() );
    this.quackers.push( new Quackers.DuckCall() ); 
  
  }

  perform() {
    console.log('"Rock Out Ducks!"');

    //all quackers sing
    for(let quacker of this.quackers){
      quacker.quack();
    }
  }
}

let symphony = new DuckSymphony();
symphony.perform();