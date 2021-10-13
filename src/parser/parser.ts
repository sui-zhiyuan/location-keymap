import { MoveLevel } from "common/common";
import { MoveParameter } from "./base";
import { CSharp } from "./language/csharp";
import { Typescript } from "./language/typescript";

interface Parser {
    findEdge(para: MoveParameter, level: MoveLevel): number;
}

let cache: { [languageId: string]: Parser } = {};

export function getParser(languageId: string): Parser {
    let parser = cache[languageId];
    if (parser !== undefined) {
        return parser;
    }
    parser = newParser(languageId)
    cache[languageId] = parser;
    return parser;
}

function newParser(languageId: string) {
    switch (languageId) {
        case "typescript":
            return new Typescript;
        case "csharp":
            return new CSharp;
        default:
            throw new Error("Function not implemented.")
    }
}

