import React, { Component } from 'react';

/* Map component for holding Google Maps content */
class MapDiv extends Component {
  render() {
    return (
      <main>
        <div role="application" aria-hidden="true" id="map"></div>
      </main>
    );
  }
}

export default MapDiv;