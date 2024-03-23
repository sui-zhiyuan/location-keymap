import { TextEditor, TextEditorEdit } from "vscode";

interface Command {
    get name(): string
    get thisArg(): any
    callback(textEditor: TextEditor, edit: TextEditorEdit, ...args: any[]): Promise<void>
}

export { Command };