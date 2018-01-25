"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.quack = function () {
        console.log("quack!");
    };
    Duck.prototype.swim = function (distance) {
        console.log("Swims the " + distance + "m duckstyle.");
    };
    return Duck;
}());
exports.Duck = Duck;
var RedheadDuck = /** @class */ (function (_super) {
    __extends(RedheadDuck, _super);
    function RedheadDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedheadDuck.prototype.display = function () {
        return "Looks like a RedHead";
    };
    return RedheadDuck;
}(Duck));
exports.RedheadDuck = RedheadDuck;
var MallardDuck = /** @class */ (function (_super) {
    __extends(MallardDuck, _super);
    function MallardDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MallardDuck.prototype.display = function () {
        return "Looks like a Mallard";
    };
    return MallardDuck;
}(Duck));
exports.MallardDuck = MallardDuck;
var TealDuck = /** @class */ (function (_super) {
    __extends(TealDuck, _super);
    function TealDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TealDuck.prototype.display = function () {
        return "Looks like a Teal";
    };
    return TealDuck;
}(Duck));
exports.TealDuck = TealDuck;
var RubberDuck = /** @class */ (function (_super) {
    __extends(RubberDuck, _super);
    function RubberDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RubberDuck.prototype.quack = function () {
        console.log('squeek!');
    };
    RubberDuck.prototype.display = function () {
        return "A rubber ducky!";
    };
    return RubberDuck;
}(Duck));
exports.RubberDuck = RubberDuck;
