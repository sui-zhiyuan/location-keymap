import * as vscode from 'vscode';

import { registerCommands } from './commands/major';

export function activate(context: vscode.ExtensionContext){
    let logger = vscode.window.createOutputChannel("location-keymap")
    logger.appendLine("start register command")

    registerCommands(context)

    logger.appendLine("end register command")
}