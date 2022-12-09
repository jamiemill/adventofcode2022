import { clone } from "https://cdn.skypack.dev/remeda?dts";

export type Direction = "R" | "U" | "D" | "L";
export type Instruction = {
  dir: Direction;
  dist: number;
};

export type Coord = { x: number; y: number };
export type Board = {
  head: Coord;
  tail: Coord;
};

function parseInput(input: string): Instruction[] {
  return input.split("\n").map((line) => {
    const [directionStr, distanceStr] = line.split(" ");
    const dist = parseInt(distanceStr);
    let dir: null | Direction = null;
    switch (directionStr) {
      case "R":
      case "L":
      case "U":
      case "D":
        dir = directionStr;
        break;
    }
    if (dir === null) {
      throw "Unexpected direction";
    }
    return { dir, dist };
  });
}

function coordinateDelta(head: Coord, tail: Coord): Coord {
  return {
    x: head.x - tail.x,
    y: head.y - tail.y,
  };
}

function explodeInstruction(instruction: Instruction): Direction[] {
  const steps: Direction[] = [];
  for (let i = 0; i < instruction.dist; i++) {
    steps.push(instruction.dir);
  }
  return steps;
}

function instructionsToSteps(instructions: Instruction[]): Direction[] {
  return instructions.map(explodeInstruction).flat();
}

export function step(board: Board, direction: Direction): Board {
  const newBoard = clone(board);
  const newHeadPos = newBoard.head;
  if (direction === "L") newHeadPos.x--;
  if (direction === "R") newHeadPos.x++;
  if (direction === "D") newHeadPos.y--;
  if (direction === "U") newHeadPos.y++;

  const newTailPos = newBoard.tail;
  const gap = coordinateDelta(newHeadPos, newTailPos);

  if (direction === "R") {
    if (gap.x > 1) {
      newTailPos.x += 1;
      if (gap.y !== 0) {
        newTailPos.y = newHeadPos.y;
      }
    }
  }
  if (direction === "L") {
    if (gap.x < -1) {
      newTailPos.x -= 1;
      if (gap.y !== 0) {
        newTailPos.y = newHeadPos.y;
      }
    }
  }
  if (direction === "U") {
    if (gap.y > 1) {
      newTailPos.y += 1;
      if (gap.x !== 0) {
        newTailPos.x = newHeadPos.x;
      }
    }
  }
  if (direction === "D") {
    if (gap.y < -1) {
      newTailPos.y -= 1;
      if (gap.x !== 0) {
        newTailPos.x = newHeadPos.x;
      }
    }
  }
  return newBoard;
}

export function part1(input: string): number {
  let board: Board = { head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } };
  const tailHistory: Set<string> = new Set();
  tailHistory.add(`${board.tail.x},${board.tail.y}`);

  const instructions = parseInput(input);
  const steps = instructionsToSteps(instructions);

  steps.forEach((instruction) => {
    board = step(board, instruction);
    tailHistory.add(`${board.tail.x},${board.tail.y}`);
  });

  return tailHistory.size;
}
