import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import {
  addVectors,
  Board,
  Direction,
  getFollowerMove,
  part1,
  part2,
  step,
  Vector,
} from "./index.ts";
import { renderBoard2 } from "./render.ts";

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
    const startState: Board = { head: { x: 2, y: 2 }, tail: { x: 1, y: 1 } };
    const direction: Direction = "U";
    const finishState: Board = { head: { x: 2, y: 3 }, tail: { x: 2, y: 2 } };
    assertEquals(step(startState, direction), finishState);
  });

  await t.step("step right and pull tail", () => {
    const startState: Board = { head: { x: 2, y: 2 }, tail: { x: 1, y: 1 } };
    const direction: Direction = "R";
    const finishState: Board = { head: { x: 3, y: 2 }, tail: { x: 2, y: 2 } };
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

const testDataFromLongExample = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

Deno.test("Day 9 Part 2", async (t) => {
  // TODO Why is this passing?
  await t.step("a diagonal move should be copied by followers", () => {
    const head = { x: 5, y: 5 };
    const move = { x: 1, y: 1 }; // diagonal move
    const newHead = { x: 6, y: 6 };
    const tail = { x: 4, y: 4 };
    const expectTailMove = { x: 1, y: 1 };
    assertEquals(getFollowerMove(newHead, tail, move), expectTailMove);
  });

  await t.step("example short", () => {
    // right answer because tail doesn't move,
    // but when rendered the middle of the rope
    // isn't following correctly
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

Deno.test("Day 9 try again part 1", async (t) => {
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
    const tailMove = getFollowerMove(headFinish, tailStart, headMove);
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
    const tailMove = getFollowerMove(headFinish, tailStart, headMove);
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
    const tailMove = getFollowerMove(headFinish, tailStart, headMove);
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
    const tailMove = getFollowerMove(headFinish, tailStart, headMove);
    const tailFinish = addVectors(tailStart, tailMove);
    assertEquals(headFinish, { x: 3, y: 2 });
    assertEquals(tailFinish, { x: 2, y: 2 });
  });
});

/**
 *
 *
 start:
.....................
.....................
..............H......
..........*321.......

head moves vertically up

.....................
.....................
..............H......
.....................
..........*321.......

1 moves diagonally to follow it

.....................
.....................
..............H......
..............1...... <-- 1 went to the right place (move 1,1)
..........*32........

1 made a diagonal move (1,1).
so. now 2 and 1 are more than 1 apart in the x axis. (gap = 2,1)
and is not in same row or column as 1

what happens next in my code - 2 moves sideways,
which maintains the correct distance but doesn't make a diagonal move
.....................
.....................
..............H......
..............1...... <-- 2 should have jumped next to 1 (move 1,1)
..........*3.2.......     but instead moved 1,0

since they're only paying attention to their local leader's last move
is this a problem - they need to also know the head move?


expected result
.....................
.....................
..............H......
...........4321...... <-- 2,3,4 should have jumped next to 1 (move 1,1)
..........*..........
                          5 shouldn't move because 4 is still touching it

 */

Deno.test("Day 9 try again part 2", async (t) => {
  // THIS IS THE KEY FAILILNG TEST
  // in this test head is 1 in the diagram above, and tail is 2.
  await t.step("following a diagonal move", () => {
    const headStart = { x: 1, y: 0 };
    const tailStart = { x: 0, y: 0 };
    // console.log(renderBoard2({ head: headStart, followers: [tailStart] }));
    const headMove = { x: 1, y: 1 };
    const headFinish = addVectors(headStart, headMove);
    const tailMove = getFollowerMove(headFinish, tailStart, headMove);
    const tailFinish = addVectors(tailStart, tailMove);
    // console.log(renderBoard2({ head: headFinish, followers: [tailFinish] }));
    assertEquals(headFinish, { x: 2, y: 1 });
    assertEquals(tailFinish, { x: 1, y: 1 }); // this fails, y is actually 0
  });
});
