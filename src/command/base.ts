import { Direction, MoveLevel } from "common/common";
import { getParser } from "parser/parser";
import * as vscode from "vscode"

type CommandCallback = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]) => void

export interface Command {
    readonly name: string
    readonly callback: CommandCallback
    thisArg?: any
}

export function moveCallback(direction: Direction, level: MoveLevel): CommandCallback {
    return async function (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): Promise<void> {
        let parser = getParser(textEditor.document.languageId);
        let lines = parser.findEdge({
            document: textEditor.document,
            currentLine: textEditor.document.lineAt(textEditor.selection.active.line),
            direction: direction
        }, level)
        await vscode.commands.executeCommand("cursorMove", {
            to: Direction[direction], by: "line", value: lines
        })
    }
}