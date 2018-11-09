import React, { Component } from 'react';
import './App.css';
import MapDiv from './components/MapDiv';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

import * as utils from './utils'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: null,
      sidebarOpen: false,
      query: "",
      showModal: false
    }
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.menuKeyEnter = this.menuKeyEnter.bind(this);
    this.infoKeyEnter = this.infoKeyEnter.bind(this);
    this.liKeyEnter = this.liKeyEnter.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.li_click = this.li_click.bind(this);
    this.liKeyEnter = this.liKeyEnter.bind(this);
    this.filterVenues = this.filterVenues.bind(this);
  }

  /* Functionality for showing and hiding elements */
  handleClose () {
    this.setState({ showModal: false });
  }

  handleShow () {
    this.setState({ showModal: true });
  }

  toggleSideBar () {
    this.setState(state => ({ sidebarOpen: !state.sidebarOpen }));
  }

  toggleModal () {
    this.setState(state => ({ showModal: !state.showModal }));
  }

  /* Access Google Maps API and return it. */
  getGoogleMaps() {
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        window.resolveGoogleMapsPromise = () => {
          resolve(window.google);
          delete window.resolveGoogleMapsPromise;
        };
        const script = document.createElement("script");
        const API = 'AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y';
        //const API = 'A';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }
    return this.googleMapsPromise;
  }

  componentWillMount() {
    this.getGoogleMaps();
  }

  /* When the sidebar items are clicked, center on the corresponding marker. */
  li_click(venue) {
    let marker = this.markers.filter(m => m.venue.id === venue.id)[0];
    let info_obj = this.info_boxes.filter(i => i.id === venue.id)[0];
    let infoBox = (info_obj && info_obj.contents) || "nothing...";
    if(marker && infoBox) {
      if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
      setTimeout(() => { marker.setAnimation(null) }, 700);

      this.infowindow.setContent(infoBox);
      this.map.setZoom(13);
      this.map.setCenter(marker.position);
      this.infowindow.open(this.map, marker);
      this.map.panBy(0, -125);
      if(window.innerWidth < 769) {
        this.toggleSideBar();
      }
    }
  }

  componentDidMount() {
    let get_google = this.getGoogleMaps();
    let get_venues = utils.loadPlaces();

    Promise.all([ get_google, get_venues ])
    .then(values => {
      // console.log(values);
      let google = values[0];
      let venues = values[1];

      let markers = [];
      let info_boxes = [];

      /* Create Google Maps map to be placed in Map HTML element.
      Center point on the first element of the venues array. */
      this.google = google;
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        scrollwheel: true,
        center: { lat: venues[0].location.lat, lng: venues[0].location.lng }
      });

      /* Fetch details from the venues array. */
      venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          formattedAddress: venue.location.formattedAddress,
          animation: google.maps.Animation.DROP
        });

        /* Set up data that shows up on InfoWindow. */
        let infoBox = '<div class="info_box">' +
        '<h4>' + venue.name + '</h4>' +
        '<p>' + utils.aft(venue.location.formattedAddress) + '</p>' +
        '<img class="middlr" alt="' + venue.name + '" src="' + utils.getGoogleImage(venue) + '" />' +
        '</div>';

        /* Set or remove marker animation when marker is clicked on. */
        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
				  else { marker.setAnimation(google.maps.Animation.BOUNCE); }
				  setTimeout(() => { marker.setAnimation(null) }, 700);
        });
        
        /* Show the infoWindow with content when a marker is clicked. */
        google.maps.event.addListener(marker, 'click', () => {
  			   this.infowindow.setContent(infoBox);
				   this.map.setZoom(13);
				   this.map.setCenter(marker.position);
				   this.infowindow.open(this.map, marker);
				   this.map.panBy(0, -125);
			  });
        markers.push(marker);
        info_boxes.push({ id: venue.id, name: venue.name, contents: infoBox });
      });

      this.venues = utils.sort_by(venues, "name", "asc");
      this.markers = utils.sort_by(markers, "name", "asc");
      this.info_boxes = utils.sort_by(info_boxes, "name", "asc");

      this.setState({ sidebarOpen: true, filtered: this.venues });
    })
    .catch(error => {
      console.log(error);
      alert('Sorry, the page could not load.');
    })
  }

  /* Loop through each marker. Check if user's query matches any names.
  If there is a match, then the marker is visible. 
  If there is not a match, then the marker is disabled. */
  filterVenues(query) {
    let f = query ? this.venues.filter(v => v.name.toLowerCase().includes(query)) : this.venues;
    this.markers.forEach(m => {
      m.name.toLowerCase().includes(query) ?
      m.setVisible(true) :
      m.setVisible(false);
    });
    this.setState({ filtered: f, query: query });
  }

  /* Tracking of keypresses on different elements to toggle visibility. */
  menuKeyEnter(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      this.toggleSideBar();
    }
  }

  infoKeyEnter(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      this.toggleModal();
    }
  }

  liKeyEnter(event, venue) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      this.li_click(venue);
    }
  }

  render() {
    let displaySidebar = this.state.sidebarOpen ? "block" : "none";
    let menuText = this.state.sidebarOpen ? "Close" : "Open";

    return (
      <div id="app-container">
        <NavBar
          menuText={menuText}
          sidebarOpen={this.state.sidebarOpen}
          toggleSideBar={this.toggleSideBar}
          toggleModal={this.toggleModal}
          li_click={this.li_click}
          handleShow={this.handleShow}
          infoKeyEnter={this.infoKeyEnter}
          menuKeyEnter={this.menuKeyEnter} />
        <SideBar
          menuText={menuText}
          query={this.state.query}
          filtered={this.state.filtered}
          sidebarOpen={this.state.sidebarOpen}
          toggleSideBar={this.toggleSideBar}
          liKeyEnter={this.liKeyEnter}
          filterVenues={this.filterVenues}
          li_click={this.li_click}
          // liKeyEnter={this.liKeyEnter}
          handleShow={this.handleShow}
          displaySidebar={displaySidebar} />
        <MapDiv />
      </div>
    );
  }
}

export default App;