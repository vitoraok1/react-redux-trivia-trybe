import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Questions.css';

class Questions extends Component {
  state = {
    playerAnswer: 'hide',
    quiz: [],
    counter: 30,
    showAnswers: false,
  };

  componentDidMount() {
    this.shuffleQuestions();
    this.timeCounter();
  }

  shuffleQuestions = () => {
    const { questions, curr } = this.props;
    const rand = 0.5;
    const quiz = [questions[curr].correct_answer, ...questions[curr].incorrect_answers];
    const randomQuiz = quiz.sort(() => (
      Math.random() - rand
    ));

    this.setState({
      quiz: randomQuiz,
    });
  };

  timeCounter = () => {
    this.setState({ counter: 30 }, () => {
      const second = 1000;
      const interval = setInterval(() => {
        this.setState((prevState) => ({
          counter: prevState.counter - 1,
        }), () => {
          const { counter, showAnswers } = this.state;
          if (counter === 0 || showAnswers) {
            clearInterval(interval);
            this.setState({ showAnswers: true, playerAnswer: 'show' });
          }
        });
      }, second);
    });
  };

  handleAnswer = () => {
    const { playerAnswer, showAnswers } = this.state;

    if (playerAnswer === 'show') {
      this.setState({
        showAnswers: !showAnswers,
        playerAnswer: 'hide',
      });
    } else {
      this.setState({
        showAnswers,
        playerAnswer: 'show',
      });
    }
  };

  render() {
    const { questions, curr } = this.props;
    const { quiz, playerAnswer, showAnswers, counter } = this.state;
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
              disabled={ showAnswers || counter === 0 }
            >
              { answer }
            </button>
          ))}
          <br />
          <br />
          <span>
            {' '}
            Time left:
            {' '}
            { counter }
          </span>
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
