import { CursorMoveParameter } from "@app/common";
import { EdgeChecker } from "../base";

export class CSharp extends EdgeChecker {
    override isSectionEdge(_para: CursorMoveParameter): boolean {
        throw new Error("Function not implemented.");
    }
}