import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import LS from 'local-storage'
import Updateuser from '../style/edit_profile.css'
import NavbarLoggedIn from '../component/NavbarLoggedin'


class UserUpdate extends React.Component{
       
    isEditUser =(e)=> {
        e.preventDefault()
            const jwt = LS.jwt
        const username = this.isNewUsername.value
        const name = this.isNewName.value
        const skillset = this.isNewSkillset.value
        const school = this.isNewSchool.value
        const img = this.isNewImg.value
        const id = parseInt(this.props.user.user.id)
        const isUser = {
                id: id,
                username: username, 
                name: name, 
                skillset: skillset, 
                school: school, 
                img: img
        }    
        this.props.dispatch({type: 'EDIT_USER', user: isUser})
        fetch("https://mysterious-ravine-04822.herokuapp.com/updateprofile",{
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(isUser)
        })
        .then(res => res.json())
        .then(this.props.history.push("/profile"))
    }

    render(){
        console.log(this.props.user.user)
        const {username, name, skillset, school, img} = this.props.user.user
        return(
            <div>
                 <NavbarLoggedIn /> 
                <di className="edit_profile"><h1>Edit your profile</h1>
                </di>
            <div></div>
            <div>
                <form className="edit_form" onSubmit={this.isEditUser}>
                    <div><label>Username:</label></div>
                    <input type="text" defaultValue={username} name="username" ref={(value) => this.isNewUsername = value}></input>
                    <div><label>Name:</label></div>
                    <input type="text" defaultValue={name} name="name" ref={(value) => this.isNewName = value}></input>
                    <div><label>Skillset:</label></div>
                    <input type="text" defaultValue={skillset} name="skillset" ref={(value) => this.isNewSkillset = value}></input>
                    <div><label>School:</label></div>
                    <input type="text" defaultValue={school} name="school" ref={(value) => this.isNewSchool = value }></input>
                    <div><label>Image url:</label></div>
                    <input type="text" defaultValue={img} name="img" ref={(value) => this.isNewImg = value}></input>
                    <div><input type="submit" value="submit"></input></div>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }  
}

export default withRouter(connect(mapStateToProps)(UserUpdate));