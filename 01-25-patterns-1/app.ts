import { Duck } from './ducks'; //general class
import * as Ducks from './ducks'; //subclasses

//make some ducks
let mallard = new Ducks.MallardDuck(); //example
let ducks:Duck[] = [];
ducks.push(mallard);
ducks.push(new Ducks.RedheadDuck());
ducks.push(new Ducks.TealDuck());

//have them all act!
ducks.forEach( (duck:Duck) => {
  console.log(duck.display());
  duck.quack();
});