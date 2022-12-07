import { flatten, last, sum } from "https://cdn.skypack.dev/ramda?dts";

type Dir = {
  name: string;
  files: File[];
  subdirs: Dir[];
};
type File = { name: string; size: number };

const IS_CMD = /^\$ /;
const IS_DIR = /^dir /;
const IS_FILE = /^\d+ /;

// should I build a tree of dirs or a flat list of paths - what will be easiest?
// assuming that they didn't execute `ls` more than once, or change to the same dir more than once.

function buildTree(input: string): Dir {
  const root: Dir = { name: "/", files: [], subdirs: [] };
  let currentPath = [root];

  const lines = input.split("\n");
  lines.forEach((line) => {
    if (line.match(IS_CMD)) {
      const [_prompt, cmd, arg] = line.split(" ");
      if (cmd === "ls") {
        // nothing to do - the next lines can be identified other ways
      } else if (cmd === "cd") {
        if (arg === "..") {
          currentPath.pop();
        } else if (arg === "/") {
          currentPath = [root];
        } else {
          const subDir = last(currentPath)?.subdirs
            .find((d) => d.name === arg);
          if (!subDir) throw `Subdir ${arg} not found`;
          currentPath.push(subDir);
        }
      } else {
        throw `unrecognised cmd ${cmd}`;
      }
    } else if (line.match(IS_DIR)) {
      const [_prefix, name] = line.split(" ");
      last(currentPath)?.subdirs.push({
        name,
        files: [],
        subdirs: [],
      });
    } else if (line.match(IS_FILE)) {
      const [size, name] = line.split(" ");
      last(currentPath)?.files.push({
        name,
        size: parseInt(size),
      });
    } else {
      throw `Unrecognised line ${line}`;
    }
  });
  return root;
}

function sizeOf(dir: Dir): number {
  const sizeThisLevel = sum(dir.files.map((f) => f.size));
  const sizeChildLevels = sum(dir.subdirs.map(sizeOf));
  return sum([sizeThisLevel, sizeChildLevels]);
}

function listAllDirs(dir: Dir): Dir[] {
  return [dir].concat(flatten(dir.subdirs.map(listAllDirs)));
}

function findDirectoriesSmallerThan(dir: Dir, size: number): Dir[] {
  return listAllDirs(dir)
    .filter((d) => sizeOf(d) < size);
}

function parseInput(input: string): Dir {
  return buildTree(input);
}

export function part1(input: string): number {
  const root = parseInput(input);
  const smallOnes = findDirectoriesSmallerThan(root, 100000);
  return sum(smallOnes.map((dir) => sizeOf(dir)));
}

const bySize = (a: Dir, b: Dir) => sizeOf(a) - sizeOf(b);

function findSmallestToFreeUp(dir: Dir, needToDelete: number): Dir {
  return listAllDirs(dir)
    .filter((d) => sizeOf(d) > needToDelete)
    .sort(bySize)[0];
}

export function part2(input: string): number {
  const root = parseInput(input);
  const totalUsed = sizeOf(root);
  const diskSize = 70000000;
  const spaceNeeded = 30000000;
  const freeSpace = diskSize - totalUsed;
  const needToDelete = spaceNeeded - freeSpace;
  const dirToDelete = findSmallestToFreeUp(root, needToDelete);
  return sizeOf(dirToDelete);
}
