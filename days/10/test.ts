import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { part1 } from "./index.ts";

const testDataFromExample = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

Deno.test("Day 10 Part 1", async (t) => {
  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), 13140);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/10/input.txt`);
    assertEquals(part1(input), 13220);
  });
});

// Deno.test("Day 10 Part 1 getFollowerMove", async (t) => {

//   await t.step("example long", () => {
//     assertEquals(part2(testDataFromExample), 0);
//   });

//   await t.step("answer", async () => {
//     const input = await Deno.readTextFile(`./days/10/input.txt`);
//     assertEquals(part2(input), 0);
//   });
// });
