import {intersection, splitAt, splitEvery, sum, uniq} from "https://cdn.skypack.dev/ramda?dts";

type Item = string;

export type Rucksack = {
  compartmentA: Item[];
  compartmentB: Item[];
};

export function parseInput(input: string): Rucksack[] {
  return input.split("\n").map((line) => {
    const items = line.split("");
    const [compartmentA,compartmentB] = splitAt(items.length/2, items)
    return {
      compartmentA,
      compartmentB
    };
  });
}

export function findDuplicateItem(rucksack: Rucksack): Item {
  const duplicates = intersection(rucksack.compartmentA, rucksack.compartmentB);
  if (duplicates.length !== 1) {
    throw "Expected one duplicate";
  }
  return duplicates[0];
}

export function getItemPriority(item: Item): number {
  const priorityOrder = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return priorityOrder.indexOf(item) + 1;
}

export function part1(input: string): number {
  const rucksacks = parseInput(input);
  const duplicates = rucksacks.map(findDuplicateItem);
  return sum(duplicates.map(getItemPriority));
}

function allUniqueItemsInRucksack(rucksack: Rucksack): Item[] {
  return uniq(rucksack.compartmentA.concat(rucksack.compartmentB));
}

export function findCommonItem(rucksacks: Rucksack[]): Item {
  let candidates = allUniqueItemsInRucksack(rucksacks[0]);
  for (let i = 1; i < rucksacks.length; i++) {
    const nextRucksackUniqueItems = allUniqueItemsInRucksack(rucksacks[i]);
    candidates = candidates.filter((item) => nextRucksackUniqueItems.includes(item));
  }
  
  if (candidates.length === 0) {
    throw "Didn't find anything common to all rucksacks";
  }
  if (candidates.length > 1) {
    throw "Found more than one item common to all rucksacks";
  }
  return candidates[0];
}

export function part2(input: string): number {
  const groups = splitEvery(3, parseInput(input));
  const commonItemOfEachGroups = groups.map(findCommonItem);
  const priorities = commonItemOfEachGroups.map(getItemPriority);
  return priorities.reduce((sum, priority) => sum + priority, 0);
}
