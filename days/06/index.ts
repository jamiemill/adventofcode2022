import { uniq } from "https://cdn.skypack.dev/ramda?dts";

export function part1(input: string): number {
  let markerPosition: number | null = null;
  for (let i = 3; i < input.length; i++) {
    const lastFourReceived = input.slice(i - 3, i + 1).split("");
    if (uniq(lastFourReceived).length === 4) {
      markerPosition = i;
      break;
    }
  }
  if (markerPosition === null) {
    throw "Not found";
  }
  return markerPosition + 1;
}
