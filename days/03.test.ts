import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import {parseInput,findDuplicateItem,getItemPriority,splitIntoThrees,part1} from "./03.ts";


const testDataFromExample =
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;


Deno.test("Day 3 Part 1", async (t) => {

    await t.step("parsesInput", () => {
        const exampleInput = `aBcD\neFgH`;
        const expected = [
            {
                compartmentA: ["a","B"],
                compartmentB: ["c","D"]
            },
            {
                compartmentA: ["e","F"],
                compartmentB: ["g","H"]
            }
        ]
        assertEquals(parseInput(exampleInput), expected);
    });

    await t.step("findsDuplicate", () => {
        const rucksack = {compartmentA:["Z","F"], compartmentB:["Z","H"]};
        assertEquals(findDuplicateItem(rucksack), "Z");
    })

    await t.step("gets item priority lowercase", () => {
        assertEquals(getItemPriority("a"), 1);
    })


    await t.step("gets item priority uppercase", () => {
        assertEquals(getItemPriority("A"), 27);
    })

    await t.step("example", () => {
        assertEquals(part1(testDataFromExample), 157);
    })

    await t.step("answer", async () => {
        const input = await Deno.readTextFile(`./days/03.txt`);
        assertEquals(part1(input), 8153);
    });
});

Deno.test("Day 3 Part 2", async (t) => {

    await t.step("split into threes", () => {
        const input = [1,2,3,4,5,6];
        assertEquals(splitIntoThrees(input), [[1,2,3],[4,5,6]]);
    });

    // await t.step("example", () => {
    //     assertEquals(part2(testDataFromExample), 0);
    // })

    // await t.step("answer", async () => {
    //     const input = await Deno.readTextFile(`./days/03.txt`);
    //     assertEquals(part2(input), 10334);
    // });
});
