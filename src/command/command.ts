import * as vscode from "vscode";

import { Command } from "command/base";
import { commands as cursorMoveParagraph } from "./cursorMoveParagraph"
import { commands as cursorMoveSection } from "./cursorMoveSection"

let allCommands: Command[][] = [cursorMoveParagraph, cursorMoveSection];

export function registerCommands(context: vscode.ExtensionContext) {
    for (let command of allCommands.flat()) {
        let dispose = vscode.commands.registerTextEditorCommand(command.name, command.callback, command.thisArg)
        context.subscriptions.push(dispose)
    }
}