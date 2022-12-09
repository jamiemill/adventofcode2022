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
    const startState: Board = { head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } };
    const direction: Direction = "R";
    const finishState: Board = { head: { x: 1, y: 0 }, tail: { x: 0, y: 0 } };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("step right and pull tail", () => {
    const startState: Board = { head: { x: 1, y: 0 }, tail: { x: 0, y: 0 } };
    const direction: Direction = "R";
    const finishState: Board = { head: { x: 2, y: 0 }, tail: { x: 1, y: 0 } };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("step up and pull tail", () => {
    const startState: Board = { head: { x: 0, y: 1 }, tail: { x: 0, y: 0 } };
    const direction: Direction = "U";
    const finishState: Board = { head: { x: 0, y: 2 }, tail: { x: 0, y: 1 } };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("pull tail diagonally", () => {
    const startState: Board = { head: { x: 1, y: 1 }, tail: { x: 0, y: 0 } };
    const direction: Direction = "U";
    const finishState: Board = { head: { x: 1, y: 2 }, tail: { x: 1, y: 1 } };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), 13);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/09/input.txt`);
    assertEquals(part1(input), 6642);
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
