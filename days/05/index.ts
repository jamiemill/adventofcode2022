import { intersection, range } from "https://cdn.skypack.dev/ramda?dts";

export type Yard = { stacks: Array<Stack> };
type Stack = { crates: Array<Crate> };
type Crate = string;

function parseInput(input: string): any {
  const [startStateStr, instructionsStr] = input.split("\n\n");
  console.log(startStateStr, instructionsStr);
}

/**
 * strategy:
 * reverse the lines
 * strip the first line
 * iterate through a line, fetching the letter in every 4th position, starting from 1, not 0.
 * push those into the stack content arrays
 */

export function parseStartState(input: string): Yard {
  const FIRST_POS = 1;
  const SPACE_BETWEEN = 4;
  const startState: Yard = { stacks: [] };
  input.split("\n")
    .reverse() // reverse it so we start bottom-up instead of top-down
    .slice(1) // remove the first row which are just labels
    .forEach((line) => {
      for (
        let i = FIRST_POS, stackID = 0;
        i < line.length;
        i += SPACE_BETWEEN, stackID++
      ) {
        if (!startState.stacks[stackID]) {
          startState.stacks[stackID] = { crates: [] };
        }
        if (line[i] !== " ") {
          startState.stacks[stackID].crates.push(line[i]);
        }
      }
    });
  return startState;
}

export function part1(input: string): string {
  const res = parseInput(input);
  return "CMZ";
}
