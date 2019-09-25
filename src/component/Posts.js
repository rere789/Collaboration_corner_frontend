import React from 'react';
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
// import PostContainer from '../containers/PostsContainer'




const Posts =(props)=>{
    
        
        const currentPost = parseInt(props.routeProps.match.params.id)

        console.log("hi", props.routeProps.match.params.id)
        const myPost = props.post.posts.filter(post => post.id === currentPost)
        console.log(myPost[0])
       
        // const {needed_skillset, snippet,userprojects} = this.props.post
        // const userId = this.props.user.id
        // console.log("id", userId)
        //  const mycollabs = userprojects.filter(c => c.user_id === userId)
        //  console.log("1", mycollabs)
        //  const interId = mycollabs.map(collab => {
        //      if(collab.interested === true){
        //      return (
        //          <div>
        //              <button>Waiting response</button>
        //          </div>
        //      )
        //      } else {
        //         return (
        //             <button>Interested</button>
        //         )
        //      }
        //  })


        //  const inter = mycollabs.map(collab => collab.interested)
        // console.log("2", inter, interId)
       
        return(
            <div>
                <h1>Individual Post</h1>
                <h2>{myPost[0].snippet}</h2>
                {/* <h3>{needed_skillset}</h3>
                <i>{snippet}</i>
                <p>{this.props.post.userprojects.interested}</p> 
                {interId}
                 {/* <button>{inter}</button> */}
                   {/* {inter === true ? <button>true</button>: <button>false</button>}  
                  <button>Waiting for Response</button> 
                 : <button onClick={e => this.props.onClick(e, this.props.post)}>Interested</button>}   */}
                {/* <hr/> */} 
            </div>
        )
    
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Posts); 