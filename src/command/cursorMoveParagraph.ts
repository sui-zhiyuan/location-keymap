import { Direction, MoveLevel } from "@app/common/common";

import { Command, moveCallback } from "./base";

export let commands: Command[] = [];

commands.push({
    name: "cursorUpParagraph",
    callback: moveCallback(Direction.Up, MoveLevel.Paragraph)
})

commands.push({
    name: "cursorDownSection",
    callback: moveCallback(Direction.Down, MoveLevel.Paragraph)
})