import { ExtensionContext, OutputChannel, window } from "vscode";

interface Logger {
    info: (message: string) => void;
}

class ConsoleLogger implements Logger {
    info(message: string) {
        this.outputChannel.appendLine(message);
    }

    constructor(context: ExtensionContext) {
        this.outputChannel = window.createOutputChannel("location-keymap");
        context.subscriptions.push(this.outputChannel);
    }

    private outputChannel: OutputChannel;
}

function init(context: ExtensionContext): Logger {
    return new ConsoleLogger(context);
}

export { init, Logger };