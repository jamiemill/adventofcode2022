import { uniq } from "https://cdn.skypack.dev/ramda?dts";

type Dir = {
  name: string;
  size?: number;
  files: File[];
  subdirs: Dir[];
  parent: null | Dir;
};
type File = { name: string; size: number };

const IS_FILE = /$\d+ /;

function parseInput(input: string): Dir {
  const lines = input.split("\n");
  const root: Dir = { name: "", files: [], subdirs: [], parent: null };
  let currentLocation = root;
  lines.forEach((line) => {
    const [first, second] = line.split(" ");
    if (first === "$") {
      const [_prompt, cmd, arg] = line.split(" ");
      if (cmd === "ls") {
        // nothing to do
      } else if (cmd === "cd") {
        if (arg === "..") {
          if (currentLocation.parent === null) throw "cannot go higher";
          currentLocation = currentLocation.parent;
        } else if (arg === "/") {
          currentLocation = root;
        } else {
          const subDir = currentLocation.subdirs.find((d) => d.name === arg);
          if (!subDir) throw `Subdir ${arg} not found`;
          currentLocation = subDir;
        }
      } else {
        throw `unrecognised cmd ${cmd}`;
      }
    } else if (first === "dir") {
      // dir row
      currentLocation.subdirs.push({
        name: second,
        files: [],
        subdirs: [],
        parent: currentLocation,
      });
    } else if (first.match(IS_FILE)) {
      // file row
      currentLocation.files.push({ name: second, size: parseInt(first) });
    }
  });
  return root;
}

export function part1(input: string): number {
  console.log(parseInput(input));

  return 0;
}

// export function part2(input: string): number {
//   return findUniqueSeq(input, 14) + 1;
// }
