type TreeHeight = number;
type Row = TreeHeight[];
type Grid = Row[];

export function parseInput(input: string): Grid {
  return input.split("\n").map((r) => r.split("").map(parseFloat));
}

function beforeAndAfter<T>(
  list: Array<T>,
  index: number,
): [Array<T>, Array<T>] {
  return [list.slice(0, index), list.slice(index + 1)];
}

function isVisibleFromOutside(grid: Grid, x: number, y: number): boolean {
  const thisTreeHeight = grid[y][x];

  const width = grid[0].length;
  const height = grid.length;
  if (x === 0 || x === (width - 1)) return true;
  if (y === 0 || y === (height - 1)) return true;

  const row = grid[y];
  const [rowBefore, rowAfter] = beforeAndAfter(row, x);
  const column = grid.map((r) => r[x]);
  const [columnBefore, columnAfter] = beforeAndAfter(column, y);

  const isShorter = (h: TreeHeight) => h < thisTreeHeight;

  return !![rowBefore, rowAfter, columnBefore, columnAfter].find((trees) =>
    trees.every(isShorter)
  );
}

export function part1(input: string): number {
  const grid = parseInput(input);
  let visibleFromOutsideCount = 0;
  const width = grid[0].length;
  const height = grid.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isVisibleFromOutside(grid, x, y)) {
        visibleFromOutsideCount++;
      }
    }
  }
  return visibleFromOutsideCount;
}

function takeUntilFirstSameOrTaller(
  trees: TreeHeight[],
  tree: TreeHeight,
): TreeHeight[] {
  let i = trees.findIndex((t) => t >= tree);
  if (i === -1) {
    i = trees.length - 1;
  }
  return trees.slice(0, i + 1);
}

/**
 * the view score is:
 * the product of the count of trees seen in each direction
 * where 'seen' means:
 * - it's not blocked by any other tree (blocked means it's the same or taller than the starting tree)
 */
export function calculateViewScore(grid: Grid, x: number, y: number): number {
  const thisTreeHeight = grid[y][x];

  const row = grid[y];
  const [rowBefore, rowAfter] = beforeAndAfter(row, x);
  const column = grid.map((r) => r[x]);
  const [columnBefore, columnAfter] = beforeAndAfter(column, y);

  rowBefore.reverse();
  columnBefore.reverse();

  return [rowBefore, rowAfter, columnBefore, columnAfter].map((trees) =>
    takeUntilFirstSameOrTaller(trees, thisTreeHeight).length
  ).reduce((res, direction) => res * direction, 1);
}

export function part2(input: string): number {
  const grid = parseInput(input);
  let bestScore = 0;
  const width = grid[0].length;
  const height = grid.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const score = calculateViewScore(grid, x, y);
      if (score > bestScore) {
        bestScore = score;
      }
    }
  }
  return bestScore;
}
