import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import {
  addVectors,
  Board,
  Direction,
  getFollowerMove,
  part1,
  part2,
  step,
} from "./index.ts";

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
    const startState: Board = {
      head: { x: 0, y: 0 },
      followers: [{ x: 0, y: 0 }],
    };
    const direction: Direction = "R";
    const finishState: Board = {
      head: { x: 1, y: 0 },
      followers: [{ x: 0, y: 0 }],
    };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("step right and pull tail", () => {
    const startState: Board = {
      head: { x: 1, y: 0 },
      followers: [{ x: 0, y: 0 }],
    };
    const direction: Direction = "R";
    const finishState: Board = {
      head: { x: 2, y: 0 },
      followers: [{ x: 1, y: 0 }],
    };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("step up and pull tail", () => {
    const startState: Board = {
      head: { x: 2, y: 2 },
      followers: [{ x: 1, y: 1 }],
    };
    const direction: Direction = "U";
    const finishState: Board = {
      head: { x: 2, y: 3 },
      followers: [{ x: 2, y: 2 }],
    };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("step right and pull tail", () => {
    const startState: Board = {
      head: { x: 2, y: 2 },
      followers: [{ x: 1, y: 1 }],
    };
    const direction: Direction = "R";
    const finishState: Board = {
      head: { x: 3, y: 2 },
      followers: [{ x: 2, y: 2 }],
    };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("pull tail diagonally", () => {
    const startState: Board = {
      head: { x: 1, y: 1 },
      followers: [{ x: 0, y: 0 }],
    };
    const direction: Direction = "U";
    const finishState: Board = {
      head: { x: 1, y: 2 },
      followers: [{ x: 1, y: 1 }],
    };
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

Deno.test("Day 9 Part 1 getFollowerMove", async (t) => {
  /**
   * .....    .....    .....
   * .TH.. -> .T.H. -> ..TH.
   * .....    .....    .....
   */
  await t.step("linear pull +x", () => {
    const headStart = { x: 2, y: 1 };
    const tailStart = { x: 1, y: 1 };
    const headMove = { x: 1, y: 0 };
    const headFinish = addVectors(headStart, headMove);
    const tailMove = getFollowerMove(headFinish, tailStart);
    const tailFinish = addVectors(tailStart, tailMove);
    assertEquals(headFinish, { x: 3, y: 1 });
    assertEquals(tailFinish, { x: 2, y: 1 });
  });

  /**
   * ...    ...    ...
   * .T.    .T.    ...
   * .H. -> ... -> .T.
   * ...    .H.    .H.
   * ...    ...    ...
   */
  await t.step("linear pull -y", () => {
    const headStart = { x: 1, y: 2 };
    const tailStart = { x: 1, y: 3 };
    const headMove = { x: 0, y: -1 };
    const headFinish = addVectors(headStart, headMove);
    const tailMove = getFollowerMove(headFinish, tailStart);
    const tailFinish = addVectors(tailStart, tailMove);
    assertEquals(headFinish, { x: 1, y: 1 });
    assertEquals(tailFinish, { x: 1, y: 2 });
  });

  /**
   * .....    .....    .....
   * .....    ..H..    ..H..
   * ..H.. -> ..... -> ..T..
   * .T...    .T...    .....
   * .....    .....    .....
   */

  await t.step("if different columns/rows, example 1", () => {
    const headStart = { x: 2, y: 2 };
    const tailStart = { x: 1, y: 1 };
    const headMove = { x: 0, y: 1 };
    const headFinish = addVectors(headStart, headMove);
    const tailMove = getFollowerMove(headFinish, tailStart);
    const tailFinish = addVectors(tailStart, tailMove);
    assertEquals(headFinish, { x: 2, y: 3 });
    assertEquals(tailFinish, { x: 2, y: 2 });
  });

  /**
   * .....    .....    .....
   * .....    .....    .....
   * ..H.. -> ...H. -> ..TH.
   * .T...    .T...    .....
   * .....    .....    .....
   */

  await t.step("if different columns/rows, example 2", () => {
    const headStart = { x: 2, y: 2 };
    const tailStart = { x: 1, y: 1 };
    const headMove = { x: 1, y: 0 };
    const headFinish = addVectors(headStart, headMove);
    const tailMove = getFollowerMove(headFinish, tailStart);
    const tailFinish = addVectors(tailStart, tailMove);
    assertEquals(headFinish, { x: 3, y: 2 });
    assertEquals(tailFinish, { x: 2, y: 2 });
  });
});

const testDataFromLongExample = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

Deno.test("Day 9 Part 2", async (t) => {
  await t.step("following a diagonal move", () => {
    const headStart = { x: 1, y: 0 };
    const tailStart = { x: 0, y: 0 };
    const headMove = { x: 1, y: 1 };
    const headFinish = addVectors(headStart, headMove);
    const tailMove = getFollowerMove(headFinish, tailStart);
    const tailFinish = addVectors(tailStart, tailMove);
    assertEquals(headFinish, { x: 2, y: 1 });
    assertEquals(tailFinish, { x: 1, y: 1 });
  });

  await t.step("example short", () => {
    assertEquals(part2(testDataFromExample), 1);
  });

  await t.step("example long", () => {
    assertEquals(part2(testDataFromLongExample), 36);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/09/input.txt`);
    assertEquals(part2(input), 2765);
  });
});
