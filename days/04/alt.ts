import { intersection, range } from "https://cdn.skypack.dev/ramda?dts";

type Elf = {
  startSector: number;
  endSector: number;
  allSectors: number[];
};

type ElfPair = {
  elfA: Elf;
  elfB: Elf;
};

function parseInput(input: string): ElfPair[] {
  return input.split("\n")
    .map((line) => {
      const [elfA, elfB] = line.split(",").map((elfStr) => {
        const [startSector, endSector] = elfStr.split("-").map(parseFloat);
        const allSectors = range(startSector, endSector + 1);
        return { startSector, endSector, allSectors };
      });

      return { elfA, elfB };
    });
}

function sectorsFullyOverlap({ elfA, elfB }: ElfPair): boolean {
  const overlapSize = intersection(elfA.allSectors, elfB.allSectors).length;
  return (overlapSize >= elfA.allSectors.length ||
    overlapSize >= elfB.allSectors.length);
}

function sectorsPartiallyOverlap({ elfA, elfB }: ElfPair): boolean {
  const overlapSize = intersection(elfA.allSectors, elfB.allSectors).length;
  return overlapSize > 0;
}

export function part1(input: string): number {
  const pairs = parseInput(input);
  return pairs.filter(sectorsFullyOverlap).length;
}

export function part2(input: string): number {
  const pairs = parseInput(input);
  return pairs.filter(sectorsPartiallyOverlap).length;
}
