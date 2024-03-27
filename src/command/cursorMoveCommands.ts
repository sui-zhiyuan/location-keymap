import { TextEditor, TextEditorEdit, commands, Position } from "vscode";
import { Direction, MoveLevel } from "@app/common";
import { Parser } from "@app/parser";
import { Command } from "./base";

class CursorMoveCommand implements Command {
    public name: string;
    get thisArg(): any {
        return undefined;
    }
    direction: Direction;
    level: MoveLevel;
    parser: Parser;

    constructor(parser: Parser, name: string, direction: Direction, level: MoveLevel) {
        this.parser = parser;
        this.name = name;
        this.direction = direction;
        this.level = level;
    }

    callback = async (textEditor: TextEditor, _edit: TextEditorEdit, ..._args: any[]) => {
        let prevPos = textEditor.selection.active;
        const newPos = this.parser.findNext({
            languageId: textEditor.document.languageId,
            document: textEditor.document,
            position: prevPos,
            direction: this.direction,
            level: this.level
        });
        let move = this.getMove(prevPos, newPos);
        if (move === null) {
            return;
        }
        await commands.executeCommand("cursorMove", {
            to: move[0],
            value: move[1],
        });
    };

    private getMove(from: Position, to: Position): [string, number] | null {
        switch (true) {
            case to.line === from.line && to.character < from.character:
                return ["left", from.character - to.character];
            case to.line === from.line && to.character > from.character:
                return ["right", to.character - from.character];
            case to.line < from.line:
                return ["up", from.line - to.line];
            case to.line > from.line:
                return ["down", to.line - from.line];
        }
        return null;
    }
}

function initializeCommands(parse: Parser): Command[] {
    return [
        new CursorMoveCommand(parse, "cursorUpSection", Direction.Up, MoveLevel.Bulk),
        new CursorMoveCommand(parse, "cursorDownSection", Direction.Down, MoveLevel.Bulk),
        new CursorMoveCommand(parse, "cursorUpParagraph", Direction.Up, MoveLevel.Normal),
        new CursorMoveCommand(parse, "cursorDownParagraph", Direction.Down, MoveLevel.Normal),
    ];
}

export { initializeCommands };
