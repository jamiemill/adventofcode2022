import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import {part1} from "./02.ts";


const testDataFromExample =
`A Y
B X
C Z`;


Deno.test("Day 2 Part 1", async (t) => {
    await t.step("example", () => {
        assertEquals(part1(testDataFromExample), 15);
    })

    await t.step("answer", async () => {
        const input = await Deno.readTextFile(`./days/02.txt`);
        assertEquals(part1(input), 10404);
    });
});

// Deno.test("Day 2 Part 2", async (t) => {
//     await t.step("example", () => {
//         assertEquals(part2(testDataFromExample), 0);
//     })

//     await t.step("answer", async () => {
//         const input = await Deno.readTextFile(`./days/02.txt`);
//         assertEquals(part2(input), 0);
//     });
// });
