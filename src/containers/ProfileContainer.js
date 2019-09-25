import React from 'react';
import {connect} from 'react-redux';
// import ViewPost from '../component/ViewPost';
import Profile from '../component/Profile';

class ProfileContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clicked: false,
            post: {},
            myEvents: []
        }
    }

    isDetails=(e, post)=>{
        const myE = this.props.events.events.filter(event => event.post_id === post.id)
        this.setState({post: post, clicked: !this.state.clicked, myEvents: myE})   
     }


    render(){
        return(
            <div>
                <Profile isDetails={this.isDetails}  user={this.props.user["user"]}/>
            </div>
        )
    }



}

const mapStateToProps = state => state
export default connect(mapStateToProps)(ProfileContainer);