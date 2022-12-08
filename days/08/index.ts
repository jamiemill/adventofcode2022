type TreeHeight = number;
type Row = TreeHeight[];
type Grid = Row[];

function parseInput(input: string): Grid {
  return input.split("\n").map((r) => r.split("").map(parseFloat));
}

function isVisible(grid: Grid, x: number, y: number): boolean {
  const thisTreeHeight = grid[y][x];

  const width = grid[0].length;
  const height = grid.length;
  if (x === 0 || x === (width - 1)) return true;
  if (y === 0 || y === (height - 1)) return true;

  const row = grid[y];
  const rowBefore = row.slice(0, x);
  const rowAfter = row.slice(x + 1);

  const column = grid.map((r) => r[x]);
  const columnBefore = column.slice(0, y);
  const columnAfter = column.slice(y + 1);

  const isShorter = (h: TreeHeight) => h < thisTreeHeight;
  const sectionsToCheck = [rowBefore, rowAfter, columnBefore, columnAfter];

  return !!sectionsToCheck.find((trees) => trees.every(isShorter));
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
