import Part from './part';
import { Drawable, Point, Direction } from './types';

const STARTING_LENGTH = 5;
const VELOCITY = 5;

class Snake implements Drawable {
    parts: Part[];
    positions: Point[];
    direction: Direction;

    constructor() {
        this.direction = Direction.Up;

        this.setupPositions();
        this.setupParts();
    }

    private setupPositions(): void {
        this.positions = [];

        // temporary starting pos
        let x = 10;
        let y = 500;

        for (let i = 0; i < STARTING_LENGTH; i++) {
            this.positions.push({
                x: x,
                y: y
            });

            y += Part.size.y;
        }
    }

    private setupParts(): void {
        this.parts = this.positions.map((position: Point, index: number) => (
            new Part({
                x: position.x,
                y: position.y
            }, index === 0)
        ));
    }
    
    move(): void {
        const newPos = this.getNewPos();

        this.positions.unshift(newPos);
        this.positions.pop();

        this.updateParts();
    }

    private getNewPos(): Point {
        const head = this.parts[0];
        let [x, y] = [0, 0];

        switch (this.direction) {
            case Direction.Up:
                y = -VELOCITY;
                break;

            case Direction.Down:
                y = VELOCITY;
                break

            case Direction.Left:
                x = -VELOCITY;
                break;

            case Direction.Right:
                x = VELOCITY;
                break;

            default:
                break;
        }

        const newPos: Point = {
            x: head.pos.x + x, 
            y: head.pos.y + y
        };

        return newPos;
    }

    private updateParts(): void {
        for (let i = 0; i < this.parts.length; i++) {
            this.parts[i].pos = this.positions[i];
        }
    }

    draw(): void {
        for (const part of this.parts) {
            part.draw();
        }
    }
}

export default Snake;