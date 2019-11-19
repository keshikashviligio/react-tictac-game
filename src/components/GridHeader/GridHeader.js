import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {tryAgain} from "../../store/actions/actions";
import {initialState} from '../../store/reducers/reducer';
import './GridHeader.scss';

function GridHeader({winner, turn, isDraw, endGame, tryAgain}) {
  const [formData, setFormData] = useState({...initialState.gameConfig});

  const onInputChange = e => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const onFormSubmit = e => {
    e && e.preventDefault();
    tryAgain(formData);
  };

  let resultText = '';
  if (!endGame) {
    resultText = `It's ${turn.toUpperCase()}'s turn.`;
  }
  if (endGame && winner) {
    resultText = `${winner.toUpperCase()} won!`
  } else if (isDraw) {
    resultText = 'We have a draw!';
  }

  return (<div className="grid-header">
    <div className="">
      <div className="result-text">
        {resultText}
      </div>
      {
        endGame && (<div className="game-config">
          <form onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="cols">
                Cols:
              </label>
              <input onChange={onInputChange} type="number" name="cols" value={formData.cols}/>
            </div>
            <div className="form-group">
              <label htmlFor="rows">
                Rows:
              </label>
              <input onChange={onInputChange} type="number" name="rows" value={formData.rows}/>
            </div>
            <div className="form-group">
              <label htmlFor="winPathLength">
                Moves to win:
              </label>
              <input min={2} max={Math.min(formData.cols, formData.rows)} onChange={onInputChange} type="number"
                     name="movesToWin" value={formData.movesToWin}/>
            </div>
            <button type="submit">
              Start Game!
            </button>
          </form>
        </div>)
      }
    </div>
  </div>);
}

const mapStateToProps = ({winner, turn, isDraw, endGame}) => ({
  winner, turn, isDraw, endGame
});

const mapDispatchToProps = dispatch => {
  return {
    tryAgain(config) {
      dispatch(tryAgain(config));
    },
  };
};

GridHeader.propTypes = {
  winner: PropTypes.string,
  turn: PropTypes.string.isRequired,
  isDraw: PropTypes.bool.isRequired,
  endGame: PropTypes.bool.isRequired,
  tryAgain: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(GridHeader)
