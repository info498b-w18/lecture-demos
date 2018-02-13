import { IQuacker as Quacker, QuackCounter, ObservableDecorator } from './quackers'; //general class
import * as Quackers from './quackers'; //subclasses

class DuckSymphony {
  private flock:Quackers.Flock;
  private mallardFlock:Quackers.Flock;

  constructor(factory:Quackers.IQuackerFactory) {
    //change 4
    this.flock = new Quackers.Flock();
    this.flock.add( factory.createRedheadDuck() );
    this.flock.add( factory.createDuckCall() );
    //this.flock.add( factory.createRubberDuck() );

    let rubberDuck = new Quackers.ObservableDecorator(factory.createRubberDuck());
    this.flock.add(rubberDuck);

    //change 1
    let goose = new Quackers.GooseAdapter(new Quackers.Goose()); //add the goose
    this.flock.add(goose);

    //change 3
    this.mallardFlock = new Quackers.Flock();
    this.mallardFlock.add( factory.createMallardDuck() )
    this.mallardFlock.add( factory.createMallardDuck() )
    this.mallardFlock.add( factory.createMallardDuck() )
    this.mallardFlock.add( factory.createMallardDuck() )
    this.flock.add( this.mallardFlock ); //flock of flocks!

    //change 5
    let fan = new Quackers.DuckFan(); //create the fan
    rubberDuck.registerObserver(fan); //listen to the idol
  
    let mallardFan = new Quackers.DuckFan();
    this.mallardFlock.registerObserver(mallardFan);  
  }

  perform() {
    console.log('"Rock Out Ducks!"');
    this.flock.quack();

    console.log('"Mallard Family Solo!"');
    this.mallardFlock.quack(); //type issues here with change 5

    //change 2
    console.log('Total quacks: '+Quackers.QuackCounter.getCount()); //show count
  }
}

//change 3
let factory = new Quackers.CountingDuckFactory();
let symphony = new DuckSymphony(factory);
symphony.perform();