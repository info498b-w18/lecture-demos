import * as readline from 'readline';


// app goes here

interface Message {

}

let sayHello: (name:string ) => Message;

//console.log(sayHello); //undefined

sayHello = function() {  //Error, does not match signature
    console.log('Hello');
}

foo:type = function() {

}
