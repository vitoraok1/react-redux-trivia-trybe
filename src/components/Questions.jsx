import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  state = {
    playerAnswer: false,
  };

  createAnswersArray = () => {
    const { questions, curr } = this.props;
    return [questions[curr].correct_answer, ...questions[curr].incorrect_answers];
  };

  shuffle = (array) => {
    const rand = 0.5;
    return array.sort(() => (
      Math.random() - rand
    ));
  };

  handleAnswer = () => {
    this.setState({
      playerAnswer: true,
    });
  };

  render() {
    const { questions, curr } = this.props;
    const { playerAnswer } = this.state;
    const { category, question } = questions[curr];
    let answers = this.createAnswersArray();
    if (!playerAnswer) answers = this.shuffle(answers);
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              key={ index }
              data-testid={ questions[curr].correct_answer === answer
                ? 'correct-answer'
                : `wrong-answer-${curr}` }
              onClick={ this.handleAnswer }
              style={ {
                backgroundColor: playerAnswer ? 'red' : 'white',
              } }
            >
              { answer }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  curr: state.quiz.currentQuestion,
  questions: state.quiz.questions.results,
});

Questions.propTypes = {
  curr: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Questions);
