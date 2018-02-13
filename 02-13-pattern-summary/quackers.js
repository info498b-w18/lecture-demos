"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MallardDuck = /** @class */ (function () {
    function MallardDuck() {
    }
    MallardDuck.prototype.quack = function () {
        console.log('Quack!');
    };
    return MallardDuck;
}());
exports.MallardDuck = MallardDuck;
var RedheadDuck = /** @class */ (function () {
    function RedheadDuck() {
    }
    RedheadDuck.prototype.quack = function () {
        console.log('(quack)'); //quieter
    };
    return RedheadDuck;
}());
exports.RedheadDuck = RedheadDuck;
var RubberDuck = /** @class */ (function () {
    function RubberDuck() {
    }
    RubberDuck.prototype.quack = function () {
        console.log('Sqeak');
    };
    return RubberDuck;
}());
exports.RubberDuck = RubberDuck;
var DuckCall = /** @class */ (function () {
    function DuckCall() {
    }
    DuckCall.prototype.quack = function () {
        console.log('Kwak');
    };
    return DuckCall;
}());
exports.DuckCall = DuckCall;
var Goose = /** @class */ (function () {
    function Goose() {
    }
    Goose.prototype.honk = function () {
        console.log('HOOONK');
    };
    return Goose;
}());
exports.Goose = Goose;
//CHANGE 1: add an adapter
var GooseAdapter = /** @class */ (function () {
    function GooseAdapter(goose) {
        this.goose = goose;
    }
    GooseAdapter.prototype.quack = function () {
        this.goose.honk();
    };
    return GooseAdapter;
}());
exports.GooseAdapter = GooseAdapter;
//CHANGE 2: add a decorator
var QuackCounter = /** @class */ (function () {
    function QuackCounter(quacker) {
        this.quacker = quacker;
    }
    QuackCounter.prototype.quack = function () {
        this.quacker.quack();
        QuackCounter.numberQuacks++; //count the quack
    };
    QuackCounter.getCount = function () {
        return QuackCounter.numberQuacks;
    };
    QuackCounter.numberQuacks = 0;
    return QuackCounter;
}());
exports.QuackCounter = QuackCounter;
var CountingDuckFactory = /** @class */ (function () {
    function CountingDuckFactory() {
    }
    CountingDuckFactory.prototype.createMallardDuck = function () {
        return new QuackCounter(new MallardDuck());
    };
    CountingDuckFactory.prototype.createRedheadDuck = function () {
        return new QuackCounter(new RedheadDuck());
    };
    CountingDuckFactory.prototype.createDuckCall = function () {
        return new QuackCounter(new DuckCall());
    };
    CountingDuckFactory.prototype.createRubberDuck = function () {
        return new QuackCounter(new RubberDuck());
    };
    return CountingDuckFactory;
}());
exports.CountingDuckFactory = CountingDuckFactory;
//CHANGE 4: specify a flock
var Flock = /** @class */ (function () {
    function Flock() {
        this.quackers = [];
        this.observers = [];
    }
    Flock.prototype.add = function (quacker) {
        this.quackers.push(quacker);
    };
    Flock.prototype.quack = function () {
        for (var _i = 0, _a = this.quackers; _i < _a.length; _i++) {
            var quacker = _a[_i];
            quacker.quack();
        }
        this.notifyAll();
    };
    Flock.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    Flock.prototype.notifyAll = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update();
        }
    };
    return Flock;
}());
exports.Flock = Flock;
var DuckFan = /** @class */ (function () {
    function DuckFan() {
    }
    DuckFan.prototype.update = function () {
        console.log('A fan just heard their favorite. SQUEEEEEEEE!!!');
    };
    return DuckFan;
}());
exports.DuckFan = DuckFan;
var ObservableDecorator = /** @class */ (function () {
    function ObservableDecorator(observed) {
        this.observed = observed;
        this.observers = [];
    }
    ObservableDecorator.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    ObservableDecorator.prototype.notifyAll = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update();
        }
    };
    ObservableDecorator.prototype.quack = function () {
        this.observed.quack(); //delegate
        this.notifyAll(); //notify
    };
    return ObservableDecorator;
}());
exports.ObservableDecorator = ObservableDecorator;
