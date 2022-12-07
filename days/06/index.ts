import { uniq } from "https://cdn.skypack.dev/remeda?dts";

function findUniqueSeq(input: string, length: number): number {
  let endOfSeq: number | null = null;
  for (let i = (length - 1); i < input.length; i++) {
    const candidateSeq = input.slice(i - (length - 1), i + 1).split("");
    if (uniq(candidateSeq).length === length) {
      endOfSeq = i;
      break;
    }
  }
  if (endOfSeq === null) {
    throw "Not found";
  }
  return endOfSeq;
}

export function part1(input: string): number {
  return findUniqueSeq(input, 4) + 1;
}

export function part2(input: string): number {
  return findUniqueSeq(input, 14) + 1;
}
