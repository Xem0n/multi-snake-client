import Snake from './snake';
import Game from './game';
import { Direction } from './types';

class Input {
    static game: Game;
    static snake: Snake;

    static setup(game: Game): void {
        this.game = game;

        document.addEventListener('keydown', this.turn.bind(this));
    }

    static turn(event: KeyboardEvent): void {
        if (!this.game.started) {
            return;
        }

        event.preventDefault();

        const direction = (<any>Direction)[event.code.slice(5)];

        if (this.canTurn(direction)) {
            const snake = this.game.getLocalSnake();
            snake.direction = direction;
        }
    }

    static canTurn(direction: Direction): boolean {
        let curDirection = this.game.getLocalSnake()?.direction;

        direction++;
        curDirection++;

        return (
            (direction & 1) !==
            (curDirection & 1)
        );
    }
}

export default Input;