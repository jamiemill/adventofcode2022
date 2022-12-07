import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { part1, part2 } from "./index.ts";

const testDataFromExample = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

Deno.test("Day 6 Part 1", async (t) => {
  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), 7);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/06/input.txt`);
    assertEquals(part1(input), 1093);
  });
});

Deno.test("Day 6 Part 2", async (t) => {
  await t.step("example", () => {
    assertEquals(part2(testDataFromExample), 19);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/06/input.txt`);
    assertEquals(part2(input), 3534);
  });
});
