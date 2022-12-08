type TreeHeight = number;
type Row = TreeHeight[];
type Grid = Row[];

function parseInput(input: string): Grid {
  return input.split("\n").map((r) => r.split("").map(parseFloat));
}

function beforeAndAfter<T>(
  list: Array<T>,
  index: number,
): [Array<T>, Array<T>] {
  return [list.slice(0, index), list.slice(index + 1)];
}

function isVisible(grid: Grid, x: number, y: number): boolean {
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
  let visibleCount = 0;
  const width = grid[0].length;
  const height = grid.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isVisible(grid, x, y)) {
        visibleCount++;
      }
    }
  }
  return visibleCount;
}
