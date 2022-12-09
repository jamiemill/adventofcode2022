import { clone, last, range } from "https://cdn.skypack.dev/remeda?dts";

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

function subtractCoords(left: Coord, right: Coord): Coord {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
  };
}

function addCoords(left: Coord, right: Coord): Coord {
  return {
    x: left.x + right.x,
    y: left.y + right.y,
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

const vectors = {
  "U": { x: 0, y: 1 },
  "D": { x: 0, y: -1 },
  "L": { x: -1, y: 0 },
  "R": { x: 1, y: 0 },
};

function updateFollower(
  leader: Coord,
  follower: Coord,
  direction: Direction,
): Coord {
  const f = clone(follower);
  const gap = subtractCoords(leader, follower);

  if (direction === "R") {
    if (gap.x > 1) {
      f.x += 1;
      if (gap.y !== 0) {
        f.y = leader.y;
      }
    }
  }
  if (direction === "L") {
    if (gap.x < -1) {
      f.x -= 1;
      if (gap.y !== 0) {
        f.y = leader.y;
      }
    }
  }
  if (direction === "U") {
    if (gap.y > 1) {
      f.y += 1;
      if (gap.x !== 0) {
        f.x = leader.x;
      }
    }
  }
  if (direction === "D") {
    if (gap.y < -1) {
      f.y -= 1;
      if (gap.x !== 0) {
        f.x = leader.x;
      }
    }
  }

  return f;
}

export function step(board: Board, direction: Direction): Board {
  const b = clone(board);
  b.head = addCoords(b.head, vectors[direction]);
  b.tail = updateFollower(b.head, b.tail, direction);
  return b;
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

export type Board2 = {
  head: Coord;
  rest: Coord[]; // should be 9 entries here
};

export function part2(input: string): number {
  let board: Board2 = {
    head: { x: 0, y: 0 },
    rest: range(0, 9).map(() => ({ x: 0, y: 0 })),
  };
  const tailHistory: Set<string> = new Set();
  tailHistory.add(`${last(board.rest)?.x},${last(board.rest)?.y}`);

  const instructions = parseInput(input);
  const steps = instructionsToSteps(instructions);

  // steps.forEach((instruction) => {
  //   board = step(board, instruction);
  //   tailHistory.add(`${last(board.rest)?.x},${last(board.rest)?.y}`);
  // });

  return tailHistory.size;
}
