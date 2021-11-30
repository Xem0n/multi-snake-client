interface Drawable {
    draw(): void;
}

interface Point {
    x: number;
    y: number;
}

enum Direction {
    Up,
    Left,
    Down,
    Right 
}

export { Drawable, Point, Direction };