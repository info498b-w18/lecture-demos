"use strict";
// code goes here
var Dog = /** @class */ (function () {
    function Dog(name, mood) {
        this.mood = mood;
        this.name = name;
    }
    Dog.prototype.bark = function () {
        console.log(this.name + " barks!");
    };
    return Dog;
}());
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var foo = new Foo();
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.translate = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Point.prototype.getX = function () { return this.x; };
    Point.prototype.getY = function () { return this.y; };
    return Point;
}());
var Polygon = /** @class */ (function () {
    function Polygon(points) {
        this.corners = [];
        this.corners = points;
    }
    Polygon.prototype.addPoint = function (point) {
        this.corners.push(point);
    };
    Polygon.prototype.getCenter = function () {
        var sum = this.corners.reduce(function (total, item) {
            total.translate(item.getX(), item.getY());
            return total;
        }, new Point(0, 0));
        return new Point(sum.getX() / this.corners.length, sum.getY() / this.corners.length);
    };
    return Polygon;
}());
var triangle = new Polygon([]);
triangle.addPoint(new Point(0, 0));
triangle.addPoint(new Point(4, 9));
triangle.addPoint(new Point(8, 2));
console.log(triangle.getCenter());
