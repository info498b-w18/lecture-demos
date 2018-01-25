"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ducks = require("./ducks"); //subclasses
//make some ducks
var mallard = new Ducks.MallardDuck(); //example
var ducks = [];
ducks.push(mallard);
ducks.push(new Ducks.RedheadDuck());
ducks.push(new Ducks.TealDuck());
//have them all act!
ducks.forEach(function (duck) {
    console.log(duck.display());
    duck.quack();
});
