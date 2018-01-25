"use strict";
function walk(animal = "dog") {
    console.log("Walk the " + animal);
}
let milesWalked = walk(); //=> Walk the dog
walk("hippopotamus"); //=> Walk the hippopotamus
