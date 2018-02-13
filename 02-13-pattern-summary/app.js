"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quackers = require("./quackers"); //subclasses
var DuckSymphony = /** @class */ (function () {
    function DuckSymphony(factory) {
        //change 4
        this.flock = new Quackers.Flock();
        this.flock.add(factory.createRedheadDuck());
        this.flock.add(factory.createDuckCall());
        //this.flock.add( factory.createRubberDuck() );
        var rubberDuck = new Quackers.ObservableDecorator(factory.createRubberDuck());
        this.flock.add(rubberDuck);
        //change 1
        var goose = new Quackers.GooseAdapter(new Quackers.Goose()); //add the goose
        this.flock.add(goose);
        //change 3
        this.mallardFlock = new Quackers.Flock();
        this.mallardFlock.add(factory.createMallardDuck());
        this.mallardFlock.add(factory.createMallardDuck());
        this.mallardFlock.add(factory.createMallardDuck());
        this.mallardFlock.add(factory.createMallardDuck());
        this.flock.add(this.mallardFlock); //flock of flocks!
        //change 5
        var fan = new Quackers.DuckFan(); //create the fan
        rubberDuck.registerObserver(fan); //listen to the idol
        var mallardFan = new Quackers.DuckFan();
        this.mallardFlock.registerObserver(mallardFan);
    }
    DuckSymphony.prototype.perform = function () {
        console.log('"Rock Out Ducks!"');
        this.flock.quack();
        console.log('"Mallard Family Solo!"');
        this.mallardFlock.quack(); //type issues here with change 5
        //change 2
        console.log('Total quacks: ' + Quackers.QuackCounter.getCount()); //show count
    };
    return DuckSymphony;
}());
//change 3
var factory = new Quackers.CountingDuckFactory();
var symphony = new DuckSymphony(factory);
symphony.perform();
