import React, { Component } from 'react';

export default class StarContainer extends Component {
  render() {
    const percentage = (this.props.numberOfStars) / 5 * 100 + '%';
    return (
      <div className="star-container">
        <div className="text-orange">{this.props.numberOfStars}</div>
        {/* Source: https://codepen.io/Bluetidepro/pen/GkpEa */}
        <div className="star-ratings-sprite">
          <span style={{ width: percentage }} className="star-ratings-sprite-rating"></span>
        </div>
      </div>
    )
  }
}
