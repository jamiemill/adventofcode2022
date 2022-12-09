import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { Board, Direction, Instruction, part1, step } from "./index.ts";

const testDataFromExample = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

Deno.test("Day 9 Part 1", async (t) => {
  await t.step("step right", () => {
    const startState: Board = { head: [0, 0], tail: [0, 0] };
    const direction: Direction = "R";
    const finishState: Board = { head: [1, 0], tail: [0, 0] };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("step right and pull tail", () => {
    const startState: Board = { head: [1, 0], tail: [0, 0] };
    const direction: Direction = "R";
    const finishState: Board = { head: [2, 0], tail: [1, 0] };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("step up and pull tail", () => {
    const startState: Board = { head: [0, 1], tail: [0, 0] };
    const direction: Direction = "U";
    const finishState: Board = { head: [0, 2], tail: [0, 1] };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("pull tail diagonally", () => {
    const startState: Board = { head: [1, 1], tail: [0, 0] };
    const direction: Direction = "U";
    const finishState: Board = { head: [1, 2], tail: [1, 1] };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("multiple steps in one move", () => {
    const startState: Board = { head: [0, 0], tail: [0, 0] };
    const instruction: Instruction = { dir: "R", dist: 3 };
    const finishState: Board = { head: [3, 0], tail: [2, 0] };
    assertEquals(move(startState, instruction), finishState);
  });

  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), 13);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/09/input.txt`);
    assertEquals(part1(input), 0);
  });
});

// Deno.test("Day 9 Part 2", async (t) => {
//   await t.step("calcaulteViewScore", () => {
//     const grid = parseInput(testDataFromExample);
//     const result = calculateViewScore(grid, 2, 1);
//     assertEquals(result, 4);
//   });
//   await t.step("example", () => {
//     assertEquals(part2(testDataFromExample), 0);
//   });

//   await t.step("answer", async () => {
//     const input = await Deno.readTextFile(`./days/09/input.txt`);
//     assertEquals(part2(input), 0);
//   });
// });
