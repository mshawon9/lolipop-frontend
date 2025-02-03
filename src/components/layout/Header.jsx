import React, { Component } from "react";
import LeftNavbar from "./LeftNavbar";

class Header extends Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <LeftNavbar />
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}

          <li className="nav-item">
            <a
              className="nav-link px-3 bg-gradient-danger"
              href="/admin-panel/logout"
            >
              Sign out
              <i className="ml-1 fas fa-sign-out-alt" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
