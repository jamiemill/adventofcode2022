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

export function subtractVectors(left: Vector, right: Vector): Vector {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
  };
}

export function addVectors(left: Vector, right: Vector): Vector {
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

const abs = Math.abs;

function clamp(num: number) {
  return (num > 1) ? 1 : (num < 1) ? -1 : num;
}

export function getFollowerMove(
  leader: Vector,
  follower: Vector,
): Vector {
  const gap = subtractVectors(leader, follower);
  let followerMove = { x: 0, y: 0 };
  // touching, stay put
  if (abs(gap.x) <= 1 && abs(gap.y) <= 1) {
    return followerMove;
  } // 2 apart in same row
  else if (gap.y === 0 && abs(gap.x) >= 2) {
    followerMove.x = clamp(gap.x);
  } // 2 apart in same column
  else if (gap.x === 0 && abs(gap.y) >= 2) {
    followerMove.y = clamp(gap.y);
  } // 2 apart and diagonal
  else if ((gap.y !== 0 && abs(gap.x) >= 2) || gap.x !== 0 && abs(gap.y) >= 2) {
    followerMove = { x: clamp(gap.x), y: clamp(gap.y) };
  }
  return followerMove;
}

export function step(board: Board, direction: Direction): Board {
  const b = clone(board);
  const headMove = vectors[direction];
  b.head = addVectors(b.head, headMove);
  const followerMove = getFollowerMove(b.head, b.tail);
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

  const instructions = parseInput(input);
  const steps = instructionsToSteps(instructions);

  steps.forEach((instruction) => {
    board = step2(board, instruction);
    tailHistory.add(`${last(board.followers)?.x},${last(board.followers)?.y}`);
  });

  // console.log(tailHistory);

  return tailHistory.size;
}
