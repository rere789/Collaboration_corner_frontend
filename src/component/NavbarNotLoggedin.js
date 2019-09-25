import React from 'react'
import { Link } from "react-router-dom";
import '../style/navbarNot.css'
import { HashLink as Link_to } from 'react-router-hash-link';
import {FaUsers} from 'react-icons/fa'
import {FaInfoCircle} from 'react-icons/fa'
import { MdVpnKey } from "react-icons/md";




class NavbarLoggedin extends React.Component{


    render(){
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
            <Link to="/login" className="nav-link">
               <MdVpnKey/> Login
              </Link>
          </li>
             {/* <Link to="/login" className="nav-link">
                Login
              </Link>
                <Link to="/" className="nav-link">
                  Home
                </Link>
         */}
              {/* </li> */}
          </ul>
        </nav>
          </div>


        )
    }


}

export default NavbarLoggedin;

// navbar-expand-lg navbar-light bg-light