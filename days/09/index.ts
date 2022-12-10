import { clone, last, range } from "https://cdn.skypack.dev/remeda?dts";

export type Direction = "R" | "U" | "D" | "L";
export type Instruction = {
  dir: Direction;
  dist: number;
};

export type Vector = Readonly<{ x: number; y: number }>;
export type Board = {
  head: Vector;
  tail: Vector;
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

function subtractVectors(left: Vector, right: Vector): Vector {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
  };
}

function addVectors(left: Vector, right: Vector): Vector {
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

export function updateFollower(
  leader: Vector,
  follower: Vector,
  lastMoveOfLeader: Vector,
): Vector {
  let newFollower = follower;
  const gap = subtractVectors(leader, follower);
  if (Math.abs(gap.x) > 1 || Math.abs(gap.y) > 1) {
    const followerMove = subtractVectors(gap, lastMoveOfLeader);
    newFollower = addVectors(newFollower, followerMove);
  }
  return newFollower;
}

function drawCoords(coords: Vector): string {
  return `${coords.x},${coords.y}`;
}
function drawBoard(board: Board): string {
  return `head: ${drawCoords(board.head)} tail: ${drawCoords(board.tail)}`;
}

export function step(board: Board, direction: Direction): Board {
  const b = clone(board);
  // console.log(`-> head move: ${direction}}`);
  b.head = addVectors(b.head, vectors[direction]);
  b.tail = updateFollower(b.head, b.tail, vectors[direction]);
  return b;
}

export function part1(input: string): number {
  let board: Board = { head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } };
  const tailHistory: Set<string> = new Set();
  tailHistory.add(`${board.tail.x},${board.tail.y}`);

  const instructions = parseInput(input);
  const steps = instructionsToSteps(instructions);
  console.log(drawBoard(board));

  steps.forEach((instruction) => {
    board = step(board, instruction);
    // console.log(drawBoard(board));
    tailHistory.add(`${board.tail.x},${board.tail.y}`);
  });

  return tailHistory.size;
}

export type Board2 = {
  head: Vector;
  followers: Vector[];
};

export function step2(board: Board2, direction: Direction): Board2 {
  const b = clone(board);
  b.head = addVectors(b.head, vectors[direction]);
  for (let i = 0; i < b.followers.length; i++) {
    const leader = i === 0 ? b.head : b.followers[i - 1];
    b.followers[i] = updateFollower(leader, b.followers[i], vectors[direction]);
  }
  return b;
}

export function part2(input: string): number {
  let board: Board2 = {
    head: { x: 0, y: 0 },
    followers: range(0, 9).map(() => ({ x: 0, y: 0 })),
  };
  const tailHistory: Set<string> = new Set();
  tailHistory.add(`${last(board.followers)?.x},${last(board.followers)?.y}`);

  const instructions = parseInput(input);
  const steps = instructionsToSteps(instructions);

  steps.forEach((instruction) => {
    board = step2(board, instruction);
    tailHistory.add(`${last(board.followers)?.x},${last(board.followers)?.y}`);
  });

  console.log(tailHistory);

  return tailHistory.size;
}
