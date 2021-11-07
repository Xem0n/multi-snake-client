import Game from './game';
import { Drawable, Point } from './types';

class Part implements Drawable {
    static readonly size: Point = {
        x: 40,
        y: 40
    };

    pos: Point;
    isHead: boolean;

    constructor(pos: Point, isHead = false) {
        this.pos = pos;
        this.isHead = isHead;
    }

    draw(): void {
        const ctx = Game.getContext();

        ctx.fillStyle = this.isHead ? 'red' : 'green';

        ctx.fillRect(
            this.pos.x, this.pos.y,
            Part.size.x, Part.size.y
        );
    }
}

export default Part;