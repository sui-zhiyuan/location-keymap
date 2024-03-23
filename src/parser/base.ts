import { CursorMoveParameter, Direction } from "@app/common";

class EdgeChecker {
    isDocumentEdge(para: CursorMoveParameter): boolean {
        switch (para.direction) {
            case Direction.Up:
            case Direction.Down:
                return para.position.line <= 0 || para.position.line >= para.document.lineCount;
            case Direction.Left:
            case Direction.Right:
                return para.position.character <= 0 || para.position.character >= para.document.lineAt(para.position.line).text.length;
            default:
                throw new Error("unexpected direction");
        }
    }

    isSectionEdge(_para: CursorMoveParameter): boolean {
        throw new Error("Function not implemented.");
    }

    isParagraphEdge(para: CursorMoveParameter): boolean {
        if (this.isDocumentEdge(para)) {
            return true;
        }
        if (this.isSectionEdge(para)) {
            return true;
        }

        const isPrevLineEmpty = para.position.line === 0 || para.document.lineAt(para.position.line - 1).isEmptyOrWhitespace;
        const isCurrentLineEmpty = para.document.lineAt(para.position.line).isEmptyOrWhitespace;

        return isPrevLineEmpty && !isCurrentLineEmpty;
    }

    isWordEdge(_para: CursorMoveParameter): boolean {
        throw new Error("Method not implemented.");
    }

    isExpressionEdge(_para: CursorMoveParameter): boolean {
        throw new Error("Method not implemented.");
    }
}

export { EdgeChecker };