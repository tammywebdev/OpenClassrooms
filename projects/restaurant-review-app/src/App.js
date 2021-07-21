import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './App.css';
import Filter from './Filter';
import Map from './Map.js';
import Navbar from './Navbar.js';
import RestaurantList from './RestaurantList.js';
import DummyRestaurants from './Restaurants.json';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      filterFromStars: 0,
      filterToStars: 5,
      restaurants: DummyRestaurants
    };
  }

  render() {
    const restaurantsWithAvgStarsAndRatingCount = this.state.restaurants.map(restaurant => {
      const ratingCount = restaurant.ratings.length;
      let sumStars = 0;
      for (let i = 0; i < restaurant.ratings.length; i++) {
        sumStars = sumStars + restaurant.ratings[i].stars;
      }

      let avgStars;
      if (ratingCount === 0) {
        avgStars = 0;
      }
      else {
        avgStars = sumStars / ratingCount;
      }

      restaurant.ratingCount = ratingCount;
      restaurant.avgStars = avgStars;
      return restaurant;
    });
    console.log('Before filtering');
    const restaurantsAfterFiltering = restaurantsWithAvgStarsAndRatingCount.filter(restaurant => {
      console.log('Filter restaurant: ', restaurant);
      const minStars = this.state.filterFromStars;
      const maxStars = this.state.filterToStars;

      if (minStars <= restaurant.avgStars && restaurant.avgStars <= maxStars) {
        return true;
      } else {
        return false;
      }
    });

    return (
      <>
        <Container>
          <Navbar></Navbar>
          <Row>
            <Col>
              <Filter onChange={(fromStars, toStars) => this.handleFilterChange(fromStars, toStars)}
              />
            </Col>
          </Row>
          <Row className="rounded border-large ">
            <Col className="map-container">
              <Map
                restaurants={restaurantsAfterFiltering}
                onUpdateRestaurant={(name, address, lat, lng, rating) => this.handleUpdateNewRestaurant(name, address, lat, lng, rating)}
                onPlacesLoaded={(places) => this.handlePlacesLoaded(places)}>
              </Map>
            </Col>
            <Col className="restaurant-list-container p-2 no-scroll">
              <RestaurantList restaurants={restaurantsAfterFiltering}
                onUpdateRestaurant={(restaurantName, numberOfStars, commentText) => this.handleUpdateRestaurantRating(restaurantName, numberOfStars, commentText)}>
              </RestaurantList>
            </Col>
          </Row>
        </Container>
        <div className="footer">
          <div className="text-center text-white">
            <p><em>Created by <b>Tammy</b></em></p>
            <p>
              Designed and built with Bootstrap, React and Google Maps.<br></br>
              v1.0.0 @ 2021
            </p>
          </div>

        </div>
      </>
    );
  }

  handleFilterChange(fromStars, toStars) {
    this.setState({
      filterFromStars: fromStars,
      filterToStars: toStars
    });
  }

  handleUpdateNewRestaurant(name, address, lat, lng) {
    this.setState({
      restaurants: [{
        restaurantName: name,
        address,
        lat,
        long: lng,
        ratings: []
      }].concat(this.state.restaurants)
    });
  }

  handleUpdateRestaurantRating(restaurantName, numberOfStars, commentText) {
    this.setState({
      restaurants: this.state.restaurants.map(restaurant => {
        if (restaurant.restaurantName === restaurantName) {
          restaurant.ratings.push({
            stars: numberOfStars,
            comment: commentText
          });
        }
        return restaurant;
      })

    });
  }

  handlePlacesLoaded(places) {
    console.log('handlePlacesLoaded');
    this.setState(
      {
        restaurants: this.state.restaurants.concat(places.map(place => {
          return {
            restaurantName: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            long: place.geometry.location.lng(),
            ratings: place.reviews.map(review => {
              return {
                stars: review.rating,
                comment: review.text
              };
            })
          };
        }))
      }
    );
  }
}