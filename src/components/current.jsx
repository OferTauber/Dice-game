import React from 'react';

export default class Current extends React.Component {
  render() {
    return (
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id="current--0">
          {this.props.value}
        </p>
      </div>
    );
  }
}
