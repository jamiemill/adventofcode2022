import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { calculateViewScore, parseInput, part1, part2 } from "./index.ts";

const testDataFromExample = `30373
25512
65332
33549
35390`;

Deno.test("Day 8 Part 1", async (t) => {
  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), 21);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/08/input.txt`);
    assertEquals(part1(input), 1827);
  });
});

Deno.test("Day 8 Part 2", async (t) => {
  await t.step("calcaulteViewScore", () => {
    const grid = parseInput(testDataFromExample);
    const result = calculateViewScore(grid, 2, 1);
    assertEquals(result, 4);
  });
  await t.step("example", () => {
    assertEquals(part2(testDataFromExample), 8);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/08/input.txt`);
    assertEquals(part2(input), 335580);
  });
});
