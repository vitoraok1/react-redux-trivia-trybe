import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, url } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" alt={ name } src={ url } />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  url: state.player.url,
  save: state.player.save,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  url: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
