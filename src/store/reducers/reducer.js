import { X, O } from '../../utils/constants';
import {checkWinner, generateGrid} from '../../utils/gameLogic';

export const initialState = {
  gameConfig: {
    rows: 3,
    cols: 3,
    movesToWin: 3,
  },
  grid: {
    0: ['', '', ''],
    1: ['', '', ''],
    2: ['', '', ''],
  },
  winner: '',
  winnerPositions: {},
  turn: '',
  isDraw: false,
  endGame: true,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CELL':
      const {symbol, row, position} = action;
      const newState = {...state};
      newState.grid[row][position] = symbol;

      const result = checkWinner(newState.grid, newState.turn, state.endGame, newState.gameConfig);
      // console.log(result);
      newState.endGame = result.endGame;
      newState.winner = result.winner;
      newState.isDraw = result.winner === '' && result.endGame;

      if (!newState.endGame) {
        newState.turn = newState.turn === O ? X : O;
      }else if(newState.isDraw === false){
        newState.winnerPositions = result.positions;
      }

      return newState;
    case 'TRY_AGAIN':
      return {
        ...initialState,
        turn: X,
        endGame: false,
        grid: generateGrid(action.config.cols, action.config.rows),
        gameConfig: action.config
      };
    default:
      return state;
  }
};
