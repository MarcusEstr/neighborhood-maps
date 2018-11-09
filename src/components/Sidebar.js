import React, { Component } from 'react';
import VenueCard from './VenueCard';

/* Sidebar component which holds restaraunt names and addresses. */
class SideBar extends Component {
  state = {
    photos_list: [],
    showingVenues: true,
    showingPictures: false
  }

  render() {
    let displaySidebar = this.props.sidebarOpen ? "block" : "none";
    return (
      <section id="sidebar" style={{ display: displaySidebar }}>
        <div id="sidebar-inner">
          {
            this.state.showingVenues &&
            <div>
              <p className="search-label">Search for Restaurants:</p>
              <input className="transition middlr input-s1" placeholder="Search Here"
                value={this.props.query} 
                onChange={(e) => { this.props.filterVenues(e.target.value) }} 
              />
              <br/>
              <div className="sidebar-div">
                {
                  this.props.filtered && this.props.filtered.map((venue, key) => (
                    <VenueCard key={key} venue={venue} 
                      li_click={this.props.li_click} 
                      liKeyEnter={this.props.liKeyEnter}
                    />
                  ))
                }
              </div>
            </div>
          }
        </div>
      </section>
    );
  }
}

export default SideBar;