"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MallardDuck = /** @class */ (function () {
    function MallardDuck() {
    }
    MallardDuck.prototype.quack = function () {
        console.log('Quack!!');
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
