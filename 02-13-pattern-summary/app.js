"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quackers = require("./quackers"); //subclasses
var DuckSymphony = /** @class */ (function () {
    function DuckSymphony() {
        this.quackers = [];
        this.quackers.push(new Quackers.MallardDuck());
        this.quackers.push(new Quackers.RedheadDuck());
        this.quackers.push(new Quackers.RubberDuck());
        this.quackers.push(new Quackers.DuckCall());
    }
    DuckSymphony.prototype.perform = function () {
        console.log('"Rock Out Ducks!"');
        //all quackers sing
        for (var _i = 0, _a = this.quackers; _i < _a.length; _i++) {
            var quacker = _a[_i];
            quacker.quack();
        }
    };
    return DuckSymphony;
}());
var symphony = new DuckSymphony();
symphony.perform();
