import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext){
    let logger = vscode.window.createOutputChannel("location-keymap")
    logger.appendLine("test logger 123123")
    console.log("test123123123")
    let disposable = vscode.commands.registerCommand('location-keymap.helloWorld', function(){
        vscode.window.showInformationMessage("testing hello world")
    })

    let disposable1 = vscode.commands.registerCommand('cursorUpBlock', async function(){
        let currEditor = vscode.window.activeTextEditor
        await vscode.commands.executeCommand("cursorMove",{
            to:"down" , by:'wrappedLine' , value:2
        })
    })
    context.subscriptions.push(disposable)
    context.subscriptions.push(disposable1)
}