import React, { Component } from 'react';

class Sidebar extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    

  }

  

  render() {
    return (
        <div id="sidebar">
        <input placeholder="Search here" value={ this.props.query } onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
        <br />
        {
          this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue, index) => (
            <div key={index} className="venue-item" onClick={ () => { this.props.listItemClick(venue) } }>
              { venue.name }
            </div>
          ))
        }
      </div>
    );
  }
}

export default Sidebar;
