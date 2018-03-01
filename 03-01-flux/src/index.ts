import {EventEmitter} from 'events';
import {Dispatcher} from 'flux';

//Actions


//Action Creators


//Dispatcher


//Stores


//Views (mostly provided)
class TodoListView {
  constructor() {

  }

  render(){
    let list = $('#todo-list');
    list.empty();
    let items = ['Finish the demo']; //PLACEHOLDER: get items here!;
    items.forEach((item) => {
      list.append(`<li>${item}</li>`); //add item for each
    })
    list.append(`<li><em>${'a draft item...'}</em></li>`); //PLACHOLDER: add draft
  }
}

class TodoInputView {
  constructor() {

    //add input handlers
    let input = $('#newItem');
    input.on('input', () => {
      //handle input change
    })

    let button = $('#addButton');
    button.on('click', () => {
      //handle button click
    })
  }

  render() {
  }
}


//main
console.log("Running program...");
let listView = new TodoListView();
let inputView = new TodoInputView();
