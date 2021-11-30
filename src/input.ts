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
        this.game.getLocalSnake()?.turn(direction);
    }
}

export default Input;