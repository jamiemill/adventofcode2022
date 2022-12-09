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
    // is this the most concise way to make the types happy?
    // can I also do something like "RLUD".split("").includes(directionStr) ?

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

export function move(board: Board, instruction: Instruction): Board {
  let newBoard = clone(board);
  for (let i = 0; i < instruction.dist; i++) {
    newBoard = step(newBoard, instruction.dir);
  }
  return newBoard;
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

  // move the tail one place towards the head in both directions
  if (gap[0] > 1) {
    newTailPos[0] += 1;
  } else if (gap[0] < -1) {
    newTailPos[0] -= 1;
  }
  if (gap[1] > 1) {
    newTailPos[1] += 1;
  } else if (gap[1] < -1) {
    newTailPos[1] -= 1;
  }

  // if it was a vertical move and they ended up in different columns, swing the tail horizontally to the same column
  if (direction === "U" || direction === "D") {
    if (gap[0] > 0) {
      newTailPos[0] += 1;
    } else if (gap[0] < 0) {
      newTailPos[0] -= 1;
    }
  } // if it was a horizontal move and they ended up in different rows, swing the tail vertically to the same column
  else if (direction === "L" || direction === "R") {
    if (gap[1] > 0) {
      newTailPos[1] += 1;
    } else if (gap[1] < 0) {
      newTailPos[1] -= 1;
    }
  }
  return newBoard;
}

export function part1(input: string): number {
  const instructions = parseInput(input);
  let board: Board = { head: [0, 0], tail: [0, 0] };
  const tailHistory: Set<string> = new Set();
  instructions.forEach((instruction) => {
    board = move(board, instruction);
    tailHistory.add(`${board.tail[0]},${board.tail[0]},`);
  });
  console.log(tailHistory);

  return tailHistory.size;
}
