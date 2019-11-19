export const addCell = (row, position, symbol) => ({
  type: 'ADD_CELL',
  symbol,
  row,
  position
});

export const tryAgain = (config) => ({
  type: 'TRY_AGAIN',
  config
});
