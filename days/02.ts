type Play = "ROCK" | "PAPER" | "SCISSORS";
type Result = "WIN" | "LOSS" | "DRAW";

const theirPlays: { [key: string]: Play } = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
};

const myPlays: { [key: string]: Play } = {
  X: "ROCK",
  Y: "PAPER",
  Z: "SCISSORS",
};

const itemPoints = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const gamePoints = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0
}

function resultOf(them:Play, me:Play):Result {
  if (them === me) {
    return "DRAW";
  } else if (them === "ROCK" && me === "PAPER") {
    return "WIN";
  } else if (them === "PAPER" && me === "SCISSORS") {
    return "WIN";
  } else if (them === "SCISSORS" && me === "ROCK") {
    return "WIN"
  } else {
    return "LOSS"
  }
}

type StrategyGuide = Array<{ them: Play; me: Play }>;

function parseInput(input: string): StrategyGuide {
  return input.split("\n").map((round) => {
    const lineParts = round.split(" ");
    return { them: theirPlays[lineParts[0]], me: myPlays[lineParts[1]] };
  });
}

function scoreGame(strategy:StrategyGuide):number {
  return strategy.reduce((acc, item) => {
    return acc + itemPoints[item.me] + gamePoints[resultOf(item.them, item.me)];
  },0)
}

export function part1(input: string):number  {
  const strategy = parseInput(input);
  return scoreGame(strategy);
}

// export function part2(input: string): number {
// }
