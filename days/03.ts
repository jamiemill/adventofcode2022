type Item = string;

type Rucksack = {
  compartments: Array<Array<Item>> // why can't I make this a tuple for exactly two compartments?
}

export function parseInput(input:string):Rucksack[] {
  return input.split("\n").map(line => {
    return {compartments: [
      line.slice(0, line.length/2).split(""),
      line.slice(-line.length/2).split("")
    ]}
  })
}

export function findDuplicateItem(rucksack:Rucksack):Item {
  let duplicateItem: Item | null = null;
  rucksack.compartments[0].forEach(item => {
    if (rucksack.compartments[1].includes(item)) {
      duplicateItem = item;
    }
  })
  if (duplicateItem === null) {
    throw "Didn't find a duplicate";
  }
  return duplicateItem;
}

const priorityMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function getItemPriority(item:Item):number {
  return priorityMap.indexOf(item) + 1;
}

function sumOfDuplicatePriorities(duplicates:Item[]) {
  return duplicates.map(getItemPriority).reduce((sum,priority) => sum+priority, 0);
}

export function part1(input:string):number {
  const rucksacks = parseInput(input);
  const duplicates = rucksacks.map(findDuplicateItem);
  return sumOfDuplicatePriorities(duplicates);
}