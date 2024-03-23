import { Position, TextDocument } from "vscode";

enum Direction {
    Left = 1,
    Down,
    Up,
    Right,
}

namespace Direction {
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

enum MoveLevel {
    Single = 1,
    Normal = 2,
    Bulk = 3,
    All = 4,
}

export { Direction, MoveLevel };

interface CursorMoveParameter {
    readonly document: TextDocument;
    readonly position: Position;
    readonly direction: Direction;
}

export { CursorMoveParameter };