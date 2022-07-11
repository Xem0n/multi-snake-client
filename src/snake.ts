import Game from './game';
import Part from './part';
import { Drawable, Point, Direction } from './types';

const STARTING_LENGTH = 50;
const VELOCITY = 1;

class Snake implements Drawable {
    local: boolean;
    parts: Part[];
    positions: Point[];
    direction: Direction;
    alreadyTurned: boolean;

    constructor(local = false) {
        this.local = local;
        this.direction = Direction.Right;
        this.alreadyTurned = false;

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

            y += VELOCITY;
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

    turn(direction: Direction): void {
        if (this.canTurn(direction)) {
            this.direction = direction;
            this.alreadyTurned = true;
        }
    }

    canTurn(direction: Direction): boolean {
        let curDirection = this.direction;

        direction++;
        curDirection++;

        return (
            (direction & 1) !==
            (curDirection & 1) &&
            !this.alreadyTurned
        );
    }
    
    move(): void {
        const newPos = this.getNewPos();

        this.positions.unshift(newPos);
        this.positions.pop();

        this.updateParts();

        this.alreadyTurned = false;
    }

    private getNewPos(): Point {
        const head = this.parts[0];
        const delta = Game.getInstance().time.delta;
        const velocity = (delta / 10) * VELOCITY;

        let x = (this.direction == Direction.Right) ? velocity : 0;
        x = (this.direction == Direction.Left) ? -velocity : x;

        let y = (this.direction == Direction.Down) ? velocity : 0;
        y = (this.direction == Direction.Up) ? -velocity : y;

        const newPos: Point = {
            x: head.pos.x + x,
            y: head.pos.y + y
        };

        return newPos;
    }

    private updateParts(): void {
        this.parts.forEach((part: Part, index: number) => {
            part.pos = this.positions[index];
        });
    }

    draw(): void {
        this.parts.forEach((part: Part) => part.draw());
    }
}

export default Snake;