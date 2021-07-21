import React from 'react';
import CommentItem from './CommentItem.js';
import './CommentList.css';

class CommentList extends React.Component {
    render() {
        const items = this.props.ratings.map(
            (rating, index) => {
                return <CommentItem key={index} text={rating.comment} stars={rating.stars} />;
            });

        let dynamicClass;
        if (!this.props.isVisible) {
            dynamicClass = "hidden";
        }

        return (
            <div className={dynamicClass} style={{ marginTop: '6px' }}>
                <ul className="list-group">
                    {items}
                </ul>
            </div>
        );
    }
}

export default CommentList;
