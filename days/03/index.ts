type Item = string;

export type Rucksack = {
  compartmentA: Item[];
  compartmentB: Item[];
};

export function parseInput(input: string): Rucksack[] {
  return input.split("\n").map((line) => {
    const items = line.split("");
    return {
      compartmentA: items.slice(0, items.length / 2),
      compartmentB: items.slice(-items.length / 2),
    };
  });
}

export function findDuplicateItem(rucksack: Rucksack): Item {
  let duplicateItem: Item | null = null;
  rucksack.compartmentA.forEach((item) => {
    if (rucksack.compartmentB.includes(item)) {
      duplicateItem = item;
    }
  });
  if (duplicateItem === null) {
    throw "Didn't find a duplicate";
  }
  return duplicateItem;
}

const priorityOrder = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function getItemPriority(item: Item): number {
  return priorityOrder.indexOf(item) + 1;
}

export function part1(input: string): number {
  const rucksacks = parseInput(input);
  const duplicates = rucksacks.map(findDuplicateItem);
  return duplicates.map(getItemPriority).reduce(
    (sum, priority) => sum + priority,
    0,
  );
}

// use radash?
export function splitIntoThrees<T>(input: Array<T>): Array<Array<T>> {
  const threes: Array<Array<T>> = [];
  for (let i = 0; i < input.length; i++) {
    if (i % 3 === 0) threes.push([]);
    threes[threes.length - 1].push(input[i]);
  }
  return threes;
}

function allUniqueItemsInRucksack(rucksack: Rucksack): Set<Item> {
  return new Set(rucksack.compartmentA.concat(rucksack.compartmentB));
}

export function findCommonItem(rucksacks: Rucksack[]): Item {
  let candidates: Set<Item> = allUniqueItemsInRucksack(rucksacks[0]);
  for (let i = 1; i < rucksacks.length; i++) {
    const nextRucksackUniqueItems = allUniqueItemsInRucksack(rucksacks[i]);
    candidates = new Set(
      [...candidates].filter((item) => nextRucksackUniqueItems.has(item)),
    );
  }
  if (candidates.size === 0) {
    throw "Didn't find anything common to all rucksacks";
  }
  if (candidates.size > 1) {
    throw "Found more than one item common to all rucksacks";
  }
  return candidates.values().next().value;
}

export function part2(input: string): number {
  const groups = splitIntoThrees(parseInput(input));
  const commonItemOfEachGroups = groups.map(findCommonItem);
  const priorities = commonItemOfEachGroups.map(getItemPriority);
  return priorities.reduce((sum, priority) => sum + priority, 0);
}
