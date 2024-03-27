import { TextDocument } from "vscode";
import { SubParser } from "../base";

export class Typescript extends SubParser {
    override isSectionStart = (document: TextDocument, line: number): boolean => {
        const lineText = document.lineAt(line).text;
        return lineText.endsWith('{');
    };

    override isSectionEnd = (document: TextDocument, line: number): boolean => {
        const lineText = document.lineAt(line).text;
        return lineText.endsWith('}');
    };
}
