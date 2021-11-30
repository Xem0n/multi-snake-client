import Snake from './snake';
import { Drawable } from './types';

class Game extends HTMLElement implements Drawable {
    ctx: CanvasRenderingContext2D;
    snakes: Snake[];

    static getInstance(): Game {
        return document.querySelector('snake-game');
    }

    static getContext(): CanvasRenderingContext2D {
        const game = this.getInstance();

        return game.ctx;
    }

    constructor() {
        super();

        this.snakes = [];

        this.setupCanvas();
        window.onresize = this.setupCanvas.bind(this);
    }

    private setupCanvas(): void {
        const canvas = this.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext('2d');
    }

    start(ip: string, port: number): void {
        this.show();

        this.snakes.push(new Snake(true));

        setInterval(this.loop.bind(this), 500);
    }

    show(): void {
        this.style.display = 'flex';
    }

    loop(): void {
        this.think();
        this.draw();
    }

    think(): void {
        for (const snake of this.snakes) {
            snake.move();
        }
    }

    draw(): void {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        this.snakes.forEach((snake: Snake) => snake.draw());
    }
}

customElements.define('snake-game', Game);

export default Game;