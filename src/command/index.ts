import { ExtensionContext, commands } from "vscode";
import { Logger } from "@app/log";
import { initializeCommands as cursorMoveCommands } from "./cursorMoveCommands";
import { Parser } from "@app/parser";

function init(context: ExtensionContext, log: Logger, parser: Parser) {
    log.info("initialize command");

    const allCommands = [
        cursorMoveCommands(parser)
    ].flat();

    for (let command of allCommands) {
        log.info(`register command: ${command.name}`);
        let dispose = commands.registerTextEditorCommand(command.name, command.callback, command.thisArg);
        context.subscriptions.push(dispose);
    }
}

export { init };