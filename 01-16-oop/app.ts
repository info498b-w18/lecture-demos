// code goes here

class Dog {
    private mood:string;
    private name:string;

    constructor(name:string, mood:string){
        this.mood = mood;
        this.name = name;
    }

    bark() {
        console.log(this.name+" barks!");
    }
}

class Foo {
}

let foo = new Foo()


class Point {
    constructor(
        private x:number,
        private y:number
    ) {}

    translate(dx:number, dy:number) {
        this.x += dx;
        this.y += dy
    }

    getX() { return this.x}
    getY() { return this.y}
}

class Polygon {
    private corners:Point[] = [];

    constructor(points:Point[]){
        this.corners = points;
    }

    addPoint(point:Point) {
        this.corners.push(point);
    }

    getCenter():Point {
        let sum:Point = this.corners.reduce((total:Point, item:Point) => {
            total.translate(item.getX(), item.getY())
            return total;
        }, new Point(0,0));

        return new Point(sum.getX()/this.corners.length,
                         sum.getY()/this.corners.length);
    }
}

let triangle = new Polygon([]);
triangle.addPoint(new Point(0,0));
triangle.addPoint(new Point(4,9));
triangle.addPoint(new Point(8,2));

console.log(triangle.getCenter());