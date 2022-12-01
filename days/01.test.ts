import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import {part1, part2} from "./01.ts";


const testDataFromExample =
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;


Deno.test("Day 1 Part 1", async (t) => {
    await t.step("example", () => {
        assertEquals(part1(testDataFromExample), 24000);
    })

    await t.step("answer", async () => {
        const input = await Deno.readTextFile(`./days/01.txt`);
        assertEquals(part1(input), 70374);
    });
});

Deno.test("Day 1 Part 2", async (t) => {
    await t.step("example", () => {
        assertEquals(part2(testDataFromExample), 45000);
    })

    await t.step("answer", async () => {
        const input = await Deno.readTextFile(`./days/01.txt`);
        assertEquals(part2(input), 204610);
    });
});
