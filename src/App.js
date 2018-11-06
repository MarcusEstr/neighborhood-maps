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
      console.log(values);
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
