import React, { Component } from 'react';
import RestaurantItem from './RestaurantItem.js';
import './RestaurantList.css';

export default class RestaurantList extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        const restaurantItems = this.props.restaurants.map(
            (restaurant, index) => {
                return (
                    <RestaurantItem
                        key={index}
                        name={restaurant.restaurantName}
                        address={restaurant.address}
                        lat={restaurant.lat}
                        lng={restaurant.long}
                        reviewCount={restaurant.ratingCount}
                        avgStars={restaurant.avgStars}
                        restaurantIndex={index}
                        ratings={restaurant.ratings}
                        onUpdateRating={(numberOfStars, commentText) => this.handleUpdateRating(restaurant.restaurantName, numberOfStars, commentText)}
                    >
                    </RestaurantItem>
                );
            })
        return (
            <div className="container p-2" >
                <h4 className="mb-2">List Of Restaurants</h4>

                <div className="scrollable-container border rounded">{restaurantItems}</div>
            </div>
        );
    }
    handleUpdateRating(restaurantName, numberOfStars, commentText) {
        this.props.onUpdateRestaurant(restaurantName, numberOfStars, commentText);
    }
}