import { Command, moveCallback } from "./base";
import { Direction, MoveLevel } from "common/common";

export let commands: Command[] = [];

commands.push({
    name: "cursorUpSection",
    callback: moveCallback(Direction.Up, MoveLevel.Section)
})

commands.push({
    name: "cursorDownSection",
    callback: moveCallback(Direction.Down, MoveLevel.Section)
})