import './main.css';
import React from 'react';
import Player from '../player/player';
import Controllers from '../controllers/constrollers';
import Message from '../message/message';

export default class Main extends React.Component {
  state = {
    totalScore: [0, 0],
    currentScore: [0, 0],
    activePlayer: 0,
    gameIsOn: true,
    targetScore: 100,
    holdInactive: true,
    displayMessage: true,
    winner: [false, false],
    playerMessage: [false, false],
    initialActivation: true,
  };

  newGame() {
    const that = this;
    return () => {
      that.setState({
        totalScore: [0, 0],
        currentScore: [0, 0],
        activePlayer: 0,
        gameIsOn: true,
        holdInactive: true,
        winner: [false, false],
        playerMessage: [false, false],
        displayMessage: true,
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

  captureTargetScore() {
    const that = this;
    return (targetScore) => {
      that.setState({
        targetScore: targetScore,
        displayMessage: false,
        initialActivation: false,
      });
    };
  }

  handelRoll(res) {
    this.setState({ holdInactive: false });

    if (res[0] === 6 && res[1] === 6) {
      this.ziroCurrentScore();
      this.switchTurn();
    } else {
      this.updateCurrentScore(res);
    }
  }

  async handelHold() {
    try {
      const newScore = (await this.updateTotalScores()) * 1;

      console.log(newScore, this.state.targetScore);

      if (newScore < this.state.targetScore) {
        this.switchTurn();
      } else if (newScore === this.state.targetScore) {
        this.gameWin();
      } else {
        this.gameLoose();
      }
    } catch (err) {
      console.error(err);
    }
  }

  gameWin() {
    const winnerPlayer = this.state.activePlayer;

    const winner = [false, false];
    winner[winnerPlayer] = true;
    const massege = [false, false];
    massege[winnerPlayer] = 'You Win!';

    this.setState({
      winner: winner,
      gameIsOn: false,
      holdInactive: true,
      playerMessage: massege,
    });
  }
  gameLoose() {
    const winnerPlayer = this.state.activePlayer;

    const winner = [true, true];
    winner[winnerPlayer] = false;
    const massege = ['You Win!', 'You Win!'];
    massege[winnerPlayer] = `Passed the trget score`;

    this.setState({
      winner: winner,
      gameIsOn: false,
      holdInactive: true,
      playerMessage: massege,
    });
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

  updateCurrentScore(res) {
    const currentScore = [...this.state.currentScore];
    const activePlayer = this.state.activePlayer;

    currentScore[activePlayer] += res[0] + res[1];

    this.setState({ currentScore: currentScore });
  }

  updateTotalScores() {
    const totalScore = [...this.state.totalScore];
    const currentScore = [...this.state.currentScore];

    totalScore[0] += currentScore[0];
    totalScore[1] += currentScore[1];

    this.setState({ totalScore: totalScore });
    this.ziroCurrentScore();

    return totalScore[this.state.activePlayer];
  }

  render() {
    return (
      <>
        <main>
          <Player
            playerId={0}
            totalScore={this.state.totalScore[0]}
            currentScore={this.state.currentScore[0]}
            active={this.state.activePlayer === 0}
            isWinner={this.state.winner[0]}
            massege={this.state.playerMessage[0]}
          />
          <Player
            playerId={1}
            totalScore={this.state.totalScore[1]}
            currentScore={this.state.currentScore[1]}
            active={this.state.activePlayer === 1}
            isWinner={this.state.winner[1]}
            massege={this.state.playerMessage[1]}
          />
        </main>
        {!this.state.displayMessage && (
          <Controllers
            callbacks={{
              newGame: this.newGame(),
              passRollToMain: this.captureRollResult(),
              passHoldToMain: this.captureHoldClick(),
            }}
            holdInactive={this.state.holdInactive}
            gameIsOn={this.state.gameIsOn}
          />
        )}
        {this.state.displayMessage && (
          <Message
            newGameFunc={this.captureTargetScore()}
            displayWelcome={this.state.initialActivation}
          />
        )}
      </>
    );
  }
}
