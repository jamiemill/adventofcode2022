import { flatten, sum } from "https://cdn.skypack.dev/ramda?dts";

type Dir = {
  name: string;
  files: File[];
  subdirs: Dir[];
};
type File = { name: string; size: number };

const IS_FILE = /^\d+ /;

// should I build a tree of dirs or a flat list of paths - what will be easiest?
// assuming that they didn't execute `ls` more than once, or change to the same dir more than once.

function buildTree(input: string): Dir {
  const lines = input.split("\n");
  const root: Dir = { name: "/", files: [], subdirs: [] };
  let currentLocation = [root];
  lines.forEach((line) => {
    const [first, second] = line.split(" ");
    if (first === "$") {
      const [_prompt, cmd, arg] = line.split(" ");
      if (cmd === "ls") {
        // nothing to do - the next lines can be identified other ways
      } else if (cmd === "cd") {
        if (arg === "..") {
          currentLocation.pop();
        } else if (arg === "/") {
          currentLocation = [root];
        } else {
          const subDir = currentLocation[currentLocation.length - 1].subdirs
            .find((
              d,
            ) => d.name === arg);
          if (!subDir) throw `Subdir ${arg} not found`;
          currentLocation.push(subDir);
        }
      } else {
        throw `unrecognised cmd ${cmd}`;
      }
    } else if (first === "dir") {
      currentLocation[currentLocation.length - 1].subdirs.push({
        name: second,
        files: [],
        subdirs: [],
      });
    } else if (line.match(IS_FILE)) {
      currentLocation[currentLocation.length - 1].files.push({
        name: second,
        size: parseInt(first),
      });
    }
  });
  return root;
}

function calculateSize(dir: Dir): number {
  const sizeThisLevel = sum(dir.files.map((f) => f.size));
  const sizeChildLevels = sum(dir.subdirs.map(calculateSize));
  return sum([sizeThisLevel, sizeChildLevels]);
}

function listAllDirs(dir: Dir): Dir[] {
  return [dir].concat(flatten(dir.subdirs.map(listAllDirs)));
}

function findDirectoriesSmallerThan(dir: Dir, size: number): Dir[] {
  return listAllDirs(dir)
    .filter((d) => calculateSize(d) < size);
}

function parseInput(input: string): Dir {
  return buildTree(input);
}

export function part1(input: string): number {
  const root = parseInput(input);
  const smallOnes = findDirectoriesSmallerThan(root, 100000);
  return sum(smallOnes.map((dir) => calculateSize(dir)));
}

function findSmallestToFreeUp(dir: Dir, needToDelete: number): Dir {
  return listAllDirs(dir)
    .filter((d) => calculateSize(d) > needToDelete)
    .sort((a, b) => calculateSize(a) - calculateSize(b))[0];
}

export function part2(input: string): number {
  const root = parseInput(input);
  const totalUsed = calculateSize(root);
  const diskSize = 70000000;
  const spaceNeeded = 30000000;
  const freeSpace = diskSize - totalUsed;
  const needToDelete = spaceNeeded - freeSpace;
  const dirToDelete = findSmallestToFreeUp(root, needToDelete);
  return calculateSize(dirToDelete);
}
