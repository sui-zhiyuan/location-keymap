import { BaseParser, MoveParameter } from "../base"

export class CSharp extends BaseParser {
    isSectionEdge(para: MoveParameter): boolean {
        throw new Error("Function not implemented.")
    }
}