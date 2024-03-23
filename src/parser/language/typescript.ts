import { Direction, CursorMoveParameter } from "@app/common";
import { EdgeChecker } from "../base";

export class Typescript extends EdgeChecker {
    override isSectionEdge(para: CursorMoveParameter): boolean {
        if (this.isDocumentEdge(para)) {
            return true;
        }

        const line = para.document.lineAt(para.position);
        switch (para.direction) {
            case Direction.Up:
                return line.text.endsWith('{');
            case Direction.Down:
                return line.text.endsWith('}');
            default:
                throw new Error("wrong direction");
        }
    }
}
