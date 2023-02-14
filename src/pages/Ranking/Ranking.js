import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadScore } from '../../extras/functions';
import { resetScore } from '../../redux/actions/index';
import Header from '../../components/Header/Header';
import logo from '../../trivia.png';
import './Ranking.css';

class Ranking extends Component {
  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const top = loadScore().sort((a, b) => b.score - a.score);
    return (
      <div className="App-gamer">
        <Header />
        <div>
          <h1 data-testid="ranking-title" className="ranking">
            Ranking
          </h1>
          <hr />
          {top.map(({ name, url, score }, index) => (
            <div key={ score } className="div-ranking">
              <img
                data-testid="header-profile-picture"
                alt={ name }
                src={ url }
                className="image-gravatar"
              />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </div>
          ))}
        </div>
        <div className="button-div">
          <button
            data-testid="btn-go-home"
            onClick={ this.handleClick }
            className="btn-home"
          >
            Home
          </button>
        </div>
        <div className="logo-div">
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect()(Ranking));
