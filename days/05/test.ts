import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { parseStartState, part1, Yard } from "./index.ts";

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

  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), "CMZ");
  });

  // await t.step("answer", async () => {
  //   const input = await Deno.readTextFile(`./days/04/input.txt`);
  //   assertEquals(part1(input), 487);
  // });
});

// Deno.test("Day 4 Part 2", async (t) => {
//   await t.step("example", () => {
//     assertEquals(part2(testDataFromExample), 4);
//   });

//   await t.step("answer", async () => {
//     const input = await Deno.readTextFile(`./days/04/input.txt`);
//     assertEquals(part2(input), 849);
//   });
// });
