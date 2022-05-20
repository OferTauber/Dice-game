import React, { Component } from 'react';
import dice1 from './assets/dice-1.jpg';
import dice2 from './assets/dice-2.jpg';
import dice3 from './assets/dice-3.jpg';
import dice4 from './assets/dice-4.jpg';
import dice5 from './assets/dice-5.jpg';
import dice6 from './assets/dice-6.jpg';
import './controllers.css';

export default class Controllers extends Component {
  state = { dice: [3, 5] };

  diceArr = [null, dice1, dice2, dice3, dice4, dice5, dice6];

  rollDice() {
    // 1. Generating a random dice roll
    const dice = [
      Math.trunc(Math.random() * 6) + 1,
      Math.trunc(Math.random() * 6) + 1,
    ];

    this.setState({ dice: [...dice] });
    this.props.callbacks.passRollToMain(dice);
  }

  render() {
    return (
      <div className="controllers">
        <button
          className="btn btn--new"
          onClick={() => this.props.callbacks.newGame()}
        >
          🔄 New game
        </button>
        <img
          src={this.diceArr[this.state.dice[0]]}
          alt="Playing dice"
          className="dice"
        />
        <img
          src={this.diceArr[this.state.dice[1]]}
          alt="Playing dice"
          className="dice"
        />

        <button
          className="btn btn--roll"
          onClick={() => {
            this.rollDice();
          }}
        >
          🎲 Roll dice
        </button>
        <button
          className={`btn btn--hold ${this.props.holdInactive && 'inactive'}`}
          onClick={() => {
            if (!this.props.holdInactive) this.props.callbacks.passHoldToMain();
          }}
        >
          📥 Hold
        </button>
      </div>
    );
  }
}
