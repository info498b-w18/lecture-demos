export abstract class Duck {
    quack() {
        console.log("quack!");
    }

    swim(distance: number) {
        console.log("Swims the " + distance + "m duckstyle.")
    }

    abstract display(): string;
}


export class RedheadDuck extends Duck {
    display() {
        return "Looks like a RedHead";
    }
}


export class MallardDuck extends Duck {
    display() {
        return "Looks like a Mallard";
    }
}


export class TealDuck extends Duck {
    display() {
        return "Looks like a Teal";
    }
}


export class RubberDuck extends Duck {
    quack() {
        console.log('squeek!')
    }

    display() {
        return "A rubber ducky!"
    }
}