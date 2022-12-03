import {
  compose,
  intersection,
  map,
  splitAt,
  splitEvery,
  sum,
  union,
} from "https://cdn.skypack.dev/ramda?dts";

type Item = string;

export type Rucksack = {
  compartmentA: Item[];
  compartmentB: Item[];
};

export function parseInput(input: string): Rucksack[] {
  return input.split("\n").map((line) => {
    const items = line.split("");
    const [compartmentA, compartmentB] = splitAt(items.length / 2, items);
    return {
      compartmentA,
      compartmentB,
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
  return compose(
    sum,
    map(getItemPriority),
    map(findDuplicateItem),
    parseInput,
  )(input);
}

function uniqRucksackItems(rucksack: Rucksack): Item[] {
  return union(rucksack.compartmentA, rucksack.compartmentB);
}

export function findCommonItem(rucksacks: Rucksack[]): Item {
  const [first, ...rest] = rucksacks;
  const commonItems = rest.reduce(
    (acc, r) => intersection(acc, uniqRucksackItems(r)),
    uniqRucksackItems(first),
  );

  if (commonItems.length !== 1) {
    throw "Expected one common item";
  }
  return commonItems[0];
}

export function part2(input: string): number {
  return compose(
    sum,
    map(getItemPriority),
    map(findCommonItem),
    splitEvery(3),
    parseInput,
  )(input);
}
