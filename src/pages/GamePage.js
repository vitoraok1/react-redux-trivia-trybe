import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Questions from '../components/Questions/Questions';
import '../App.css';

export default class GamePage extends Component {
  render() {
    return (
      <div className="App-gamer">
        <Header />
        <Questions />
      </div>
    );
  }
}
