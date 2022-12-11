import {
  clone,
  identity,
  last,
  sumBy,
} from "https://cdn.skypack.dev/remeda?dts";

type CPU = {
  cycleNumber: number;
  registerX: number;
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

export function part1(input: string): number {
  const instructions = parseInput(input);

  let lastCPU: CPU = { cycleNumber: 1, registerX: 1 };
  const cpuHistory: CPU[] = [lastCPU];
  let cpuCycle = 1;
  instructions.forEach((instruction) => {
    let instructionCycle = 1;
    do {
      cpuCycle++;
      lastCPU = clone(lastCPU);
      lastCPU.cycleNumber = cpuCycle;
      if (instructionCycle === instruction.cycles) {
        switch (instruction.name) {
          case "noop":
            break;
          case "addx":
            lastCPU.registerX += instruction.value; // mutates
            break;
        }
      }
      cpuHistory.push(lastCPU);
      instructionCycle++;
    } while (instructionCycle <= instruction.cycles);
  });

  return sumBy(
    [20, 60, 100, 140, 180, 220].map((i) => {
      const state = cpuHistory[i - 1];
      return state.registerX * state.cycleNumber;
    }),
    identity,
  );
}
