import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Media from 'react-bootstrap/Media';
import CommentList from './CommentList.js';
import './RestaurantItem.css';
import ReviewModal from './ReviewModal.js';
import StarContainer from './StarContainer';

class RestaurantItem extends React.Component {
  constructor() {
    super();
    this.state = {
      commentVisible: false,
      postedRatings: []
    };
  }
  render() {
    const id = 'collapseRestaurant' + this.props.restaurantIndex;
    const href = '#' + id;
    const streetViewPhotoURL = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${this.props.lat},${this.props.lng}&fov=80&heading=70&pitch=0&key=<ENTER_API_KEY>`

    const ratings = this.props.ratings.map((rating) => {
      if (!rating.comment) {
        rating.comment = 'No comment';
      }
      return rating;
    });

    const roundedAvg = Math.round(this.props.avgStars * 10) / 10;
    return (
      <Media className="restaurant-container">
        <img
          width={64}
          height={64}
          className="mr-3"
          src={streetViewPhotoURL}
          alt="Generic placeholder"
        />
        <Media.Body>
          <h5>{this.props.name}</h5>
          <div>{this.props.address}</div>

          <div className="star-container">
            <StarContainer numberOfStars={roundedAvg} />
            <div>
              <a href={href} onClick={() => this.toggleComments()}>
                {this.props.reviewCount} Reviews
              </a>
            </div>
            <ReviewModal restaurantName={this.props.name} onUpdateReview={(numberOfStar, commentText) => this.handleUpdateStarAndComment(numberOfStar, commentText)} />
          </div>
          <CommentList ratings={ratings} isVisible={this.state.commentVisible} />
        </Media.Body>
      </Media>
    );
  }
  toggleComments() {
    if (this.state.commentVisible) {
      this.setState({ commentVisible: false });
    }
    else {
      this.setState({ commentVisible: true });
    }
  }
  handleUpdateStarAndComment(numberOfStars, commentText) {
    this.props.onUpdateRating(numberOfStars, commentText);
  }
}

export default RestaurantItem;
