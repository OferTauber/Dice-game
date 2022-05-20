import React from 'react';
import Current from './current';

export default class Player extends React.Component {
  render() {
    return (
      <section
        className={`player player--${this.props.playerNum} ${
          this.props.isActive && 'player--active'
        }`}
      >
        <h2 className="name" id={`name--${this.props.playerNum + 1}`}>
          Player {this.props.playerNum + 1}
        </h2>
        <p className="score" id={`score--${this.props.playerNum + 1}`}>
          {this.props.score}
        </p>
        <Current value={this.props.curr} />
      </section>
    );
  }
}
