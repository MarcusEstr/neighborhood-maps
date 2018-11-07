import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { load_google_maps, load_places } from './utils';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { query: ''}
  }

  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let placesPromise = load_places();

    Promise.all([
      googleMapsPromise, placesPromise
    ])
    .then(values => {
      // console.log(values);
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
          address: venue.location.address,
          animation: google.maps.Animation.DROP
        });

        /* Set or remove marker animation when the marker is clicked. */
        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { 
            marker.setAnimation(null); 
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
          setTimeout( () => { marker.setAnimation(null) }, 1000);
        });

        /* Show the infowindow with content when a marker is clicked. */
        google.maps.event.addListener(marker, 'click', () => {
          this.infowindow.setContent(marker.name);
          // this.map.setZoom(13);
          this.map.setCenter(marker.position);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -125);
        });

        this.markers.push(marker);
      });

    })

  }

  /* Loop through each marker.
  Check if user's query matches any names.
  If there is a match, then marker is visible,
  but if there is no match then marker is disabled. */
  filterVenues(query) {
    // console.log(query);
    this.markers.forEach(marker => {
      if (marker.name.toLowerCase().includes(query.toLowerCase()) === true) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });
    this.setState( { query });
  }

  render() {
    return (
      <div>
        <div id="map">
          
        </div>
        <div id="sidebar">
          <input value={ this.state.query } onChange={(e) => { this.filterVenues(e.target.value) }}/>
        </div>
      </div>
    );
  }
}

export default App;
