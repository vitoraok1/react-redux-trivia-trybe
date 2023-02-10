import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
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

  render() {
    const { text } = this.state;
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{text}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
