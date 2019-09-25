import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import LS from 'local-storage'
import CreatePostCss from '../style/create_post.css'
import NavbarLoggedIn from '../component/NavbarLoggedin'

class CreatePost extends React.Component{
       
    isEditUser =(e)=> {
        e.preventDefault()
        const skillset = this.isNewSkillsetNeeded.value
        const snippet = this.isNewSnippet.value
        const description = this.isNewDescription.value
        const isPost = {
                user_id: this.props.user.id,
                needed_skillset: skillset, 
                snippet: snippet, 
                description: description, 
                userproject: null
        }    
        fetch("https://mysterious-ravine-04822.herokuapp.com/posts",{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": 'bearer ' + localStorage.jwt
        },
        body: JSON.stringify(isPost)
        })
        .then(res => res.json())
        .then(this.props.history.push("/projects"))
    }

    render(){
        console.log(this.props.user)
        return(
            <div>
                    <NavbarLoggedIn /> 
                 <div className="new_post"><h1>Create Post</h1></div>
                <form className="create_post" onSubmit={this.isEditUser}>
                   
                    <div><label>Needed Skillset:</label></div>
                    <input  type="text" name="skillset_needed" ref={(value) => this.isNewSkillsetNeeded = value}></input>
                    <div><label>Snippet of info:</label></div>
                    <input  type="text" name="snippet" ref={(value) => this.isNewSnippet = value}></input>
                    <div><label>Details :</label></div>
                    <input type="text" name="description" ref={(value) => this.isNewDescription = value}></input>
                    <div><input type="submit" value="submit" /></div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default withRouter(connect(mapStateToProps)(CreatePost));