import {EventEmitter} from 'events';
import {Dispatcher} from 'flux';

//define an Action type of basic object
class Action {
  // readonly actionType:string;
  // readonly data:any;
  constructor(readonly actionType:string, readonly data?:any){}
}

//"module" to organize Actions and Action Creators
class ToDoActions {
  //type constants
  static readonly ADD_ITEM = 'add_item';
  static readonly CHECK_ITEM = 'check_items';
  static readonly EDIT_DRAFT_ITEM = 'edit_draft';
  static readonly ADD_DRAFT_ITEM = 'add_draft';

  //Action Creators!
  static addItem(item){
    let action = new Action(ToDoActions.ADD_ITEM, {text:item});
    AppDispatcher.dispatch(action);
  }

  static checkItem(item){
    let action = new Action(ToDoActions.CHECK_ITEM, {text:item});
    AppDispatcher.dispatch(action);
  }

  static editDraftItem(item){
    let action = new Action(ToDoActions.EDIT_DRAFT_ITEM, {text:item});
    AppDispatcher.dispatch(action);
  }

  static addDraftItem(){
    let action = new Action(ToDoActions.ADD_DRAFT_ITEM);
    AppDispatcher.dispatch(action);
  }
}

//define the dispatcher
const AppDispatcher = new Dispatcher();

//Stores
class ToDoStore extends EventEmitter {
  private items:string[] = [];
  private draft:string = "";

  constructor() {
    super();
    //register callback (respond to dispatches)
    AppDispatcher.register((payload:Action) => {
      switch(payload.actionType){ //switch instead of if/else block

        //handle each kind of action
        case ToDoActions.ADD_ITEM:
          this.items.push(payload.data.text);
          this.emit('change');
          break;

        case ToDoActions.CHECK_ITEM:
          let itemIndex = this.items.indexOf(payload.data.text);
          this.items.splice(itemIndex, 1); //remove item
          this.emit('change');
          break;        

        case ToDoActions.EDIT_DRAFT_ITEM:
          this.draft = payload.data.text;
          this.emit('change');
          break;

        case ToDoActions.ADD_DRAFT_ITEM:
          this.items.push(this.draft);
          this.draft = "";
          this.emit('change');        
          break;
      }
    })
  }

  /* state getters; should encapsulate more */
  getItems(){
    return this.items;
  }

  getDraftItem() {
    return this.draft;
  }
}

const toDoStoreSingleton = new ToDoStore(); //instantiate; doing some singleton work


//Views (mostly provided)
class TodoListView {
  constructor() {
    toDoStoreSingleton.on('change', (e) => { this.render(); });
  }

  render(){
    let list = $('#todo-list');
    list.empty();
    // let items = ['Finish the demo']; //get items here!;
    let items = toDoStoreSingleton.getItems();
    items.forEach((item) => {
      list.append(`<li>${item}</li>`); //add item for each
    })
    // list.append(`<li><em>${'a draft item...'}</em></li>`); //add draft
    list.append(`<li><em>${toDoStoreSingleton.getDraftItem()}</em></li>`); //add draft
  }
}

class TodoInputView {
  constructor() {
    toDoStoreSingleton.on('change', (e) => { this.render(); });

    //add input handlers
    let input = $('#newItem');
    input.on('input', () => {
      //handle input change
      ToDoActions.editDraftItem(input.val());
    })

    let button = $('#addButton');
    button.on('click', () => {
      //handle button click
      ToDoActions.addDraftItem();
    })
  }

  render() {
    $('#newItem').val(toDoStoreSingleton.getDraftItem()); //in case need to update...
  }
}


//main
console.log("Running program...");
let listView = new TodoListView();
let inputView = new TodoInputView();
ToDoActions.addItem("Say hello"); //starting item (testing)
