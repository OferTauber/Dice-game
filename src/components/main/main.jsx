import './main.css';
import React from 'react';
import Player from '../player/player';
import Controllers from '../controllers/constrollers';
// import Dice from './dice';
// import Button from './button';

export default class Main extends React.Component {
  newGame() {
    const that = this;
    return () => {
      that.setState({
        totalScore: [0, 0],
        currentScore: [0, 0],
        activePlayer: 0,
        gameIsOn: true,
        valueForWinning: 100,
      });
    };
  }

  captureRollResult() {
    const that = this;
    return (res) => {
      that.handelRoll(res);
    };
  }

  captureHoldClick() {
    const that = this;
    return () => {
      that.handelHold();
    };
  }

  handelRoll(res) {
    this.setState({ holdInactive: false });

    if (res[0] === 6 && res[1] === 6) {
      this.ziroCurrentScore();
      this.switchTurn();
    } else {
    }
  }

  handelHold() {
    console.log('Hold!');
    this.updateTotalScores();
    if (
      this.state.totalScore[this.state.activePlayer] <
      this.state.valueForWinning
    ) {
      this.switchTurn();
    } else if (
      this.state.totalScore[this.state.activePlayer] ===
      this.state.valueForWinning
    ) {
      // todo handel winning
      console.log(`player ${this.state.activePlayer + 1} wins!`);
    } else {
      // todo handel loose
      console.log(`player ${this.state.activePlayer + 1} Losse!`);
    }
  }

  switchTurn() {
    this.setState({
      activePlayer: (this.state.activePlayer - 1) * -1,
      holdInactive: true,
    });
  }

  ziroCurrentScore() {
    this.setState({ currentScore: [0, 0] });
  }

  updateTotalScores() {
    const totalScore = [...this.state.totalScore];
    const currentScore = [...this.state.currentScore];

    totalScore[0] += currentScore[0];
    totalScore[1] += currentScore[1];

    this.setState({ totalScore: totalScore });
    this.ziroCurrentScore();
  }

  state = {
    totalScore: [3, 15],
    currentScore: [15, 0],
    activePlayer: 0,
    gameIsOn: true,
    valueForWinning: 100,
    holdInactive: true,
  };

  render() {
    return (
      <>
        <main>
          <Player
            playerId={0}
            totalScore={this.state.totalScore[0]}
            currentScore={this.state.currentScore[0]}
            active={this.state.activePlayer === 0}
          />
          <Player
            playerId={1}
            totalScore={this.state.totalScore[1]}
            currentScore={this.state.currentScore[1]}
            active={this.state.activePlayer === 1}
          />
        </main>
        <Controllers
          callbacks={{
            newGame: this.newGame(),
            passRollToMain: this.captureRollResult(),
            passHoldToMain: this.captureHoldClick(),
          }}
          holdInactive={this.state.holdInactive}
        />
      </>
    );
  }
}
