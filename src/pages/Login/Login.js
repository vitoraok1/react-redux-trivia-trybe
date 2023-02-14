import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setEmail, setName, setURL, setQuiz } from '../../redux/actions';
import logo from '../../trivia.png';
import './Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disable: true,
  };

  setQuestions = async () => {
    const { history, dispatch } = this.props;
    const maxQuestions = 5;
    const errorNumber = 3;
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=${maxQuestions}&token=${token}`;
    try {
      const questions = await fetch(url);
      const data = await questions.json();
      if (data.response_code === errorNumber) return history.push('/');
      history.push('/game');
      dispatch(setQuiz(data));
    } catch (error) {
      console.log(error);
    }
  };

  handleValidate = () => {
    const { email, name } = this.state;
    const validateEmail = email.length > 0;
    const validateName = name.length > 0;
    const validates = validateEmail && validateName;
    if (validates) {
      return this.setState({ disable: false });
    } this.setState({ disable: true });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleValidate);
  };

  fetchAPI = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;
    return token;
  };

  handleClick = async (event) => {
    const { dispatch } = this.props;
    const { name, email } = this.state;
    event.preventDefault();
    const token = await this.fetchAPI();
    localStorage.setItem('token', token);
    dispatch(setName(name));
    dispatch(setEmail(email));
    dispatch(setURL(email));
    await this.setQuestions();
  };

  render() {
    const { history } = this.props;
    const { name, email, disable } = this.state;
    return (
      <main className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="form-login">
          <div className="div-name">
            <label className="input-login" htmlFor="name">
              Nome:
              <input
                type="text"
                data-testid="input-player-name"
                value={ name }
                name="name"
                onChange={ this.handleChange }
                className="form-control input-login"
              />
            </label>
          </div>
          <div className="div-email">
            <label className="input-login" htmlFor="gravatarEmail">
              Email:
              <input
                type="email"
                data-testid="input-gravatar-email"
                value={ email }
                name="email"
                onChange={ this.handleChange }
                className="form-control input-login"
              />
            </label>
          </div>
          <div className="button-play">
            <button
              data-testid="btn-play"
              disabled={ disable }
              onClick={ this.handleClick }
              className="btn-play"
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              onClick={ () => history.push('/config') }
              className="btn-settings"
            >
              Configurações
            </button>
          </div>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect()(Login));
