import Snake from './snake';
import Input from './input';
import { Drawable, GameTime } from './types';

const STARTING_SPEED = 500;

class Game extends HTMLElement implements Drawable {
    ctx: CanvasRenderingContext2D;
    speed: number;
    snakes: Snake[];
    started: boolean;
    time: GameTime;

    static getInstance(): Game {
        return document.querySelector('snake-game');
    }

    static getContext(): CanvasRenderingContext2D {
        const game = this.getInstance();

        return game.ctx;
    }

    constructor() {
        super();

        this.started = false;
        this.snakes = [];
        this.speed = STARTING_SPEED;
        this.time = {
            delta: 0,
            lastTimestamp: performance.now()
        };

        this.setupCanvas();
        window.onresize = this.setupCanvas.bind(this);
        
        Input.setup(this);
    }

    private setupCanvas(): void {
        const canvas = this.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext('2d');
    }

    getLocalSnake(): Snake | undefined {
        return this.snakes.find(snake => snake.local);
    }

    start(ip: string, port: number): void {
        this.show();

        this.started = true;
        this.snakes.push(new Snake(true));

        this.time.lastTimestamp = performance.now();
        this.loop(this.time.lastTimestamp);
    }

    show(): void {
        this.style.display = 'flex';
    }

    loop(timestamp: DOMHighResTimeStamp): void {
        this.updateTime(timestamp);

        this.think();
        this.draw();

        window.requestAnimationFrame((timestamp: DOMHighResTimeStamp) => this.loop(timestamp));
    }

    private updateTime(timestamp: DOMHighResTimeStamp): void {
        this.time.delta = timestamp - this.time.lastTimestamp;
        this.time.lastTimestamp = timestamp;
    }

    think(): void {
        this.snakes.forEach(snake => snake.move());
    }

    draw(): void {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        this.snakes.forEach((snake: Snake) => snake.draw());
    }
}

customElements.define('snake-game', Game);

export default Game;