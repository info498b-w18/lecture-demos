export interface IQuacker {
    quack(): void;
}

export class MallardDuck implements IQuacker {
    quack() {
        console.log('Quack!');
    }
}

export class RedheadDuck implements IQuacker {
    quack() {
        console.log('(quack)'); //quieter
    }
}

export class RubberDuck implements IQuacker {
    quack() {
        console.log('Sqeak');
    }
}


export class DuckCall implements IQuacker {
    quack() {
        console.log('Kwak');
    }
}

export class Goose { //NOT a Quacker
    honk() {
        console.log('HOOONK');
    }
}

//CHANGE 1: add an adapter
export class GooseAdapter implements IQuacker {
    constructor(private goose:Goose){}
    
    quack() {
      this.goose.honk();
    }
}

//CHANGE 2: add a decorator
export class QuackCounter implements IQuacker {
    private static numberQuacks = 0;

    constructor(private quacker:IQuacker) {}
  
    quack(){
        this.quacker.quack();
        QuackCounter.numberQuacks++; //count the quack
    }
  
    static getCount():number{
        return QuackCounter.numberQuacks;
    }  
}

//CHANGE 3: use a factory
export interface IQuackerFactory {
    createMallardDuck():IQuacker;
    createRedheadDuck():IQuacker;
    createDuckCall():IQuacker;
    createRubberDuck():IQuacker;
}

export class CountingDuckFactory implements IQuackerFactory {
    createMallardDuck() {
        return new QuackCounter(new MallardDuck());
    }

    createRedheadDuck() {
        return new QuackCounter(new RedheadDuck());
    }

    createDuckCall() {
        return new QuackCounter(new DuckCall());
    }

    createRubberDuck() {
        return new QuackCounter(new RubberDuck());
    }
}

//CHANGE 4: specify a flock
export class Flock implements IQuacker, Subject {
    private quackers: IQuacker[] = [];
    private observers:Observer[] = [];

    add(quacker: IQuacker) {
        this.quackers.push(quacker);
    }

    quack() { //there's that quack method!
        for (let quacker of this.quackers) {
            quacker.quack();
        }
        this.notifyAll();
    }

    registerObserver(observer:Observer):void {
        this.observers.push(observer);
    }

    notifyAll():void {
        for(let observer of this.observers){
            observer.update();
        }
    }
}

//CHANGE 5: add observers
interface Subject {
    registerObserver(observer:Observer):void;
    notifyAll():void;
}

interface Observer {
    //update about who quacked
    update():void
}

export class DuckFan implements Observer {
    update(){
        console.log('A fan just heard their favorite. SQUEEEEEEEE!!!');
    }
}

export class ObservableDecorator implements Subject, IQuacker {
    private observers:Observer[] = [];

    constructor(private observed:IQuacker){}

    registerObserver(observer:Observer):void {
        this.observers.push(observer);
    }

    notifyAll():void {
        for(let observer of this.observers){
            observer.update();
        }
    }

    quack():void {
        this.observed.quack(); //delegate
        this.notifyAll(); //notify
    }
}