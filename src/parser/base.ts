import { TextDocument, TextLine } from "vscode";

import { Direction, MoveLevel } from "@app/common/common";

const maxMoveLine = 50;

export interface MoveParameter {
    readonly document: TextDocument;
    readonly currentLine: TextLine;
    readonly direction: Direction;
}

export abstract class BaseParser {
    protected isDocumentEdge(para: MoveParameter): boolean {
        switch (para.direction) {
            case Direction.Up:
                return para.currentLine.lineNumber <= 0;
            case Direction.Down:
                return para.currentLine.lineNumber >= para.document.lineCount;
            default:
                throw new Error("unexpected direction");
        }
    }

    protected abstract isSectionEdge(para: MoveParameter): boolean;

    protected isParagraphEdge(para: MoveParameter): boolean {
        if (this.isSectionEdge(para)) {
            return true;
        }

        let [dRow, _] = Direction.getMove(para.direction);
        if (dRow === 0) {
            throw new Error("unexpected direction");
        }
        let nextRowNumber = para.currentLine.lineNumber + dRow;
        return para.document.lineAt(nextRowNumber).isEmptyOrWhitespace;
    }

    public findEdge(para: MoveParameter, level: MoveLevel) {
        let checker: (para: MoveParameter) => boolean;
        switch (level) {
            case MoveLevel.Section:
                checker = this.isSectionEdge;
                break;
            case MoveLevel.Paragraph:
                checker = this.isParagraphEdge;
                break;
            default:
                throw new Error("unexpected checker");
        }
        let [dRow, _] = Direction.getMove(para.direction);
        if (dRow === 0) {
            throw new Error("wrong direction");
        }
        let currentLine = para.currentLine.lineNumber;
        let changeLine = 1
        for (; changeLine <= maxMoveLine; changeLine++) {
            let targetLine = para.document.lineAt(currentLine + changeLine * dRow);
            if (checker({ document: para.document, currentLine: targetLine, direction: para.direction })) {
                break;
            }
        }
        return changeLine;
    }
}