import { TextDocument } from "vscode";

enum LineType {
    DocumentStart,
    DocumentEnd,
    SectionStart,
    SectionEnd,
    EmptyLine,
    Normal,
}

namespace LineType {
    export function toDisplay(type: LineType): string {
        switch (type) {
            case LineType.DocumentStart: return "DStart";
            case LineType.DocumentEnd: return "DEnd__";
            case LineType.SectionStart: return "SStart";
            case LineType.SectionEnd: return "SEnd__";
            case LineType.EmptyLine: return "EpLine";
            case LineType.Normal: return "Normal";
            case undefined : return "unDef_";
            default: throw new Error("unreachable code");
        }
    }
}

enum CharacterType {
    Character,
    Space,
    Operator,
}

class SubParser {
    // lineEdge = (level: number, para: CursorMoveParameter): [MoveLevel, EdgeType, number] => {
    //     const documentEdge = this.isDocumentEdge(para);
    //     if (documentEdge !== null) {
    //         return [MoveLevel.All, this.isDocumentEdge(para), -1];
    //     }

    //     const sectionEdge = this.isSectionEdge(para);
    //     if (sectionEdge !== null) {
    //         switch (true) {
    //             case (para.direction === Direction.Down && sectionEdge === EdgeTypeEnum.Start):
    //             case (para.direction === Direction.Up && sectionEdge === EdgeTypeEnum.End):
    //                 return [MoveLevel.Bulk, sectionEdge, level + 1];
    //             case (para.direction === Direction.Up && sectionEdge === EdgeTypeEnum.Start):
    //             case (para.direction === Direction.Down && sectionEdge === EdgeTypeEnum.End):
    //                 return [MoveLevel.Bulk, EdgeType.revert(sectionEdge), level - 1];
    //             default:
    //                 throw new Error("unreachable code");
    //         }
    //     }

    //     const paragraphEdge = this.isParagraphEdge(para);
    //     if (paragraphEdge !== null) {
    //         return [MoveLevel.Normal, paragraphEdge, level];
    //     }

    //     return [MoveLevel.Single, null, level];
    // };

    isDocumentStart = (_document: TextDocument, line: number): boolean => {
        return line < 0;
    };

    isDocumentEnd = (document: TextDocument, line: number): boolean => {
        return line >= document.lineCount;
    };

    isSectionStart = (_document: TextDocument, _line: number): boolean => {
        return false;
    };

    isSectionEnd = (_document: TextDocument, _line: number): boolean => {
        return false;
    };

    isEmptyLine = (document: TextDocument, line: number): boolean => {
        return document.lineAt(line).isEmptyOrWhitespace;
    };

    parseLine = (document: TextDocument, line: number): LineType => {
        switch (true){
            case this.isDocumentStart(document , line):
                return LineType.DocumentStart;
            case this.isDocumentEnd(document , line):
                return LineType.DocumentEnd;
            case this.isSectionStart(document , line):
                return LineType.SectionStart;
            case this.isSectionEnd(document , line):
                return LineType.SectionEnd;
            case this.isEmptyLine(document , line):
                return LineType.EmptyLine;
            default:
                return LineType.Normal;
        }
    };


    // isParagraphEdge = (para: CursorMoveParameter): EdgeType => {
    //     const isPrevLineEmpty = para.document.lineAt(para.position.line - 1).isEmptyOrWhitespace;
    //     const isCurrentLineEmpty = para.document.lineAt(para.position.line).isEmptyOrWhitespace;
    //     const isNextLineEmpty = para.document.lineAt(para.position.line + 1).isEmptyOrWhitespace;

    //     let result = null;
    //     if (isPrevLineEmpty && !isCurrentLineEmpty) {
    //         result = EdgeTypeEnum.Start;
    //     }
    //     else if (!isCurrentLineEmpty && isNextLineEmpty) {
    //         result = EdgeTypeEnum.End;
    //     }

    //     return result;
    // };


    // isLineEdge = (para: CursorMoveParameter): EdgeType => {
    //     let result = null;
    //     if (para.position.character <= 0) {
    //         result = EdgeTypeEnum.Start;
    //     } else if (para.position.character >= para.document.lineAt(para.position.line).text.length) {
    //         result = EdgeTypeEnum.End;
    //     }
    //     return result;
    // };

    // isWordEdge = (_para: CursorMoveParameter): boolean => {
    //     throw new Error("Method not implemented.");
    // };

    // isExpressionEdge = (_para: CursorMoveParameter): boolean => {
    //     throw new Error("Method not implemented.");
    // };
}

export { LineType,CharacterType, SubParser };