import GoogleMapReact from 'google-map-react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Marker from './Marker.js';

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: null,
            lng: null,
            newRestaurants: [],
            restaurantLat: null,
            restaurantLng: null,
            show: false,
            restaurantName: 'New restaurant',
            restaurantAddress: null,
            displayNameErrors: 'none',
            displayAddressErrors: 'none',
            map: null,
            maps: null
        };
    }



    render() {
        let submittedRestaurants = [];
        if (this.state.restaurantLat && this.state.restaurantLng) {
            submittedRestaurants.push({
                restaurantName: this.state.restaurantName,
                lat: this.state.restaurantLat,
                long: this.state.restaurantLng,
                ratings: []
            });
        }
        const restaurantMarkers = this.props.restaurants.concat(submittedRestaurants).map((restaurant, index) => <Marker key={index} lat={restaurant.lat} lng={restaurant.long} text={restaurant.restaurantName} ></Marker>);

        return (
            <>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "ENTER_GOOGLE_MAPS_API_KEY_HERE", libraries: ['places']
                    }}
                    center={this.state}
                    defaultZoom={14}
                    onClick={({ lat, lng }) => this.handleClick(lat, lng)}
                    onChange={() => this.handleChange()}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                >
                    <Marker className='text-primary' lat={this.state.lat} lng={this.state.lng} text="I am here" ></Marker>
                    {restaurantMarkers}
                </GoogleMapReact>
                <Modal
                    show={this.state.show}
                    onHide={() => this.handleHideModal()}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new restaurant</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder="Red Lobster" onChange={(event) => this.handleNameChange(event)} />
                                <span className='invalid-feedback' style={{ display: this.state.displayNameErrors }} >Please enter restaurant's name.</span>
                            </Form.Group>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" onChange={(event) => this.handleAddressChange(event)} />
                                <span className='invalid-feedback' style={{ display: this.state.displayAddressErrors }} >Please enter restaurant's address.</span>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleHideModal()}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => this.handleSubmit()}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    componentDidMount() {

        // handleSuccess is a "callback function".
        const handleSuccess = (newPosition) => {
            // The user allows Chrome to get position.
            console.log("Success to get user's position. New position: ", newPosition);

            const newState = {
                lat: newPosition.coords.latitude,
                lng: newPosition.coords.longitude
            };

            this.setState(newState);

        };
        const handleError = () => {
            // The user doesn't allow Chrome to get position.
            console.log("Failed to get user's position");
        };

        console.log("Attempt to get user's position");
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
    handleClick(lat, lng) {
        this.setState({
            restaurantLat: lat,
            restaurantLng: lng,
            show: true,
        });
    }

    handleHideModal() {
        this.setState(
            {
                restaurantLat: null,
                restaurantLng: null,
                show: false
            }
        );
    }
    handleNameChange(event) {
        this.setState({
            restaurantName: event.target.value,
            displayNameErrors: 'none'
        });
    }

    handleAddressChange(event) {
        this.setState({
            restaurantAddress: event.target.value,
            displayAddressErrors: 'none'
        });
    }

    handleSubmit() {
        if (!this.state.restaurantName) {
            this.setState({
                displayNameErrors: 'inline'
            });
            return;
        }
        if (!this.state.restaurantAddress) {
            this.setState({
                displayAddressErrors: 'inline'
            });
            return;
        }

        this.props.onUpdateRestaurant(this.state.restaurantName, this.state.restaurantAddress, this.state.restaurantLat, this.state.restaurantLng);
        this.handleHideModal();
        this.setState({
            restaurantName: null,
            restaurantAddress: null
        });
    }
    loadPlaces(map, maps) {
        // use map and maps objects
        const restaurantRequest = {
            bounds: map.getBounds(),
            type: ['restaurant']
        };

        const service = new maps.places.PlacesService(map);
        service.nearbySearch(restaurantRequest, (results, status) => {

            console.log('nearbySearch', results[0]);
            if (status == maps.places.PlacesServiceStatus.OK) {
                const places = [];
                const n = Math.min(results.length, 6);
                for (let i = 0; i < n; i++) {
                    const detailRequest = {
                        placeId: results[i].place_id,
                        fields: ['name', 'reviews', 'formatted_address', 'geometry']
                    };
                    service.getDetails(detailRequest, (place, status) => {
                        if (status == maps.places.PlacesServiceStatus.OK) {
                            places.push(place);
                            if (places.length === n) {
                                this.props.onPlacesLoaded(places);
                            }

                        }
                    });
                }
            }
        });
    }

    handleApiLoaded(map, maps) {
        this.setState({
            map,
            maps
        });
        this.loadPlaces(map, maps);
    }

    handleChange() {
        if (this.state.map) {
            this.loadPlaces(this.state.map, this.state.maps);
        }

    }
}

export default Map;
