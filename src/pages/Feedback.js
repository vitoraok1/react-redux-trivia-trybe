import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    text: '',
  };

  componentDidMount() {
    const { assertions } = this.props;
    const three = 3;
    if (+assertions < three) {
      return this.setState({ text: 'Could be better...' });
    } this.setState({ text: 'Well Done!' });
  }

  playAgainBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { text } = this.state;
    const { score, assertions, history } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{text}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgainBtn }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
