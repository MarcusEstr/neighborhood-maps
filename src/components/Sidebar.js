import React, { Component } from 'react';
// import * as utils from '../utils';
import VenueCard from './VenueCard';

class SideBar extends Component {
  state = {
    photos_list: [],
    showingVenues: true,
    showingPictures: false
  }

  linkspanKeyEnter = (event, venue) => {
    var code = event.keyCode || event.which;
    if(code === 13) {
      window.open("https://www.google.com/search?q=" + venue.name + ' ' + venue.location.formattedAddress[venue.location.formattedAddress.length - 2], '_blank');
    }
  }

  render() {
    let displaySidebar = this.props.sidebarOpen ? "block" : "none";
    let { classes } = this.props;
    return (
      <section id="sidebar" style={{ display: displaySidebar }}>
        <div id="sidebar-inner">

          {
            this.state.showingVenues &&
            <div>
              <input className="transition middlr input-s1" placeholder="Filter Venues"
                value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }} />

              <br/>

              <div className="">
                {
                  this.props.filtered && this.props.filtered.map((venue, key) => (
                    <VenueCard key={key} venue={venue} li_click={this.props.li_click} liKeyEnter={this.props.liKeyEnter}/>
                  ))
                }
              </div>
            </div>
          }

          <br/>

          { this.state.showingPictures &&
            <div>
              <p className="text-center"><strong>DMV Area<br/><small>(Flickr API)</small></strong></p>
              <ul id="pictures-ul">
                {
                  this.state.photos_list.map((photo, key) => (
                    <li key={key}>
                      <img alt={photo.title + ' - ' + photo.owner} src={photo.img} /> <br/>
                      <p><small><em>{photo.title}</em></small></p>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        </div>
      </section>
    );
  }
}


export default SideBar;