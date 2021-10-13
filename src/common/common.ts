export enum Direction {
    Left = 1,
    Down,
    Up,
    Right,
}

export namespace Direction {
    export function getMove(d: Direction): [dRow: number, dColumn: number] {
        switch (d) {
            case Direction.Left: return [0, -1];
            case Direction.Down: return [1, 0];
            case Direction.Up: return [-1, 0];
            case Direction.Right: return [0, 1];
            default: throw new Error("unknown direction");
        }
    }
}

export enum MoveLevel {
    Section = 1,
    Paragraph = 2,
}

