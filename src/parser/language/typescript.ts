import { Direction } from "common/common";
import { BaseParser, MoveParameter } from "../base";

export class Typescript extends BaseParser {
    isSectionEdge(para: MoveParameter): boolean {
        switch (para.direction) {
            case Direction.Up:
                return para.currentLine.text.endsWith('{');
            case Direction.Down:
                return para.currentLine.text.endsWith('}');
            default:
                throw new Error("wrong direction");
        }
    }
}
