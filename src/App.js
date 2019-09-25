import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./component/Login";
import Profile from "./component/Profile";
import Signup from "./containers/Signup";
import UserUpdate from "./containers/UserUpdate";
// import { getUser } from "./services/Backend";
import { connect } from "react-redux";
import Posts from "./component/Posts";
import { getPost } from "./services/Backend";
import CreatePost from "./containers/CreatePost";
import ViewPost from "./component/ViewPost";
import PostContainer from "./containers/PostsContainer";
import ProfileContainer from "./containers/ProfileContainer";
// import { getEvents } from "./services/Backend";
// import { getCollaboration } from "./services/Backend";
// import { getMyCollaborations } from "./services/Backend";
import Landing from "./component/Landing";
// import {getCollaborating} from './services/Backend'
import NavbarLoggedIn from './component/NavbarLoggedin'
import NavbarNotLoggedIn from './component/NavbarNotLoggedin'
import navloggedincss from './style/navbarloggedin.css'
import navnologgedin from './style/navbarNot.css'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  // fetchAllData = () => {
    componentDidMount(){
      // getUser().then(data => {
      //   this.props.dispatch({
      //     type: "GET_USER",
      //     data
      //   });
        getPost().then(data => {
          this.props.dispatch({
            type: "GET_POSTS",
            posts: data
          }); 
        // getEvents().then(data => {
        //   this.props.dispatch({
        //     type: "GET_EVENTS",
        //     data
        //   });
          // getCollaboration().then(data => {
          //   this.props.dispatch({
          //     type: "GET_COLLABORATION",
          //     data
          //   });
            // getCollaborating().then(data => {
            //   this.props.dispatch({
            //     type: "GET_COLLABORATING",
            //     data
            //   });
              // getMyCollaborations().then(data => {
              //   this.props.dispatch({
              //     type: "GET_MYCOLLABORATIONS",
              //     data
                // });
        
    });}
    

    
  

  // componentDidMount() {
  //   this.fetchAllData();
  // }

  render() {
    // console.log(localStorage.jwt)
    return (
      <div>
      {/* <head> <link href="https://fonts.googleapis.com/css?family=Comfortaa&display=swap" rel="stylesheet"></link></head> */}
        {/* {localStorage.jwt?  <NavbarLoggedIn /> : <NavbarNotLoggedIn/>} */}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/login"
            render={() => <Login />}
          />
          <Route exact path="/profile" render={() => <Profile />} />
          <Route
            exact
            path="/signup"
            render={() => <Signup />}
          />
          <Route exact path="/update_profile" render={() => <UserUpdate />} />
          <Route exact path='/posts/:id' render={(routeProps) => {
            console.log(routeProps)
            return <Posts routeProps={routeProps}/>
          }} />
          <Route exact path="/createpost" render={() => <CreatePost />} />
          <Route exact path="/post/:id" render={(routeProps) => { return <ViewPost routeProps={routeProps}/>}} />
          <Route exact path="/projects" render={() => <PostContainer />} />
          <Route
            exact
            path="/myprofile"
            render={props => (
              <ProfileContainer {...props} />
            )}
          />
          <Route exact path="/post" render={() => <ViewPost />} />
        </Switch>
      </div>
    );
  }
}

export default connect()(App);
