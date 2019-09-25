import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import ProfileCss from '../style/profile.css'
import {FaUserEdit} from 'react-icons/fa'
import {FaRegHandshake} from 'react-icons/fa'
import { getMyCollaborations } from "../services/Backend";
import {getCollaborating} from '../services/Backend'
import { getCollaboration } from "../services/Backend";
import { getUser } from "../services/Backend";
import NavbarLoggedIn from './NavbarLoggedin'
import { IoIosLink } from "react-icons/io";
// import {browserHistory} from 'react-router-dom'
// import ViewPost from './ViewPost';
// import ProfileContainer from '../containers/ProfileContainer'

class Profile extends React.Component {
    constructor(props){
        super(props)
        // console.log("props", this.props.isDetails)
        this.state = {
            post: {},
            clicked: false
        }
    }

    componentDidMount(){
       getUser().then(data => {
        this.props.dispatch({
          type: "GET_USER",
          data
        });
        getMyCollaborations().then(data => {
          this.props.dispatch({
            type: "GET_MYCOLLABORATIONS",
            data
          });
          getCollaborating().then(data => {
            this.props.dispatch({
              type: "GET_COLLABORATING",
              data
              });
            getCollaboration().then(data => {
              this.props.dispatch({
                type: "GET_COLLABORATION",
                data
              });
            });
          });
        });
      });
    }
   
    isLogout=()=>{
        window.localStorage.clear()
        window.location.href = '/'
    }

    isEditProfile=()=>{
        window.location.href = '/update_profile'
     }
    isViewPost=()=>{
        window.location.href = '/projects'
     }

     isCreatePost=()=>{
        window.location.href = '/createpost'
     }
    
    // viewThisPost=(e, post)=>{
    //   browserHistory.push({pathname: '/post', state: post});
    // }

    render(){
        //  console.log("i", this.props.post["posts"])
         const {name, school, skillset, id, img} = this.props.user.user
        const myPost = this.props.post.posts.filter((post) => post.user_id === id) 
          const listPost = myPost.map(post => {
            return (
                <div key={post.id}>
                  <IoIosLink/>
                  <Link to={{pathname: `/post/${post.id}` }}>{post.snippet}</Link> 
                 
                </div>
            )
         })

         const interested = this.props.collaborations.interestedCollabs.map(collab => {
           return (
             <div key={collab.id}>
                 <p><strong style={{textTransform: 'capitalize'}}>{collab.post.needed_skillset}:</strong> {collab.post.snippet}</p>
             </div>
           )
         })

         const collaborating = this.props.collaborations.collaborating.map(collab =>{
           return(
             <div key={collab.id}>
                <FaRegHandshake/>
               <Link to={{pathname: `/post/${collab.post_id}`}}>{collab.post.snippet} </Link>
              
             </div>
           )
         })


       
  return (
    <div>
    <NavbarLoggedIn /> 
    <div className="profile-container"> 

    <div className="row">
      <div className="column left">
      <div className="projects"><h3 className="profile-title">Projects</h3>
      <hr></hr>
               {listPost}
            </div>
            <div className="projects"><h3 className="profile-title">collaborating</h3>
            <hr></hr>
            {collaborating}
            </div>
            <div  className="projects" ><h3 className="profile-title">Awaiting response</h3>
               <hr></hr>
                {interested}

                </div>
            
            </div>
     
      <div className="column right">
      <MDBCol>
        <MDBCard >
          <MDBCardImage className="img-fluid" src={img} waves />
          <MDBCardBody>
            <MDBCardTitle>{name}</MDBCardTitle>
              <div>School: {school} </div>
              <div>Skillset: {skillset}</div>
              <hr/>
            <MDBBtn onClick={this.isEditProfile}><FaUserEdit/> Edit Profile</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    </div>
    </div>
    </div>
  
    
          )}
}


 const mapStateToProps = state => state
export default connect(mapStateToProps)(Profile);

