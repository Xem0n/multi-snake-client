import Game from 'game/game';
import './config.css';

const DEFAULT_PORT = 4002;
const IP_VALIDATION_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

interface Inputs {
    ip: HTMLFormElement;
    port: HTMLFormElement;
    submit: HTMLFormElement;
}

class Config extends HTMLElement {
    inputs: Inputs;

    constructor() {
        super();

        this.inputs = {
            ip: this.querySelector('.ip'),
            port: this.querySelector('.port'),
            submit: this.querySelector('input[type=submit]')
        };

        this.handleSubmit();
    }

    handleSubmit(): void {
        this.inputs.submit.addEventListener('click', () => {
            this.submit();
        });
    };

    submit(): void {
        try {
            const ip = this.ip;
            const port = this.port || DEFAULT_PORT;

            this.hide();
            this.play(ip, port);
        } catch (e) {
            alert(e);
        }
    };

    get ip(): string {
        const ip = this.inputs.ip.value;

        if (IP_VALIDATION_REGEX.test(ip)) {
            return ip;
        } else {
            throw 'Invalid IP Address!';
        }
    }

    get port(): number {
        const port = Number(this.inputs.port.value);

        if (Number.isInteger(port)) {
            return port;
        } else {
            throw 'Invalid port!';
        }
    }

    hide(): void {
        this.style.display = 'none';
    }

    play(ip: string, port: number): void {
        const game: Game = document.querySelector('snake-game');

        game.start(ip, port);
    }
}

customElements.define('snake-config', Config);