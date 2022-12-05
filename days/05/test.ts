import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import {
  Instruction,
  parseInstructions,
  parseStartState,
  part1,
  part2,
  Yard,
} from "./index.ts";

const testDataFromExample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

Deno.test("Day 4 Part 1", async (t) => {
  await t.step("parse start state", () => {
    const startState = testDataFromExample.split("\n\n")[0];
    const expected: Yard = {
      stacks: [
        { crates: ["Z", "N"] },
        { crates: ["M", "C", "D"] },
        { crates: ["P"] },
      ],
    };
    const actual = parseStartState(startState);
    assertEquals(actual, expected);
  });

  await t.step("parse instructions", () => {
    const instructions = testDataFromExample.split("\n\n")[1];
    const expected: Instruction[] = [
      { count: 1, fromStackID: 2, toStackID: 1 },
      { count: 3, fromStackID: 1, toStackID: 3 },
      { count: 2, fromStackID: 2, toStackID: 1 },
      { count: 1, fromStackID: 1, toStackID: 2 },
    ];
    const actual = parseInstructions(instructions);
    assertEquals(actual, expected);
  });

  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), "CMZ");
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/05/input.txt`);
    assertEquals(part1(input), "SHMSDGZVC");
  });
});

Deno.test("Day 4 Part 2", async (t) => {
  await t.step("example", () => {
    assertEquals(part2(testDataFromExample), "MCD");
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/05/input.txt`);
    assertEquals(part2(input), "");
  });
});
