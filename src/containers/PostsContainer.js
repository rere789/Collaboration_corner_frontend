import React from 'react';
import {connect} from 'react-redux';
import {getPost} from '../services/Backend';
// import Post from '../component/Posts'
// import { isTemplateElement } from '@babel/types';
import { Modal } from 'react-bootstrap';
import PostCss from '../style/posts.css'
import {FaHandshake} from 'react-icons/fa'
import {FaSpinner} from 'react-icons/fa'
import { getUser } from "../services/Backend";
import { getCollaboration } from "../services/Backend";
import { getMyCollaborations } from "../services/Backend";
import NavbarLoggedInCss from '../style/navbarloggedin.css'
import NavbarNotLoggedIn from '../style/navbarNot.css'
import NavbarLoggedIn from '../component/NavbarLoggedin'

class PostContainer extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            posts: [],
            viewPost: false,
            comment: "",
            post: {},
            setShow: false,
            show: false,
            clicked: false,
            user: null 
        }
    }

    componentDidMount=()=>{
        getUser().then(data => {
            this.props.dispatch({
              type: "GET_USER",
              data
          });
        //   getUser().then(data => this.setState({user: data})) 
            getPost().then(data => this.props.dispatch({
                type: 'GET_POSTS',
                posts: data
            }));
            getPost().then(data => this.setState({posts: data}))
           
                getCollaboration().then(data => {
                    this.props.dispatch({
                    type: "GET_COLLABORATION",
                    data
                    });
                    getMyCollaborations().then(data => {
                        this.props.dispatch({
                        type: "GET_MYCOLLABORATIONS",
                        data
                        });
                    })
                })
        })
     }

    isProfile=()=>{
        window.location.href = '/myprofile'
    }

    showForm=(e, post)=>{
        this.setState({setShow: true, show: true, post: post})
    }

    handleClose=()=>{
        this.setState({setShow:false, show:false})
    }

    isClicked=(e, post)=>{
        const myId = this.state.user.user.id
        console.log(myId)
         const id = post.id
         const comment = e.target.value
            const updatePost = this.state.posts.filter(p => p.id !== post.id)
            post.interested = !post.interested
            this.setState({posts: [...updatePost, post]})
            fetch(`https://mysterious-ravine-04822.herokuapp.com/userprojects/`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            'Authorization': 'bearer ' + localStorage.jwt

            },
            body: JSON.stringify({
            user_id: myId,
            post_id: id,
            comment: comment,
            interested: true, 
            collaborating: false
            })
            })
            .then(res => res.json())
            .then( window.location.href = '/projects')
         
    }
    
    render(){
       const userId = this.props.user.user.id
       const id = this.state.post.id
   
       const checking = this.props.collaborations.interestedCollabs.filter(collab => collab.post_id === id && collab.user_id === userId)
       const checkingAgain = this.props.collaborations.collaborating.filter(collab => collab.post_id === id && collab.user_id === userId)
       
       return(
            <div>
                <NavbarLoggedIn /> 
                <div className="post_title"> <h1>Posts</h1></div>
                
                <div className="post_listing">
                {/* {this.state.posts.map(post => <Post post={post} key={post.id} onClick={this.isClicked} user={user}/>)} */}
                {this.state.posts.map((key, value) => {
                    return(
                        <div>
                            <h3>{key.needed_skillset}</h3>
                            <i>{key.snippet}</i>
                            <button className="inter_btn" onClick={(e) => this.showForm(e, key)} >Interested</button>
                            {key.userprojects.map((k, v) => {
                                if(k.interested && k.user_id === userId && k.collaborating === false){
                                   return( 
                                       <div >
                                           <button className="interested-btn"><FaSpinner/> waiting response</button>
                                           {/* <hr></hr> */}
                                   </div> )
                                }else if(k.interested && k.user_id === userId && k.collaborating === true){
                                    return( 
                                        <div key={k.index}>
                                            <button className="interested-btn" ><FaHandshake/> collaborating</button>
                                        </div>
                                    )
                                } 
                            }
                            ) }
                            <hr className="divider"/>
                        </div> 
                    )
                }) 
            }   {checking.length >= 1 || checkingAgain.length >= 1 ? alert("already interested or collaborating on this") : (
                <Modal show={this.state.show} className="modal fade" id="event-form" >
              {/* <div className="modal-dialog" role="document" > */}
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Collaboration Request</h5>
                  </div>
                  <div className="modal-body">
                    <p>From: {this.props.user.user.name}</p>
                    <p>Requested Skillset: {this.state.post.needed_skillset}</p>
                    <form>
                      <label>
                        Comment
                      </label>
                      <input type="text" name="comment" onChange={this.handleComment} />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={e => this.isClicked(e, this.state.post)}>Interested</button>
                    <button variant="secondary" onClick={this.handleClose}>Close</button>
                  </div>
                {/* </div> */}
              </div>
          </Modal>
                )} 
                </div>
            </div>
    )    
 }

}




 const mapStateToProps = state => state
export default connect(mapStateToProps)(PostContainer);



// <div>
//                                 {k.interested && k.user_id === userId? <button>waiting</button>: <button>interested</button>}    
                            
//                             </div>