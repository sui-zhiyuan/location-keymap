import { Direction, MoveLevel } from "@app/common/common";

import { Command, moveCallback } from "./base";

export let commands: Command[] = [];

commands.push({
    name: "cursorUpSection",
    callback: moveCallback(Direction.Up, MoveLevel.Section)
})

commands.push({
    name: "cursorDownSection",
    callback: moveCallback(Direction.Down, MoveLevel.Section)
})