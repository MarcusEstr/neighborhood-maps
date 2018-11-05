import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { load_google_maps } from './utils';

class App extends Component {
  componentDidMount() {
    let googleMapsPromise = load_google_maps();

    Promise.all([
      googleMapsPromise
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
