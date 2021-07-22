# Restaurant Review Site

This project is a web app built with React Javascript library. It uses external APIs: Google Maps and Google Places.

## Main Features

The application UI has 2 main sections:
- A Google Maps map loaded with the Google Maps API. The Google Maps map focuses immediately on the position of the user, using the JavaScript geolocation API.
- A list of restaurants on the right side of the page that are within the area displayed on the map. The list shows the average reviews of each restaurant (ranging from 1 to 5 stars) with the Google Street View photo.

Clicking on a restaurant will show the list of reviews (comments) about the restaurant. This data is from Google Places API.

## Advanced Features

The application also supports the following advanced features:
- A filter tool allows the display of restaurants that have between X and Y stars. The map and the list are updated in real-time to show the corresponding restaurants.
- Users can add new restaurants and reviews by clicking on a specific place on the map. Once a review or restaurant has been added, it appears immediately on the map. The map is instantly updated to show a new marker at the position of the new restaurant.

## Structure

### Directory Structure

Project's file structure:

```
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── CommentItem.js
│   ├── CommentList.css
│   ├── CommentList.js
│   ├── Filter.css
│   ├── Filter.js
│   ├── FilterDropdown.js
│   ├── Map.js
│   ├── Marker.css
│   ├── Marker.js
│   ├── Navbar.css
│   ├── Navbar.js
│   ├── RestaurantItem.css
│   ├── RestaurantItem.js
│   ├── RestaurantList.css
│   ├── RestaurantList.js
│   ├── Restaurants.json
│   ├── ReviewModal.js
│   ├── StarContainer.js
│   ├── img
│   ├── index.css
│   ├── index.js
│   ├── logo_90.png
│   ├── reportWebVitals.js
│   └── setupTests.js
└── yarn.lock

```

### Dependency Management

This app uses [yarn](https://yarnpkg.com/) for package management. All dependencies are specified in a `package.json` file at the root directory of the app. The project has 3 main dependencies: [React](https://yarnpkg.com/package/react), [React-Bootstrap](https://yarnpkg.com/package/react-bootstrap), [Google-Map-React](https://yarnpkg.com/package/google-map-react).

```
{
    "name": "restaurant-review-app",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "@testing-library/jest-dom": "^5.11.4",
        "@testing-library/react": "^11.1.0",
        "@testing-library/user-event": "^12.1.10",
        "bootstrap": "^4.6.0",
        "google-map-react": "^2.1.9",
        "react": "^17.0.1",
        "react-bootstrap": "^1.4.3",
        "react-dom": "^17.0.1",
        "react-scripts": "4.0.1",
        "web-vitals": "^0.2.4"
    }
}
```

You can install all dependencies locally by running the command line:

```
yarn install
```

Everything will be installed in the `node_modules` directory.

### Getting Started

Clone this repository or download its source from GitHub.

Edit the [`Map.js` file](https://github.com/tammywebdev/OpenClassrooms/blob/57dcd677b15a804ceccd0eb6fc9787ad19bbaac7/projects/restaurant-review-app/src/Map.js#L45) to enter a valid Google Maps API key. This is required for the app to show correctly.

To run the app, open Terminal and run the following command:

```
yarn start
```

The app should open in a browser.
