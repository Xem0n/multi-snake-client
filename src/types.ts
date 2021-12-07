interface Drawable {
    draw(): void;
}

interface Point {
    x: number;
    y: number;
}

interface GameTime {
    delta: DOMHighResTimeStamp;
    lastTimestamp: DOMHighResTimeStamp;
}

enum Direction {
    Up,
    Left,
    Down,
    Right 
}

export { Drawable, Point, GameTime, Direction };