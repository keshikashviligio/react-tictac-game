export function checkWinner(grid, player, endGame, config) {
  const movesToWin = config.movesToWin;
  let x, y, z, matches;

  const result = {endGame: false, winner: null, positions: {}};
  const gridCells = Object.values(grid).flat();
  const gridIsFull = gridCells.filter(val => val !== '').length === gridCells.length;

  if (endGame === false && !gridIsFull) {
    // Left to right Horizontal
    for (x = 0; x < config.rows; x++) {
      matches = 0;
      for (y = 0; y < config.cols; y++) {
        if (grid[x][y] === player) {
          matches++;
          result.positions[`${x}-${y}`] = true;
          if (matches >= movesToWin) {
            result.endGame = true;
            result.winner = player;

            return result;
          }
        } else {
          result.positions = {};
          matches = 0;
        }
      }
    }
    // top to bottom Vertical
    for (x = 0; x < config.cols; x++) {
      matches = 0;
      for (y = 0; y < config.rows; y++) {
        if (grid[y][x] === player) {
          matches++;
          result.positions[`${y}-${x}`] = true;
          if (matches >= movesToWin) {
            result.endGame = true;
            result.winner = player;

            return result;
          }
        } else {
          result.positions = {};
          matches = 0;
        }
      }
    }
    // top left bottom right
    for (x = 0; x < config.rows - movesToWin + 1; x++) {
      for (y = 0; y < config.cols - movesToWin + 1; y++) {
        matches = 0;
        for (z = 0; z < movesToWin; z++) {
          if (grid[x + z][y + z] === player) {
            matches++;
            result.positions[`${x + z}-${y + z}`] = true;
            if (matches >= movesToWin) {
              result.endGame = true;
              result.winner = player;

              return result;
            }
          }else{
            result.positions = {};
          }
        }
      }
    }
    // top right bottom left
    for (x = 0; x < (config.rows - movesToWin + 1); x++) {
      for (y = config.cols - 1; y >= config.cols - movesToWin - 1; y--) {
        matches = 0;
        for (z = 0; z < movesToWin; z++) {
          if (grid[x + z][y - z] === player) {
            matches++;
            result.positions[`${x + z}-${y - z}`] = true;
            if (matches >= movesToWin) {
              result.endGame = true;
              result.winner = player;

              return result;
            }
          }else{
            result.positions = {};
          }
        }
      }
    }
  } else {
    result.endGame = true;
    result.winner = '';
  }
  return result;
}

export function generateGrid(x, y) {
  const grid = {};
  for (let i = 0; i < parseInt(y); i++) {
    grid[i] = Array(parseInt(x)).fill('');
  }
  return grid;
}
