class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.steps = 0;
    this.lastMove = null;
  }
}

export const createBoard = (n) => {
  const board = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      board.push(new Cell(i, j));
    }
  }
  return board;
};

export const isValidMove = (x, y, board) => {
  const boardSize = Math.sqrt(board.length);
  if (x < 0 || y < 0 || x >= boardSize || y >= boardSize) return false;
  return true;
};

export const isVisited = (cell) => cell.visited;

export const findCell = ([x, y], board) => {
  const cell = board.find((c) => c.x === x && c.y === y);

  return cell;
};
