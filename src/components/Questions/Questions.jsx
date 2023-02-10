import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateScore, userAssertions } from '../../redux/actions';
import './Questions.css';

class Questions extends Component {
  state = {
    playerAnswer: 'hide',
    quiz: [],
    counter: 30,
    showAnswers: false,
    rightAnswer: '',
    questionIndex: 0,
    nextPage: false,
  };

  componentDidMount() {
    this.shuffleQuestions();
    this.timeCounter();
  }

  shuffleQuestions = () => {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const rand = 0.5;
    const quiz = [questions[questionIndex]
      .correct_answer, ...questions[questionIndex].incorrect_answers];
    const randomQuiz = quiz.sort(() => (
      Math.random() - rand
    ));

    this.setState({
      quiz: randomQuiz,
      rightAnswer: questions[questionIndex].correct_answer,
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

  updateScore = (target) => {
    const { counter, rightAnswer, questionIndex } = this.state;
    const { dispatch, questions } = this.props;

    const answers = questions[questionIndex];
    const { difficulty } = answers;

    const initialScore = 10;
    let difficultyPoints = 0;
    const one = 1;
    const two = 2;
    const three = 3;

    if (difficulty === 'easy') difficultyPoints = one;
    if (difficulty === 'medium') difficultyPoints = two;
    if (difficulty === 'hard') difficultyPoints = three;

    if (target === rightAnswer) {
      const sumScore = initialScore + ((counter - 1) * difficultyPoints);
      const assertion = 1;
      dispatch(updateScore(sumScore));
      dispatch(userAssertions(assertion));
    }
  };

  handleAnswer = ({ target }) => {
    this.setState((prevState) => ({
      showAnswers: !prevState.showAnswers,
    }), () => this.updateScore(target.innerHTML));
  };

  handleNextQuestion = () => {
    const five = 5;
    this.setState((prevState) => ({
      questionIndex: prevState
        .questionIndex + 1 === five ? prevState
          .questionIndex : prevState.questionIndex + 1,
      showAnswers: false,
      playerAnswer: 'hide',
      nextPage: prevState.questionIndex + 1 === five,
    }), () => {
      const { history } = this.props;
      const { nextPage } = this.state;
      if (nextPage) {
        return history.push('/feedback');
      }
      this.timeCounter();
      this.shuffleQuestions();
    });
  };

  render() {
    const { questions } = this.props;
    const { quiz, playerAnswer, showAnswers, counter, questionIndex } = this.state;
    const { category, question } = questions[questionIndex];

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          {quiz.map((answer, index) => (
            <button
              key={ index }
              data-testid={ questions[questionIndex].correct_answer === answer
                ? 'correct-answer'
                : `wrong-answer-${questionIndex}` }
              onClick={ this.handleAnswer }
              className={
                `${playerAnswer}${questions[questionIndex]
                  .correct_answer === answer ? 'Correct' : 'Wrong'}`
              }
              disabled={ showAnswers || counter === 0 }
            >
              { answer }
            </button>
          ))}
          <br />
          { showAnswers && (
            <button
              data-testid="btn-next"
              onClick={ this.handleNextQuestion }
            >
              Next
            </button>
          )}
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
  questions: state.quiz.questions.results,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(Questions));
