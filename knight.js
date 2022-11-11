import {
  createBoard,
  findCell,
  isValidMove,
  isVisited,
} from './createBoard.js';

const createKnight = () => {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  return { moves };
};

const findPath = (cell, startingArr) => {
  const arr = [];
  while (cell.lastMove !== null) {
    arr.push([cell.x, cell.y]);
    cell = cell.lastMove;
  }
  arr.push(startingArr);
  arr.reverse();
  let str = '';
  arr.forEach((item) => {
    str += `[${item}] `;
  });
  return str;
};

const knightMoves = (sourceArr, destArr, board = createBoard(8)) => {
  const knight = createKnight();
  const q = [];
  q.push(sourceArr);

  // initialize board
  board.forEach((cell) => {
    cell.visited = false;
    cell.steps = 0;
  });

  // visit sourceArr
  const starting = findCell(sourceArr, board);

  starting.visited = true;

  while (q.length) {
    const frontQ = findCell(q.shift(), board);

    // return moves if current cell is destination
    if (frontQ.x === destArr[0] && frontQ.y === destArr[1]) {
      let moves = 'moves';
      if (frontQ.steps < 2) moves = 'move';
      const path = findPath(frontQ, sourceArr);
      const msg = `- Minimum of ${frontQ.steps} ${moves}\n- Path taken:\n ${path}\n`;
      return msg;
    }

    // go through possible moves
    for (let i = 0; i < 8; i++) {
      const { moves } = knight;
      const newX = frontQ.x + moves[i][0];
      const newY = frontQ.y + moves[i][1];
      const newPos = [newX, newY];
      const cell = findCell(newPos, board);

      if (isValidMove(newX, newY, board) && !isVisited(cell)) {
        cell.lastMove = frontQ;
        cell.visited = true;
        cell.steps += 1 + frontQ.steps;
        q.push([newX, newY]);
      }
    }
  }

  // if error
  return -1;
};

export default knightMoves;
