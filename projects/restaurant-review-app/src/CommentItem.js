import React from 'react';
import StarContainer from './StarContainer';

class CommentItem extends React.Component {
  render() {
    return <li className="commentItem list-group-item">
      <StarContainer numberOfStars={this.props.stars} />
      {' – '}
      {this.props.text}
    </li>;
  }
}

export default CommentItem;
