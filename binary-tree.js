function createGrid(width, height, pixel) {
    const grid = [];
    const rows = Math.floor(width / pixel);
    const columns = Math.floor(height / pixel);
    let i = 0;
    repeat(columns, (i) => {
        repeat(rows, (j) => {
            const x = j * pixel;
            const y = i * pixel;
            grid.push(new Cell(x, y));
        });
    });
    return grid;
}
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // open 1 top -1 right 0 both
        this.open = Math.floor(Math.random() * 3) - 1;
        if (y === height - pixel && x === height - pixel) {
            //this.open = 0;
        } else if (y === 0) {
            this.open = 1;
        } else if (x === 0) {
            this.open = -1;
        } else if (x === width) {
            this.open = -1;
        } else if (y === height) {
            console.log(x)
            this.open = 1;
        }
    }
    draw() {
        const { x, y, open } = this;

        strokeWeight(2);
        stroke("black");
        //bottom side
        line(x, y + pixel, x + pixel, y + pixel);

        //left side
        line(x, y, x, y + pixel);
        //top
        line(x, y, x + pixel, y);

        //right
        line(x + pixel, y, x + pixel, y + pixel);
        strokeCap(PROJECT);
        strokeWeight(2);
        stroke("white");

        if (open === 0) {
            line(x + strokeWidth, y, x + pixel, y);
            //right
            line(x, y, x, y + (pixel - strokeWidth));

            return;
        }
        //top
        if (open === -1) {
            line(x + strokeWidth, y, x + (pixel - strokeWidth), y);
            return;
        }
        line(x, y + strokeWidth, x, y + (pixel - strokeWidth));
    }
}

const width = 500;
const height = 500;
const pixel = 20;
const strokeWidth = 2;

const grid = createGrid(width, height, pixel);

function setup() {
    createCanvas(width, height);
    background("white");

    grid.forEach((cell) => cell.draw());
}
