import React from "react";
import {connect} from "react-redux"
import {withRouter} from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import NavbarNotLoggedIn from '../component/NavbarNotLoggedin'


class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: '' }
  }
   
    isUsername=(e)=>{
       this.setState({username: e.target.value})
    }

    isPassword=(e)=>{
        this.setState({password: e.target.value})
    }

    isLoggedIn=(e)=>{
        e.preventDefault()
        const value = {user: {username: this.state.username, password: this.state.password}}
        console.log(value)
        fetch("https://mysterious-ravine-04822.herokuapp.com/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(value)
        })
        .then(res => res.json())
        .then(data =>{
          if(data.message){
            alert("Incorrect Username or Password")
          } else{
            localStorage.setItem("jwt", data.jwt)
            console.log("it worked", localStorage.jwt)
             this.props.history.push("/projects")
          } 
          // localStorage.setItem("token", data.jwt)
          // dispatch(loginUser(data.user))


          // console.log('resp', data)
            // if(data.jwt){
            //   LS.set('jwt', data.jwt)
            //   this.props.dispatch({
            //     type: "GET_USER",
            //     data
            //   });
            
            // // this.props.fetchAllData()
            // this.props.history.push("/projects")
            // } else{
            //     alert("Incorrect Username and Password")
            // }
            
        })
        return this.props.state
       
    }

    isNewUser=()=>{
        window.location.href = '/signup'
    }


    render(){
  return (
      <div>
               <NavbarNotLoggedIn /> 
      <header></header>
    <MDBContainer className="form-header" style={{paddingTop: "10em"}}>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard >
            <MDBCardBody >
              <MDBCardHeader className="form-header">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Login:
                </h3>
              </MDBCardHeader>
              <form onSubmit={this.isLoggedIn}>
                <div className="grey-text">
                  <MDBInput onChange={this.isUsername}
                    label="Type your username"
                    icon="envelope"
                    group
                    type="username"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput onChange={this.isPassword}
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>

              <div className="text-center mt-4">
                <MDBBtn
                  color="grey"
                  className="mb-3"
                  type="submit"
                >
                  Login
                </MDBBtn>
              </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <button id="btn_signup" onClick={this.isNewUser}>Not a member? Sign Up</button>
                  
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
    }
};

export default connect()(withRouter(Login));