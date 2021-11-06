import './game.css';

class Game extends HTMLElement {
    start(ip: string, port: number): void {

    }
}

customElements.define('snake-game', Game);

export default Game;