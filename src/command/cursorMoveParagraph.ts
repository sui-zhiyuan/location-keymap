import { Command, moveCallback } from "command/base";
import { Direction, MoveLevel } from "common/common";

export let commands: Command[] = [];

commands.push({
    name: "cursorUpParagraph",
    callback: moveCallback(Direction.Up, MoveLevel.Paragraph)
})

commands.push({
    name: "cursorDownSection",
    callback: moveCallback(Direction.Down, MoveLevel.Paragraph)
})