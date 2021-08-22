import * as vscode from "vscode"

import { Command, Direction } from "./base"

export let cursorUpParagraph: Command = {
    name: "cursorUpParagraph",

    callback: async function (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): Promise<void> {
        let direction = Direction.Up;
        let lines = findParagraphEdge(textEditor, direction)
        await vscode.commands.executeCommand("cursorMove", {
            to: Direction.GetName(direction), by: "line", value: lines
        })
    }
}

export let cursorDownParagraph: Command = {
    name: "cursorDownParagraph",

    callback: async function (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): Promise<void> {
        let direction = Direction.Down;
        let lines = findParagraphEdge(textEditor, direction)
        await vscode.commands.executeCommand("cursorMove", {
            to: Direction.GetName(direction), by: "line", value: lines
        })
    }
}

const maxParagraphLine = 50

function findParagraphEdge(editor: vscode.TextEditor, d: Direction): number {
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
    for (; changeLine <= maxParagraphLine; changeLine++) {
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