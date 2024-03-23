import { Position } from "vscode";
import { MoveLevel, CursorMoveParameter, Direction } from "@app/common";
import { EdgeChecker } from "./base";
import { CSharp } from "./language/csharp";
import { Typescript } from "./language/typescript";

const maxMove = 50;

interface Parser {
    findEdge(languageId: string, para: CursorMoveParameter, level: MoveLevel): Position;
}

class IParser implements Parser {
    edgeChecker: Map<string, EdgeChecker>;

    constructor() {
        let edgeChecker = new Map<string, EdgeChecker>();
        edgeChecker.set("", new EdgeChecker);
        edgeChecker.set("typescript", new Typescript);
        edgeChecker.set("csharp", new CSharp);
        this.edgeChecker = edgeChecker;
    }

    findEdge(languageId: string, para: CursorMoveParameter, level: MoveLevel): Position {
        switch (level) {
            case MoveLevel.Single:
                return this.singleMove(para);
            case MoveLevel.All:
                return this.allMove(para);
            default:
                break;
        }

        let checker = this.getEdgeChecker(languageId);
        let checkerFn: (para: CursorMoveParameter) => boolean;
        switch (true) {
            case (level === MoveLevel.Normal && para.direction === Direction.Up):
            case (level === MoveLevel.Normal && para.direction === Direction.Down):
                checkerFn = checker.isParagraphEdge;
                break;
            case (level === MoveLevel.Bulk && para.direction === Direction.Up):
            case (level === MoveLevel.Bulk && para.direction === Direction.Down):
                checkerFn = checker.isSectionEdge;
                break;
            case (level === MoveLevel.Normal && para.direction === Direction.Left):
            case (level === MoveLevel.Normal && para.direction === Direction.Right):
                checkerFn = checker.isWordEdge;
                break;
            case (level === MoveLevel.Bulk && para.direction === Direction.Left):
            case (level === MoveLevel.Bulk && para.direction === Direction.Right):
                checkerFn = checker.isExpressionEdge;
                break;
            default:
                throw new Error("unexpected checker");
        }

        let [dRow, dColumn] = Direction.getMove(para.direction);
        let newPos = para.position;
        for (let change = 1; change <= maxMove; change++) {
            newPos = para.position.translate(change * dRow, change * dColumn);
            if (checkerFn.call(checker, { document: para.document, position: newPos, direction: para.direction })) {
                break;
            }
        }
        return newPos;
    }

    private singleMove(_para: CursorMoveParameter): Position {
        throw new Error("Method not implemented.");
    }

    private allMove(_para: CursorMoveParameter): Position {
        throw new Error("Method not implemented.");
    }

    getEdgeChecker(languageId: string): EdgeChecker {
        let checker = this.edgeChecker.get(languageId);
        if (checker === undefined) {
            checker = this.edgeChecker.get("");
        }
        if (checker === undefined) {
            throw new Error("unreachable code");
        }
        return checker;
    }
}

function init(): Parser{
    return new IParser();
}

export {
    init,
    Parser,
};
