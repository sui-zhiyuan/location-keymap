import * as vscode from "vscode";

import { Command, Direction } from "./base";

export let cursorUpSection: Command = {
    name: "cursorUpSection",

    callback: async function (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): Promise<void> {
        let direction = Direction.Up
        let lines = fineSectionEdge(textEditor, direction)
        await vscode.commands.executeCommand("cursorMove", {
            to: Direction.GetName(direction), by: "line", value: lines
        })
    }
}

export let cursorDownParagraph: Command = {
    name: "cursorDownParagraph",

    callback: async function (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): Promise<void> {
        let direction = Direction.Down
        let lines = fineSectionEdge(textEditor, direction)
        await vscode.commands.executeCommand("cursorMove", {
            to: Direction.GetName(direction), by: "line", value: lines
        })
    }
}

function fineSectionEdge(textEditor: vscode.TextEditor, d : Direction): number{
    return 0
}