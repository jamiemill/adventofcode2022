import { clone } from "https://cdn.skypack.dev/remeda?dts";

export type Direction = "R" | "U" | "D" | "L";
export type Instruction = {
  dir: Direction;
  dist: number;
};

export type Coord = [number, number];
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
  return [
    head[0] - tail[0],
    head[1] - tail[1],
  ];
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
  if (direction === "L") newHeadPos[0]--;
  if (direction === "R") newHeadPos[0]++;
  if (direction === "D") newHeadPos[1]--;
  if (direction === "U") newHeadPos[1]++;

  const newTailPos = newBoard.tail;
  const gap = coordinateDelta(newHeadPos, newTailPos);

  if (direction === "R") {
    if (gap[0] > 1) {
      newTailPos[0] += 1;
      if (gap[1] !== 0) {
        newTailPos[1] = newHeadPos[1];
      }
    }
  }
  if (direction === "L") {
    if (gap[0] < -1) {
      newTailPos[0] -= 1;
      if (gap[1] !== 0) {
        newTailPos[1] = newHeadPos[1];
      }
    }
  }
  if (direction === "U") {
    if (gap[1] > 1) {
      newTailPos[1] += 1;
      if (gap[0] !== 0) {
        newTailPos[0] = newHeadPos[0];
      }
    }
  }
  if (direction === "D") {
    if (gap[1] < -1) {
      newTailPos[1] -= 1;
      if (gap[0] !== 0) {
        newTailPos[0] = newHeadPos[0];
      }
    }
  }
  return newBoard;
}

export function part1(input: string): number {
  let board: Board = { head: [0, 0], tail: [0, 0] };
  const tailHistory: Set<string> = new Set();
  tailHistory.add(`${board.tail[0]},${board.tail[1]}`);

  const instructions = parseInput(input);
  const steps = instructionsToSteps(instructions);

  steps.forEach((instruction) => {
    board = step(board, instruction);
    tailHistory.add(`${board.tail[0]},${board.tail[1]}`);
  });

  return tailHistory.size;
}
