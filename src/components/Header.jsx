import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { name, score } = this.props;

    return (
      <header>
        <img data-testid="header-profile-picture" alt={ name } />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  score: globalState.player.score,
});

Header.propTypes = {
  name: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
