import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadScore } from '../extras/functions';
import { resetScore } from '../redux/actions/index';

class Ranking extends Component {
  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const { history } = this.props;
    const top = loadScore().sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {top.map(({ name, url, score }, index) => (
          <div key={ score }>
            <p data-testid={ `player-name-${index}` }>{ name }</p>
            <p data-testid={ `player-score-${index}` }>{ score }</p>
            <img data-testid="header-profile-picture" alt={ name } src={ url } />
          </div>
        ))}
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Voltar para o início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(connect()(Ranking));
