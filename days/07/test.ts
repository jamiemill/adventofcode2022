import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { part1 } from "./index.ts";

const testDataFromExample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

Deno.test("Day 7 Part 1", async (t) => {
  await t.step("example", () => {
    assertEquals(part1(testDataFromExample), 0);
  });

  // await t.step("answer", async () => {
  //   const input = await Deno.readTextFile(`./days/06/input.txt`);
  //   assertEquals(part1(input), 1093);
  // });
});

// Deno.test("Day 7 Part 2", async (t) => {
//   await t.step("example", () => {
//     assertEquals(part2(testDataFromExample), 19);
//   });

//   await t.step("answer", async () => {
//     const input = await Deno.readTextFile(`./days/06/input.txt`);
//     assertEquals(part2(input), 3534);
//   });
// });
