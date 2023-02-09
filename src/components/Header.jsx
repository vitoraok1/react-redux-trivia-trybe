import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, email, url } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">{ name }</p>
        <img src={ url } alt={ email } data-testid="header-profile-picture" />
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
  url: state.url,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
