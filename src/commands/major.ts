import * as vscode from "vscode";

import { cursorUpBlock , cursorDownBlock } from "./cursorMoveBlock";

let allCommands = [cursorUpBlock , cursorDownBlock]

export function registerCommands(context: vscode.ExtensionContext){
    for(let command of allCommands){
        let dispose = vscode.commands.registerTextEditorCommand(command.name , command.callback , command.thisArg)
        context.subscriptions.push(dispose)
    }
}