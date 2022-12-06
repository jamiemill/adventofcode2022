import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { part1 } from "./index.ts";

const testDataFromExample = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

Deno.test("Day 4 Part 1", async (t) => {
  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), 7);
  });

  await t.step("answer", async () => {
    const input = await Deno.readTextFile(`./days/06/input.txt`);
    assertEquals(part1(input), 1093);
  });
});

// Deno.test("Day 4 Part 2", async (t) => {
//   await t.step("example", () => {
//     assertEquals(part2(testDataFromExample), "MCD");
//   });

//   await t.step("answer", async () => {
//     const input = await Deno.readTextFile(`./days/06/input.txt`);
//     assertEquals(part2(input), "");
//   });
// });
