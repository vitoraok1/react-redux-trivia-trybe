import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  createAnswersArray = () => {
    const { questions, curr } = this.props;
    const rand = 0.5;
    return [questions[curr].correct_answer,
      ...questions[curr].incorrect_answers]
      .sort(() => (
        Math.random() - rand
      ));
  };

  render() {
    const { questions, curr } = this.props;
    const { category, question } = questions[curr];
    const answers = this.createAnswersArray();
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
