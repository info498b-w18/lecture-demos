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
