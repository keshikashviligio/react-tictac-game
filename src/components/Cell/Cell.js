import React from 'react';
import PropTypes from 'prop-types';
import './Cell.scss';

function Cell({colIndex, addCell, rowIndex, symbol, turn, isActive}) {
  if(!symbol){
      return (<div className="cell empty-cell" onClick={() => addCell(rowIndex, colIndex, turn)} />)
  }
  return (<div className={`cell ${isActive ? 'active': ''}`}>{symbol} {rowIndex}-{colIndex}</div>)
}

Cell.propTypes = {
  addCell: PropTypes.func.isRequired,
  colIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  symbol: PropTypes.string,
};

Cell.defaultProps = {
  symbol: ''
};

export default Cell;
