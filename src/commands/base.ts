import * as vscode from "vscode"

export interface Command {
    readonly name: string
    readonly callback: (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]) => void
    thisArg?: any
}

export enum Direction{
    Left = 1,
    Down,
    Up,
    Right,
}

export namespace Direction{
    export function GetName(d : Direction): string{
        switch(d){
            case Direction.Left : return "left";
            case Direction.Down: return "down";
            case Direction.Up: return "up";
            case Direction.Right: return "right";
            default : throw new Error("unknown direction");
        }
    }
}
