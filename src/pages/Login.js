import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
    disable: true,
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
    const { history } = this.props;
    event.preventDefault();
    const token = await this.fetchAPI();
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { name, email, disable } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Insira seu nome"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Insira seu e-mail"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            disabled={ disable }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            onClick={ () => history.push('/config') }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
