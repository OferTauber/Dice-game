import React from 'react';
import './player.css';

export default class Player extends React.Component {
  render() {
    return (
      <section
        className={`player player--${this.props.playerId} ${
          this.props.active && 'player--active'
        }`}
      >
        <h2 className="name" id="name--0">
          {`Player ${this.props.playerId + 1}`}
        </h2>
        <p className="score" id="score--0">
          {this.props.totalScore}
        </p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">
            {this.props.currentScore}
          </p>
        </div>
      </section>
    );
  }
}
