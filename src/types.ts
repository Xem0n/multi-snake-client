interface Drawable {
    draw(): void;
}

interface Point {
    x: number;
    y: number;
}

enum Direction {
    Up,
    Down,
    Left,
    Right 
}

export { Drawable, Point, Direction };