import React from 'react';
import PropTypes from 'prop-types';
import {addCell} from '../../store/actions/actions';
import {connect} from 'react-redux';
import Cell from "../Cell/Cell";
import './Grid.scss';

function Grid({grid, endGame, winnerPositions, turn, addCell}) {
  const markCell = (rowIndex, position, symbol) => {
    !endGame && addCell(rowIndex, position, symbol);
  };

  return (
    <div className={'grid'}>
      {
        Object.keys(grid)
          .map(rowIndex => {
            return (
              <div className={`row row${rowIndex}`} key={rowIndex}>
                {
                  grid[rowIndex].map((symbol, colIndex) => {
                    return <Cell key={`${rowIndex}-${colIndex}`}
                                 isActive={winnerPositions[`${rowIndex}-${colIndex}`] === true}
                                 symbol={symbol}
                                 turn={turn}
                                 rowIndex={rowIndex}
                                 addCell={markCell}
                                 colIndex={colIndex}/>;
                  })
                }
              </div>
            );
          })
      }
    </div>
  );
}

Grid.propTypes = {
  grid: PropTypes.object.isRequired,
  endGame: PropTypes.bool.isRequired,
  winnerPositions: PropTypes.object,
  addCell: PropTypes.func.isRequired,
  turn: PropTypes.string,
};

const mapStateToProps = ({grid, turn, endGame, winnerPositions}) => ({
  grid, turn, endGame, winnerPositions
});

const mapDispatchToProps = dispatch => {
  return {
    addCell(rowIndex, position, symbol) {
      dispatch(addCell(rowIndex, position, symbol));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
