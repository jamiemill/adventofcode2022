import { clone, last, range } from "https://cdn.skypack.dev/remeda?dts";
import { renderBoard2 } from "./render.ts";

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
const vectors: { [k in Direction]: Vector } = {
  "U": { x: 0, y: 1 },
  "D": { x: 0, y: -1 },
  "L": { x: -1, y: 0 },
  "R": { x: 1, y: 0 },
};

function parseInput(input: string): Instruction[] {
  return input.split("\n").map((line) => {
    const [directionStr, distanceStr] = line.split(" ");
    const dist = parseInt(distanceStr);
    let dir: Direction | null = null;
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

export function getFollowerMove(
  leader: Vector,
  follower: Vector,
  lastMoveOfLeader: Vector,
): Vector {
  const gap = subtractVectors(leader, follower);
  let followerMove = { x: 0, y: 0 };
  if (Math.abs(gap.x) > 1 || Math.abs(gap.y) > 1) {
    followerMove = subtractVectors(gap, lastMoveOfLeader);
  }
  return followerMove;
}

export function step(board: Board, direction: Direction): Board {
  const b = clone(board);
  const headMove = vectors[direction];
  // console.log(`-> head move: ${direction}}`);
  b.head = addVectors(b.head, headMove);
  const followerMove = getFollowerMove(b.head, b.tail, headMove);
  b.tail = addVectors(b.tail, followerMove);
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
  head: Vector;
  followers: Vector[];
};

export function step2(board: Board2, direction: Direction): Board2 {
  const b = clone(board);
  let leaderMove = vectors[direction];
  b.head = addVectors(b.head, leaderMove);
  for (let i = 0; i < b.followers.length; i++) {
    const leader = i === 0 ? b.head : b.followers[i - 1];
    const followerMove = getFollowerMove(
      leader,
      b.followers[i],
      leaderMove,
    );
    b.followers[i] = addVectors(b.followers[i], followerMove);
    leaderMove = followerMove;
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
  // console.log(drawBoard2(board));
  console.log(renderBoard2(board));

  const instructions = parseInput(input);
  const steps = instructionsToSteps(instructions);

  steps.forEach((instruction) => {
    board = step2(board, instruction);
    // console.log(drawBoard2(board));
    console.log(renderBoard2(board));
    tailHistory.add(`${last(board.followers)?.x},${last(board.followers)?.y}`);
  });

  // console.log(tailHistory);

  return tailHistory.size;
}
