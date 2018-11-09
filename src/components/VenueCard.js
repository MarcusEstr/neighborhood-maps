import React, { Component } from 'react';

/* Venuecard component which holds restaurant name and address. */
class VenueCard extends Component {
  render() {
    const { venue } = this.props;
    return (
        <div className="venue-div" tabIndex="0" role="link" onClick={() => 
          { this.props.li_click(venue) }} 
          onKeyPress={(event) => { this.props.liKeyEnter(event, venue) }}
        >
            <h2>
              <span className="venue-name"
                onKeyPress={(event) => { this.linkspanKeyEnter(event, venue) }}
              >
                { venue.name }
              </span>
            </h2>
            <p>
              {
                venue.location.formattedAddress.map((value, index) => {
                  return index === (venue.location.formattedAddress.length - 1) ?
                  <span key={index}><span>{value}</span></span> :
                  (<span  key={index}><span>{value}</span><br/></span>)
                })
              }
            </p>
      </div>
    );
  }
}

export default VenueCard;