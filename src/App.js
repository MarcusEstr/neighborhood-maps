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
      //console.log(values);
      let google = values[0]; //Google Maps array
      let venues = values[1].response.venues; //Foursquare array

      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();

      /*Create Google Maps map to be placed in map HTML element.
      Center point on the first element of the venues array.*/
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11, 
        scrollWheel: true,
        center: {lat: venues[0].location.lat, lng: venues[0].location.lng}
        //TODO: Change center to Santa Ana central location)
      });

      venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          animation: google.maps.Animation.DROP
        });
        this.markers.push(this.markers);
      });

    })

  }

  render() {
    return (
      <div>
        <div id="map">
          
        </div>
        <div id="sidebar">
        
        </div>
      </div>
    );
  }
}

export default App;
