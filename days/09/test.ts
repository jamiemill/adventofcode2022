import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { Board, Direction, part1, part2, step } from "./index.ts";

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

const testDataFromExamplePart2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

Deno.test("Day 9 Part 2", async (t) => {
  // await t.step("a diagonal move should be copied by followers", () => {
  //   const startState: Board = { head: { x: 1, y: 1 }, tail: { x: 0, y: 0 } };
  //   const direction: Direction = "U";
  //   const finishState: Board = { head: { x: 2, y: 2 }, tail: { x: 1, y: 1 } };
  //   assertEquals(step(startState, direction), finishState);
  // });

  await t.step("example", () => {
    assertEquals(part2(testDataFromExamplePart2), 36);
  });

  // await t.step("answer", async () => {
  //   const input = await Deno.readTextFile(`./days/09/input.txt`);
  //   assertEquals(part2(input), 0);
  // });
});
