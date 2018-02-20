import * as _ from 'lodash';

//convenience class
export class Point{
  constructor(public x:number, public y:number){}
}

//convenience enum for facing
export class Facing {
  //hack to provide readonly object enums
  static get North() { return {x:0, y:-1}; }
  static get East() { return {x:1, y:0}; }
  static get South() { return {x:0, y:1}; }
  static get West() { return {x:-1, y:0}; }

  static readonly Directions = [Facing.North, Facing.East, Facing.South, Facing.West];

  static turnLeftFrom(dir:Point):Point {
    return Facing.Directions[(_.findIndex(Facing.Directions,dir)+3)%4]
  }

  static turnRightFrom(dir:Point):Point {
    return Facing.Directions[(_.findIndex(Facing.Directions,dir)+1)%4]
  }
}
