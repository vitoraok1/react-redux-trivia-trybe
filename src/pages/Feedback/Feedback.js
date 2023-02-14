import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import logo from '../../trivia.png';
import './Feedback.css';

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
      <div className="App-gamer">
        <Header />
        <div className="feedback-container">
          <div className="div-feedback">
            Feedback
          </div>
          <hr />
          <div className="card=feedback">
            {/* <p data-testid="feedback-total-score">
              {`Total Score: ${score}`}
            </p>
            <p data-testid="feedback-total-question">
              {`Total Assertions: ${assertions}`}
            </p> */}
            <p data-testid="feedback-total-score">
              { score }
            </p>
            <p data-testid="feedback-total-question">
              { assertions }
            </p>
            <p data-testid="feedback-text" className="feedback-text">{text}</p>
          </div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgainBtn }
            className="btn-play-feedback"
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
            className="btn-ranking"
          >
            Ranking
          </button>
        </div>
        <div className="logo-div">
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
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
