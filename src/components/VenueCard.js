import React, { Component } from 'react';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  paper: {
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    maxWidth: '95%',
    borderRadius: '0',
  },
  card: {
    maxWidth: '100%',
    borderRadius: '0',
    border: '1px solid grey',
    marginBottom: '10px'
  },
  media: {
    objectFit: 'cover',
  },
});

class VenueCard extends Component {
  render() {
    const { classes, venue } = this.props;

    return (
        <div onClick={() => { this.props.li_click(venue) }} onKeyPress={(event) => { this.props.liKeyEnter(event, venue) }}>
            <h2>
              <span className="venue-name"
                onKeyPress={(event) => { this.linkspanKeyEnter(event, venue) }}>
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