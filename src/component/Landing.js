import React from 'react'
import {connect} from 'react-redux'
import LandingStyle from '../style/landing.css'
import students from '../images/brooke-cagle--uHVRvDr7pg-unsplash.jpg'
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import NavbarLoggedIn from './NavbarLoggedin'
import NavbarNotLoggedIn from './NavbarNotLoggedin'
import podcast from '../images/cowomen-QziaoZM0M44-unsplash.jpg'
import film from '../images/jakob-owens-ycExgCMRggc-unsplash.jpg'
import group from '../images/helena-lopes-UZe35tk5UoA-unsplash.jpg'



function Landing(){


    return(
      <div>
        <a id="top_landing">
         {localStorage.jwt?  <NavbarLoggedIn /> : <NavbarNotLoggedIn/>}
         </a>
            <div className="landing_container">
            <div className="jumbotron">
      

        <Fade left>
          <h1 style={{fontSize: "80px"}}>Collaboration Corner</h1>
        </Fade>
        <Pulse>
          <p>A student portal for collaborating to build your idea.</p>
        </Pulse>
        </div> 
          <img className="working_a"src={students} alt="students"/>

        <a id="about_page" >
        <br></br>

          <div className="about_us"><h1 className="about_font">About</h1></div>
          <div class="row landing">
          <div className="column_landing">
            <img className="about_img"src={podcast} alt="students"/>
          </div>
          <div className="column_landing">
          {/* <img className="about_img"src={group} alt="students"/> */}
          <p>Welcome to Collaboration Corner! The idea for this site was designed 
            by a student who thought how great it would be if students with different skill sets 
            could collaborate to build an idea. It would provide a great opportunity to practice developing new skills through unique and focused communication with peers to accomplish a common goal.  </p>
            <br></br>
          <p>This platform also is a great place to networkw with your peers and gain experience you can add to your resume.
            </p>
            <br></br>
          <p>No idea is a bad idea. Want to start a dance crew, create a short film, or build a website. Reach out to your student body and collaborate.</p>
            </div>
          <div className="column_landing">
            <img className="about_img"src={group} alt="students"/>
        
        </div>
        </div>
        </a>
       
      </div>
      <footer className="footer_landing"><h3>Thanks for visitng Collaboration Corner</h3>
      <p>Designed by Reina Ewing</p>
      <p>Happy</p>
      </footer>
     
        </div>
       
    )
}

export default connect()(Landing);
