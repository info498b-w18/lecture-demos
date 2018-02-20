import {Point, Facing} from './util';

/** un-comment below to enable deterministic random for testing **/
// import * as lodash from 'lodash';
// import * as seedrandom from 'seedrandom'; //seeded random numbers
// seedrandom('1', {global:true}); //seed the random value
// _ = lodash.runInContext(); //load with global seed    

export abstract class Agent {
  constructor(public location:Point, public facing:Point = Facing.South) {}

  //Moves the agent, letting them know if they are blocked in current facing
  //Returns new location (for convenience)
  abstract move(facingBlocked:boolean):Point;

  //Reacts to other agent (or lackthereof) it sees
  //Returns the updated self (for convenience/transforming)
  see(target:Agent|null):Agent {
    return this; //no modification (default)
  };

  //Interacts with (modifies) other agent
  //Returns the modified other (for convenience/transforming)
  interactWith(target:Agent):Agent {
    return target; //no modification (default)
  }

  abstract render(context:CanvasRenderingContext2D):void; 
}

export class Human extends Agent {
  protected speed:number = .5; //chance to move (percentage)

  move(facingBlocked:boolean = false) {
    if(_.random(1.0) > this.speed) return this.location; //don't move

    if(!facingBlocked){
      this.location.x += this.facing.x;
      this.location.y += this.facing.y;
    } 
    else {
      this.facing = Facing.Directions[_.random(0,Facing.Directions.length-1)];
    }

    return this.location;
  }

  //runs away from zombies
  see(target:Agent|null):Agent {
    if(target instanceof Zombie){
      //panic and turn around
      return new PanickedHuman(this.location, new Point(-1*this.facing.x, -1*this.facing.y))
    } 
    else if (target instanceof PanickedHuman){
      //panic without turning
      return new PanickedHuman(this.location, this.facing);
    } 
    else {
      if(_.random(1.0) < 0.15) //chance to turn anyway
        this.facing = Facing.Directions[_.random(0,Facing.Directions.length-1)];      
    }
    return this;
  };

  render(context:CanvasRenderingContext2D) {
    context.fillStyle = "#F9A7B0" //color
    context.fillRect(this.location.x,this.location.y,1,1);
  }
}

export class PanickedHuman extends Human {
  private fearLevel:number = 10;

  constructor(public location:Point, public facing:Point = Facing.South){
    super(location, facing);
    this.speed = 1.0; //always move
  }

  see(target:Agent|null):Agent {
    if(this.fearLevel > 0){
      this.fearLevel--;
    }

    if(target instanceof Zombie){
      this.fearLevel = 10;
    }

    if(this.fearLevel == 0){
      return new Human(this.location, this.facing);
    }

    return this;
  };

  render(context:CanvasRenderingContext2D) {
    context.fillStyle = "#FFF380" //color
    context.fillRect(this.location.x,this.location.y,1,1);
  }
}

export class Zombie extends Agent {
  private timePursuing = 0;
  private speed:number = .2; //chance to move

  move(facingBlocked:boolean = false) {
    if(_.random(1.0) > this.speed) return this.location; //don't move  

    if(!facingBlocked){
      this.location.x += this.facing.x;
      this.location.y += this.facing.y;
    }
    else {
      this.facing = Facing.Directions[_.random(0,Facing.Directions.length-1)];
    }

    return this.location;
  }

  //chases humans!
  see(target:Agent|null):Agent{
    if(this.timePursuing > 0) 
      this.timePursuing--;    

    if(target instanceof Human){
      this.timePursuing = 10; //start chasing
    }
    else if(this.timePursuing===0 && !target){ //if don't see anything, wander
      this.facing = Facing.Directions[_.random(0,Facing.Directions.length-1)];
    }
    return this;
  }

  //bites humans!
  interactWith(target:Agent):Agent{
    if(target instanceof Human){
      return new Zombie(target.location, target.facing);
    }
    return target;
  }

  render(context:CanvasRenderingContext2D) {
    context.fillStyle = "#0f0" //color
    context.fillRect(this.location.x,this.location.y,1,1);
  }
}