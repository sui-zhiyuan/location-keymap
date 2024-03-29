import { MoveLevel, CursorMoveParameter, Direction } from "@app/common";
import { Logger } from "@app/log";
import { LineType, SubParser } from "./base";
import { CSharp } from "./language/csharp";
import { Typescript } from "./language/typescript";
import { Position, TextDocument } from "vscode";

export function init(log: Logger): Parser {
    return new IParser(log);
}

export interface Parser {
    findNext(para: CursorMoveParameter): Position;
}

class IParser implements Parser {
    subParsers: Map<string, SubParser>;
    log: Logger;

    constructor(log: Logger) {
        let subParsers = new Map<string, SubParser>();
        subParsers.set("", new SubParser);
        subParsers.set("typescript", new Typescript);
        subParsers.set("csharp", new CSharp);
        this.subParsers = subParsers;
        this.log = log;
    }

    findNext(para: CursorMoveParameter): Position {
        const [dRow, _] = Direction.getMove(para.direction);

        const maxMoveTable = new Map<MoveLevel, number>([
            [MoveLevel.Normal, 10],
            [MoveLevel.Bulk, 50],
        ]);
        const maxMove = maxMoveTable.get(para.level) ?? (() => { throw new Error("unreachable code"); })();

        let edgeCheck: (s: States) => boolean;
        if (para.level === MoveLevel.Normal && para.direction === Direction.Down) {
            edgeCheck = (s: States) =>
                s.curr.t === LineType.DocumentEnd ||
                s.curr.l < 0 && this.paraStartLine(s.curr.t) ||
                s.curr.l === 0 && this.paraStartLine(s.curr.t) && s.prev.t === LineType.EmptyLine;
        } else if (para.level === MoveLevel.Normal && para.direction === Direction.Up) {
            edgeCheck = (s: States) =>
                s.curr.t === LineType.DocumentStart ||
                s.curr.l < 0 && this.paraStartLine(s.curr.t) ||
                s.curr.l === 0 && this.paraStartLine(s.curr.t) && s.next.t === LineType.EmptyLine;
        } else if (para.level === MoveLevel.Bulk) {
            edgeCheck = (s: States) => s.curr.t === LineType.SectionStart && s.curr.l === 0;
        } else {
            throw new Error("unreachable code");
        }

        const subParser = this.getSubParser(para.languageId);

        let lt0 = subParser.parseLine(para.document, para.position.line);
        let lt1 = subParser.parseLine(para.document, para.position.line + dRow);
        let states = new States(
            { t: LineType.Normal, l: 0 },
            { t: lt0, l: 0 },
            { t: lt1, l: this.nextLevel(0, lt0, lt1, dRow) },
        );
        this.logLine(para, para.position.line, states.curr);
        this.logLine(para, para.position.line + dRow, states.next);

        for (let change = 1; change <= maxMove; change++) {
            const line = para.position.line + (change + 1) * dRow;
            let nextType = subParser.parseLine(para.document, line);
            states.move({ t: nextType, l: this.nextLevel(states.next.l, states.next.t, nextType, dRow) });
            this.logLine(para, line, states.next);

            if (edgeCheck(states)) {
                return this.moveByLine(para.document, para.position, change * dRow);
            }
        }
        return this.moveByLine(para.document, para.position, maxMove * dRow);
    }

    private logLine(para: CursorMoveParameter, line: number, state: { t: LineType, l: number }) {
        const log = this.log;
        let content = "";
        if (line >= 0 && line < para.document.lineCount) {
            content = para.document.lineAt(line).text;
        }
        log.info(`${line + 1} t=${LineType.toDisplay(state.t)} l=${state.l} ${content}`);
    }

    private paraStartLine(t: LineType): boolean {
        return t === LineType.SectionStart || t === LineType.DocumentEnd || t === LineType.Normal;
    }

    private nextLevel(curr: number, currType: LineType, nextType: LineType, dRow: number): number {
        if (dRow === 1 && currType === LineType.SectionStart) {
            curr += 1;
        }
        if (dRow === 1 && nextType === LineType.SectionEnd) {
            curr -= 1;
        }

        if (dRow === -1 && currType === LineType.SectionEnd) {
            curr += 1;
        }
        if (dRow === -1 && nextType === LineType.SectionStart){
            curr -= 1;
        }
        return curr;
    }

    private moveByLine(document: TextDocument, pos: Position , changeLine: number): Position {
        let targetLine = pos.line + changeLine;
        targetLine = targetLine < 0 ? 0 :  targetLine;
        targetLine = targetLine >= document.lineCount ? document.lineCount - 1 : targetLine;
        return new Position(targetLine, pos.character);
    }

    // private singleMove(_para: CursorMoveParameter): Position {
    //     throw new Error("Method not implemented.");
    // }

    // private allMove(_para: CursorMoveParameter): Position {
    //     throw new Error("Method not implemented.");
    // }

    getSubParser(languageId: string): SubParser {
        let checker = this.subParsers.get(languageId);
        if (checker === undefined) {
            checker = this.subParsers.get("");
        }
        if (checker === undefined) {
            throw new Error("unreachable code");
        }
        return checker;
    }
}

interface State { t: LineType; l: number; };

class States {
    private states: State[] = [];
    private pCurr: number = 0;

    get prev(): State {
        return this.states[(this.pCurr + 2) % 3] ?? (() => { throw new Error("unreachable code"); })();
    }
    private set prev(n: State) {
        this.states[(this.pCurr + 2) % 3] = n;
    }
    get curr(): State {
        return this.states[this.pCurr] ?? (() => { throw new Error("unreachable code"); })();;
    }
    get next(): State {
        return this.states[(this.pCurr + 1) % 3] ?? (() => { throw new Error("unreachable code"); })();

    }

    constructor(prev: State, current: State, next: State) {
        this.states.push(prev);
        this.states.push(current);
        this.states.push(next);
        this.pCurr = 1;
    }

    move(n: State): void {
        this.prev = n;
        this.pCurr = (this.pCurr + 1) % 3;
    }
}