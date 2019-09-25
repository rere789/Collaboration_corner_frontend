import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import LS from 'local-storage'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import NavbarNotLoggedIn from '../component/NavbarNotLoggedin'

class FormPage extends React.Component{
    state= {
        username: "",
        password: ""
    }

    isNewUserName= (e)=>{
        this.setState({ username: e.target.value})
    }

    isNewUserPassword= (e)=>{
        this.setState({ password: e.target.value})
    }


    isCreateUser=(e)=>{
        e.preventDefault()

        const isUser = {user: {username: this.state.username, password: this.state.password}}
        
        fetch("https://mysterious-ravine-04822.herokuapp.com/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(isUser)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.jwt){
            LS.set('jwt', data.jwt)
            this.props.history.push("/projects")
            } else{
                alert("Incorrect Username and Password")
            }
            console.log(isUser)
        })
        // .then(this.props.fetchAllData())
    }
    

    render(){
  return (
    <div>
       <NavbarNotLoggedIn/> 
    <MDBContainer style={{paddingTop: "10em"}}>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={this.isCreateUser}>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput onChange={this.isNewUserName}
                    name="username"
                    label="Your name"
                    icon="user"
                    type="text"
                    validate
                    // error="wrong"
                    // success="right"
                  />
                  <MDBInput onChange={this.isNewUserPassword}
                    label="Your password"
                    name="password"
                    icon="password"
                    type="password"
                    // success="right"
                  />
                  {/* <MDBInput
                    label="Confirm your email"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  /> */}
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="grey" type="submit">
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );}
};

export default connect()(withRouter(FormPage));