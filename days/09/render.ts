import { Board, Board2, Vector } from "./index.ts";

export function drawCoords(coords: Vector): string {
  return `${coords.x},${coords.y}`;
}
export function drawBoard(board: Board): string {
  return `head: ${drawCoords(board.head)} tail: ${drawCoords(board.tail)}`;
}
export function drawBoard2(board: Board2): string {
  return `head: ${drawCoords(board.head)} tail: \n${
    board.followers.map((f) => `* ${drawCoords(f)}`).join("\n")
  }`;
}

export function renderBoard2(board: Board2): string {
  const [minX, maxX, minY, maxY] = [-10, 10, -10, 10];
  let out = "";
  for (let y = maxY; y >= minY; y--) {
    for (let x = minX; x <= maxX; x++) {
      let cell = ".";
      const headWithIdentity: { id: string; pos: Vector } = {
        id: "H",
        pos: board.head,
      };
      const followersWithIdentity: { id: string; pos: Vector }[] = board
        .followers.map((f, i) => ({ id: (i + 1).toString(), pos: f }));
      const inCell = [headWithIdentity].concat(followersWithIdentity).filter(
        (fi) => fi.pos.x === x && fi.pos.y === y,
      );
      if (inCell.length > 1) {
        cell = "*";
      } else if (inCell.length === 1) {
        cell = inCell[0].id;
      }
      out += cell;
    }
    out += "\n";
  }
  return out;
}
