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
      console.log(values);
      let google = values[0]; //Google Maps array
      this.venues = values[1].response.venues; //Foursquare array

      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();

      /*Create Google Maps map to be placed in map HTML element.
      Center point on the first element of the venues array.*/
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11, 
        scrollWheel: true,
        center: {lat: this.venues[0].location.lat, lng: this.venues[0].location.lng}
        //TODO: Change center to Santa Ana central location)
      });

      this.venues.forEach(venue => {
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

      this.setState({ filteredVenues: this.venues });

    })

  }

  /* Loop through each marker.
  Check if user's query matches any names.
  If there is a match, then marker is visible,
  but if there is no match then marker is disabled. */
  filterVenues(query) {
    let f = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      if (marker.name.toLowerCase().includes(query.toLowerCase()) === true) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });
    this.setState( { filteredVenues: f, query });
  }

  render() {
    return (
      <div>
        <div id="map">
          
        </div>
        <div id="sidebar">
          <input placeholder="Search here" value={ this.state.query } onChange={(e) => { this.filterVenues(e.target.value) }}/>
          <br />
          {
            this.state.filteredVenues && this.state.filteredVenues.length > 0 && this.state.filteredVenues.map((venue, index) => (
              <div key={index} className="venue-item">
                { venue.name }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
