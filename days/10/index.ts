import {
  clone,
  identity,
  last,
  sumBy,
} from "https://cdn.skypack.dev/remeda?dts";

type CPU = {
  cycle: number;
  X: number;
};

interface Instruction {
  name: string;
  cycles: number;
}
interface NoOpInstruction extends Instruction {
  name: "noop";
  cycles: 1;
}
interface AddInstruction extends Instruction {
  name: "addx";
  cycles: 2;
  value: number;
}

type AnyInstruction = NoOpInstruction | AddInstruction;

function parseInput(input: string): AnyInstruction[] {
  return input.split("\n").map((line) => {
    const [first, second] = line.split(" ");
    let out: AnyInstruction | null = null;
    switch (first) {
      case "noop":
        out = { name: "noop", cycles: 1 };
        break;
      case "addx":
        out = { name: "addx", value: parseInt(second), cycles: 2 };
        break;
    }
    if (out === null) throw "Unexpected instruction" + line;
    return out;
  });
}

function processInstruction(series: CPU[], instruction: AnyInstruction): CPU[] {
  const results: CPU[] = [];
  for (let i = 1; i <= instruction.cycles; i++) {
    const cpu = clone(series[series.length - 1]);
    // if it's the final cycle of the instruction, update the state
    if (i === instruction.cycles) {
      switch (instruction.name) {
        case "noop":
          break;
        case "addx":
          cpu.X += instruction.value; // mutates
          break;
      }
    }
    cpu.cycle++;
    results.push(cpu);
  }
  return series.concat(results);
}

export function part1(input: string): number {
  const instructions = parseInput(input);
  const startState: CPU = { cycle: 1, X: 1 };
  const series: CPU[] = instructions.reduce(processInstruction, [startState]);

  return sumBy(
    [20, 60, 100, 140, 180, 220].map((i) => {
      const state = series[i - 1];
      return state.X * i;
    }),
    identity,
  );
}
