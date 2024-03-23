import { ExtensionContext } from 'vscode';
import { init as initCommand } from '@app/command';
import { init as initLog } from '@app/log';
import { init as initParser } from '@app/parser';


export function activate(context: ExtensionContext) {
    const log = initLog(context);
    const parser = initParser();
    initCommand(context, log, parser);

    log.info("initialize finished");
}

// This method is called when your extension is deactivated
export function deactivate() { }
