import React from 'react'
import { Link } from "react-router-dom";
import navbarlogged from '../style/navbarloggedin.css'
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import {FaUsers} from 'react-icons/fa'
import {FaUserEdit} from 'react-icons/fa'
import {FaFeatherAlt} from 'react-icons/fa'
import {IoIosPerson} from 'react-icons/io'
import {FaHandPeace} from 'react-icons/fa'
import {FaArrowDown} from 'react-icons/fa'
import { HashLink as Link_to } from 'react-router-hash-link';
import {FaInfoCircle} from 'react-icons/fa'


class NavbarLoggedin extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
      this.setState({
          collapse: !this.state.collapse,
        });
    }

  isLogout=()=>{
    window.localStorage.clear()
    window.location.href = '/'
  }

    render(){
      const bgPink = {backgroundColor: '#e91e63'}
      const container = {height: 1300}
        return(
    
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to="/#top_landing" className="nav-link">
                  <FaUsers/> Home
                </Link>
              </li>
              <li>
                <Link_to to="/#about_page" className="nav-link">
                <FaInfoCircle/> About</Link_to>
              </li>
              <li>
                <Link to="/profile" className="nav-link">
                  <IoIosPerson/> Profile
                </Link>
              </li>
              <li>
                <Link to="/projects" className="nav-link">
                  <FaArrowDown/>Post
                </Link>
              </li>
              <li>
                <Link to="/update_profile" className="nav-link">
                <FaUserEdit/> Update Profile 
                </Link>
              </li>
              <li>
                <Link to="/createpost" className="nav-link">
                  <FaFeatherAlt/> Create Post
                </Link>
              </li>
            </ul>
           <button className="nav_btn" onClick={this.isLogout}><FaHandPeace/> Logout</button>
          </nav>
            </div>


        )
    }


}

export default NavbarLoggedin;