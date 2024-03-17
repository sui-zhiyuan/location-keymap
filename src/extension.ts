import * as vscode from 'vscode';
import { registerCommands } from '@app/command/command';

export function activate(context: vscode.ExtensionContext) {

	let logger = vscode.window.createOutputChannel("location-keymap");
    logger.appendLine("start register command");

    registerCommands(context);

    logger.appendLine("end register command");
}

// This method is called when your extension is deactivated
export function deactivate() {}
