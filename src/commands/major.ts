import * as vscode from "vscode";

import { cursorDownParagraph , cursorUpParagraph } from "./cursorMoveParagraph";

let allCommands = [cursorDownParagraph , cursorUpParagraph]

export function registerCommands(context: vscode.ExtensionContext){
    for(let command of allCommands){
        let dispose = vscode.commands.registerTextEditorCommand(command.name , command.callback , command.thisArg)
        context.subscriptions.push(dispose)
    }
}