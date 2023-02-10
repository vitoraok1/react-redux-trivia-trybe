import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Questions.css';

class Questions extends Component {
  state = {
    playerAnswer: 'hide',
    quiz: [],
  };

  componentDidMount() {
    const { questions, curr } = this.props;
    const quiz = [questions[curr].correct_answer, ...questions[curr].incorrect_answers];
    this.setState({
      quiz: this.shuffle(quiz),
    });
  }

  shuffle = (array) => {
    const rand = 0.5;
    return array.sort(() => (
      Math.random() - rand
    ));
  };

  handleAnswer = () => {
    this.setState({
      playerAnswer: 'show',
    });
  };

  render() {
    const { questions, curr } = this.props;
    const { quiz, playerAnswer } = this.state;
    const { category, question } = questions[curr];

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          {quiz.map((answer, index) => (
            <button
              key={ index }
              data-testid={ questions[curr].correct_answer === answer
                ? 'correct-answer'
                : `wrong-answer-${curr}` }
              onClick={ this.handleAnswer }
              className={
                `${playerAnswer}${questions[curr]
                  .correct_answer === answer ? 'Correct' : 'Wrong'}`
              }
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
