import * as vscode from "vscode";

import { Command, Direction } from "./base";

export let cursorUpBlock: Command = {
    name: "cursorUpBlock",

    callback: async function (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): Promise<void> {
        let direction = Direction.Up;
        let lines = findBlockEdge(textEditor, direction)
        await vscode.commands.executeCommand("cursorMove", {
            to: Direction.GetName(direction), by: "line", value: lines
        })
    }
}

export let cursorDownBlock: Command = {
    name: "cursorDownBlock",

    callback: async function (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): Promise<void> {
        let direction = Direction.Down;
        let lines = findBlockEdge(textEditor, direction)
        await vscode.commands.executeCommand("cursorMove", {
            to: Direction.GetName(direction), by: "line", value: lines
        })
    }
}

const maxBlockLine = 50

function findBlockEdge(editor: vscode.TextEditor, d: Direction): number {
    let dLine = 0
    switch (d) {
        case Direction.Down: dLine = 1; break;
        case Direction.Up: dLine = -1; break;
        case Direction.Left:
        case Direction.Right:
        default:
            throw new Error("wrong direction");
    }

    let currentLine = editor.selection.active.line;
    let changeLine = 1
    for (; changeLine <= maxBlockLine; changeLine++) {
        let targetLine = currentLine + (changeLine * dLine)
        if (targetLine < 0 || targetLine >= editor.document.lineCount) {
            changeLine--;
            break;
        }

        let lineContent = editor.document.lineAt(targetLine)
        if (lineContent.isEmptyOrWhitespace) {
            break;
        }
    }
    return changeLine;
}