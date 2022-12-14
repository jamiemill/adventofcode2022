import { clone } from "https://cdn.skypack.dev/remeda?dts";

export type Yard = { stacks: Array<Stack> };
type Stack = { crates: Array<Crate> };
type Crate = string;

type Input = {
  startState: Yard;
  instructions: Instruction[];
};

function parseInput(input: string): Input {
  const [startStateStr, instructionsStr] = input.split("\n\n");
  return {
    startState: parseStartState(startStateStr),
    instructions: parseInstructions(instructionsStr),
  };
}

const FIRST_POS = 1; // the first crate stack is found in column 1
const SPACE_BETWEEN = 4; // and then every 4th column you'll find the next crate stack

export function parseStartState(input: string): Yard {
  const startState: Yard = { stacks: [] };
  input.split("\n")
    .reverse() // reverse it so we start bottom-up instead of top-down
    .slice(1) // remove the first row which are just labels
    .forEach((line) => {
      for (
        let textCol = FIRST_POS, stackIndex = 0;
        textCol < line.length;
        textCol += SPACE_BETWEEN, stackIndex++
      ) {
        if (!startState.stacks[stackIndex]) {
          startState.stacks[stackIndex] = { crates: [] };
        }
        if (line[textCol] !== " ") {
          startState.stacks[stackIndex].crates.push(line[textCol]);
        }
      }
    });
  return startState;
}

export type Instruction = {
  count: number;
  fromStackID: number;
  toStackID: number;
};
const MATCHER = /move ([\d]+) from ([\d]+) to ([\d]+)/;

export function parseInstructions(input: string): Instruction[] {
  return input
    .split("\n")
    .map((line) => {
      const instructionParts = line.match(MATCHER);
      if (!instructionParts) {
        throw "Could not match";
      }
      const [_all, count, fromStackID, toStackID] = instructionParts;
      return {
        count: parseFloat(count),
        fromStackID: parseFloat(fromStackID),
        toStackID: parseFloat(toStackID),
      };
    });
}

function followInstruction(state: Yard, instruction: Instruction): Yard {
  const nextState = clone(state);
  const { count, fromStackID, toStackID } = instruction;
  for (let i = 1; i <= count; i++) {
    const crate = nextState.stacks[fromStackID - 1].crates.pop();
    if (!crate) {
      throw "No crates left!";
    }
    nextState.stacks[toStackID - 1].crates.push(crate);
  }
  return nextState;
}

function operateCrane(state: Yard, instructions: Instruction[]): Yard {
  return instructions.reduce(followInstruction, state);
}

function getTopCrateOfEachStack(yard: Yard): string[] {
  return yard.stacks.map((stack) => stack.crates[stack.crates.length - 1]);
}

export function part1(input: string): string {
  const { startState, instructions } = parseInput(input);
  const endState = operateCrane(startState, instructions);
  return getTopCrateOfEachStack(endState).join("");
}

function followInstruction9001(state: Yard, instruction: Instruction): Yard {
  const nextState = clone(state);
  const { count, fromStackID, toStackID } = instruction;
  const fromStack = nextState.stacks[fromStackID - 1];
  const toStack = nextState.stacks[toStackID - 1];
  const pickedUpCrates = fromStack.crates.splice(-count);
  toStack.crates.push(...pickedUpCrates);
  return nextState;
}

function operateCrane9001(state: Yard, instructions: Instruction[]): Yard {
  return instructions.reduce(followInstruction9001, state);
}

export function part2(input: string): string {
  const { startState, instructions } = parseInput(input);
  const endState = operateCrane9001(startState, instructions);
  return getTopCrateOfEachStack(endState).join("");
}
