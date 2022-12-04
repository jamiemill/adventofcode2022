import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { part1 } from "./index.ts";

const testDataFromExample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

Deno.test("Day 4 Part 1", async (t) => {
  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), 2);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/04/input.txt`);
    assertEquals(part1(input), 487);
  });
});
