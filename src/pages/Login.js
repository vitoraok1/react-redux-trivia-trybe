import React, { Component } from 'react';

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

  render() {
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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
