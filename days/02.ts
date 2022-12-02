type Shape = "ROCK" | "PAPER" | "SCISSORS";
type Result = "WIN" | "LOSS" | "DRAW";

const decodeThem: { [key: string]: Shape } = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
};

const decodeMe: { [key: string]: Shape } = {
  X: "ROCK",
  Y: "PAPER",
  Z: "SCISSORS",
};

const pointsForShape = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const pointsForResult = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0
}

function resultOf(them:Shape, me:Shape):Result {
  if (them === me) {
    return "DRAW";
  } else if (
    (them === "ROCK" && me === "PAPER") ||
    (them === "PAPER" && me === "SCISSORS") ||
    (them === "SCISSORS" && me === "ROCK")) {
    return "WIN"
  } else {
    return "LOSS"
  }
}

type StrategyGuide = Array<{ them: Shape; me: Shape }>;

function parseInput(input: string): StrategyGuide {
  return input.split("\n").map((line) => {
    const lineParts = line.split(" ");
    return { them: decodeThem[lineParts[0]], me: decodeMe[lineParts[1]] };
  });
}

function scoreGame(strategy:StrategyGuide):number {
  return strategy.reduce((acc, item) => {
    return acc + pointsForShape[item.me] + pointsForResult[resultOf(item.them, item.me)];
  },0)
}

export function part1(input: string):number  {
  const strategy = parseInput(input);
  return scoreGame(strategy);
}

const decodeResult: { [key: string]: Result } = {
  X: "LOSS",
  Y: "DRAW",
  Z: "WIN",
};

type DesiredResultsStrategyGuide = Array<{ them: Shape; desiredResult: Result }>;

function parseInputPart2(input: string): DesiredResultsStrategyGuide {
  return input.split("\n").map((line) => {
    const lineParts = line.split(" ");
    return { them: decodeThem[lineParts[0]], desiredResult: decodeResult[lineParts[1]] };
  });
}

const toBeat: {[K in Shape]:Shape} = {
  ROCK: "PAPER",
  PAPER: "SCISSORS",
  SCISSORS: "ROCK"
};

// could generate by inverting the above somehow
const toLoseTo: {[K in Shape]:Shape} = {
  ROCK: "SCISSORS",
  PAPER: "ROCK",
  SCISSORS: "PAPER"
};

function howToAchieve(desiredResult:Result, theirShape:Shape):Shape {
  if (desiredResult === "WIN") {
    return toBeat[theirShape];
  } else if (desiredResult === "LOSS") {
    return toLoseTo[theirShape];
  } else {
    return theirShape;
  }
}

function decideWhatToPlay(desiredResults:DesiredResultsStrategyGuide):StrategyGuide {
  return desiredResults.map(round => {
    return {
      them: round.them,
      me: howToAchieve(round.desiredResult, round.them)
    }
  });
}

export function part2(input: string): number {
  const desiredResults:DesiredResultsStrategyGuide = parseInputPart2(input);
  const whatToPlay:StrategyGuide = decideWhatToPlay(desiredResults);
  return scoreGame(whatToPlay);
}
