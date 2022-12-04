import { intersection, range } from "https://cdn.skypack.dev/ramda?dts";

// not using tuples for two elves or start/end range pair because I don't know how to map over them without type error
type SectorStartOrFinish = number;
type Elf = Array<SectorStartOrFinish>;
type Pair = Array<Elf>;

function parseInput(input: string): Pair[] {
  return input.split("\n")
    .map((pairLine) =>
      pairLine.split(",").map((elf) => elf.split("-").map(parseFloat))
    );
}

function expandSectors(pairs: Pair[]): Pair[] {
  return pairs.map((pair) =>
    pair.map((elfRange) => range(elfRange[0], elfRange[1] + 1))
  );
}

function sectorsFullyOverlap(pairOfElfs: Elf[]): boolean {
  const [elf1, elf2] = pairOfElfs;
  const overlapSize = intersection(elf1, elf2).length;
  return (overlapSize >= elf1.length ||
    overlapSize >= elf2.length);
}

// alternative to compare start and end instead
// function sectorRangeOverlap(pairOfElfs: Elf[]): boolean {
//   const [elf1, elf2] = pairOfElfs;
//   return (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) ||
//     (elf2[0] <= elf1[0] && elf2[1] >= elf1[1]);
// }

export function part1(input: string): number {
  const pairs = parseInput(input);
  const pairsExpanded = expandSectors(pairs);
  return pairsExpanded.filter(sectorsFullyOverlap).length;
}

function sectorsPartiallyOverlap(pairOfElfs: Elf[]): boolean {
  const [elf1, elf2] = pairOfElfs;
  const overlap = intersection(elf1, elf2);
  return overlap.length > 0;
}

export function part2(input: string): number {
  const pairs = parseInput(input);
  const pairsExpanded = expandSectors(pairs);
  return pairsExpanded.filter(sectorsPartiallyOverlap).length;
}
