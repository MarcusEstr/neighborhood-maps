import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { load_google_maps, load_places } from './utils';

class App extends Component {
  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let placesPromise = load_places();

    Promise.all([
      googleMapsPromise, placesPromise
    ])
    .then(values => {
      // console.log(values);
      let google = values[0]; //Google Maps
      let venues = values[1].response.venues; //Foursquare
      this.google = google;
      this.markers = [];

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8, 
        scrollWheel: true,
        center: {lat: venues[0].location.lat, lng: venues[0].location.lng}
      });

      venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          aniamtion: google.maps.Animation.DROP
        });
      });

    })

  }

  render() {
    return (
      <div id="map">
        
      </div>
    );
  }
}

export default App;
