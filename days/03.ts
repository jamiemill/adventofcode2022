type Item = string;

type Rucksack = {
  compartmentA: Item[],
  compartmentB: Item[]
}

export function parseInput(input:string):Rucksack[] {
  return input.split("\n").map(line => {
    const items = line.split("");
    return {
      compartmentA: items.slice(0, items.length/2),
      compartmentB: items.slice(-items.length/2)
    };
  })
}

export function findDuplicateItem(rucksack:Rucksack):Item {
  let duplicateItem: Item | null = null;
  rucksack.compartmentA.forEach(item => {
    if (rucksack.compartmentB.includes(item)) {
      duplicateItem = item;
    }
  })
  if (duplicateItem === null) {
    throw "Didn't find a duplicate";
  }
  return duplicateItem;
}

const priorityOrder = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function getItemPriority(item:Item):number {
  return priorityOrder.indexOf(item) + 1;
}

function sumOfDuplicatePriorities(duplicates:Item[]) {
  return duplicates.map(getItemPriority).reduce((sum,priority) => sum+priority, 0);
}

export function part1(input:string):number {
  const rucksacks = parseInput(input);
  const duplicates = rucksacks.map(findDuplicateItem);
  return sumOfDuplicatePriorities(duplicates);
}

// use radash?
export function splitIntoThrees<T>(input:Array<T>):Array<Array<T>> {
  const threes:Array<Array<T>> = [];
  for (let i = 0; i < input.length; i++) {
    if (i%3 === 0) {threes.push([])}
    threes[threes.length-1].push(input[i]);
  }
  return threes;
}

// export function part2(input:string):number {

// }