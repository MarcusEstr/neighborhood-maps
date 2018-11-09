import React, { Component } from 'react';
/* Navigation Bar element for the top of the screen. */
class NavBar extends Component {
  render() {
    return (
      <nav id="navbar">
        <h3 id="head-text">Restaurant Maps</h3>
        <h3 tabIndex="0" className="transition menu-text" title={ this.props.menuText + " Sidebar" }
          onClick={() => { this.props.toggleSideBar() }} 
          onKeyPress={this.props.menuKeyEnter}
        >
          {
            this.props.sidebarOpen ?
            <i className="x-menu" >X</i> :
            <div className="hamburger-div">
                <p className="hamburger-menu" ></p>
                <p className="hamburger-menu" ></p>
                <p className="hamburger-menu" ></p>
            </div>
          }
        </h3>
      </nav>
    );
  }
}

export default NavBar;
