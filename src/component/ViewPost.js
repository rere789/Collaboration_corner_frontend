import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
// import {render} from 'react-dom';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from 'react-bootstrap';
import ViewPostCss from '../style/ViewPost.css'
import ProfileCss from '../style/ViewPost.css'
import Fade from 'react-reveal/Fade';
import { getEvents } from "../services/Backend";
import NavbarLoggedIn from './NavbarLoggedin'
import { getCollaboration } from "../services/Backend";
import { getMyCollaborations } from "../services/Backend";
import {getCollaborating} from '../services/Backend'


const localizer = momentLocalizer(moment)
const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

function reviver(key, value) {
  if (typeof value === "string" && dateFormat.test(value)) {
      return new Date(value);
  }
  return value;
}


class ViewPost extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          // events: this.props.calendar.events,
          setShow: false,
          show: false,
          event_id:null,
          event_start_on: null,
          event_end_on:null,
          event_title: null,
          events: [],
          clicked: false,
          postId: null,
          viewPost: [],
          interestedUser: null
        };
      }

      componentDidMount(){
        const currentPostId = parseInt(this.props.routeProps.match.params.id)
        this.setState({postId: currentPostId})
        fetch(`https://mysterious-ravine-04822.herokuapp.com/posts/${currentPostId}`)
        .then(res => res.json())
        .then(data => this.setState({viewPost: data, events: data.events}))
        getEvents().then(data => {
          this.props.dispatch({
            type: "GET_EVENTS",
            data
          });
           getCollaboration().then(data => {
            this.props.dispatch({
              type: "GET_COLLABORATION",
              data
            });
            getCollaborating().then(data => {
              this.props.dispatch({
                type: "GET_COLLABORATING",
                data
              });
              getMyCollaborations().then(data => {
                this.props.dispatch({
                  type: "GET_MYCOLLABORATIONS",
                  data
                });
              });
            });
          });
        });
      }
      
// isDeletePost=(e, id)=>{
//     const postId =  id 
//      const jwt = localStorage.jwt
//     console.log("d", postId)
//     fetch(`http://localhost:3000/posts/${postId}`,{
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "accept": "application/json",
//             "Authorization": `Bearer ${jwt}`
//         },
//     })
//      window.location.href = '/posts'
// }

    viewProfile(){
        window.location.href = '/myprofile'
    }

    handleSelectEvent(event) {
      this.setState({clicked: !this.state.clicked, event_title: event.title, event_start_on: event.start, event_end_on: event.end })
    }

    isHandleClose=()=>{
      this.setState({clicked: !this.state.clicked})
    }

    createEvent = (element) => {
      console.log( this.state.event_start_on, this.state.event_end_on)
      fetch("https://mysterious-ravine-04822.herokuapp.com/createevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          'Authorization': 'bearer ' + localStorage.jwt
        },
        body: JSON.stringify({
          post_id: this.state.postId, 
          title: this.state.event_title,
          start: this.state.event_start_on,
          end: this.state.event_end_on
        })
      })
      .then(res => res.json())
      .then(data => {
        this.setState({show: false, setShow: false, events: [...this.state.events, data]})
      })
    }

    createCollaborations=(e, user)=>{

      const thisUserProject = this.props.collaborations.collaborations.filter(c => 
      c.post_id === this.state.postId && c.user_id === user.id)
        console.log(user)

      // const jwt = localStorage.jwt
      fetch("https://mysterious-ravine-04822.herokuapp.com/addcollaboration", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          'Authorization': 'bearer ' + localStorage.jwt
        },
        body: JSON.stringify({
          id: thisUserProject[0].id,
          post_id: this.state.postId,
          user_id: user.id,
          interested: true,
          collaborating: true,
          comment: "Excited to work with you"

        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }

    handleClose = () => {
      this.setState({
        show: false,
        setShow: false, 
        clicked: false
      })
    }

    handleInputChange = (e) => {
      this.setState({
        event_title: e.target.value
      })
    }

    openModal = (element, target) => {
      this.setState({
        modal: true,
        event_id: element.id ? element.id : null,
        event_start_on: element.start,
        event_end_on:element.end,
        show: true,
        setShow: true
      })
    }
   
    render(){
      const me = parseInt(this.props.user.user.id)
      const interestedUsers = this.props.collaborations.collaborations.filter(collab => collab.post_id === this.state.postId && collab.collaborating === false)
      const collaboratingUsers = this.props.collaborations.collaborations.filter(collab => collab.post_id === this.state.postId && collab.collaborating === true)
       const user = interestedUsers.map(u => u.user)
       const username = user.map(name => name.name)
       console.log("colab users", collaboratingUsers)
     
  
        return(
          <div>
           <NavbarLoggedIn />
            <div className="view-container">
          {/* <button onClick={this.viewProfile}>Profile</button>  */}
            <div className="view_post_header">
            <Fade left>
            <h1>Looking for: {this.state.viewPost.snippet}</h1>
              </Fade>

            <Fade>
              <p>{this.state.viewPost.description}</p>
            </Fade>
              
              </div>
        
            <div class="row">
            <div class="column left">
            <h3 className="inter_c">COLLABORATING</h3>
            {collaboratingUsers.map(user => {
              return(
                <div className="collabcard">
                  <img className="tumbnail_img" src={user.user.img} alt="profile image"/>  <p>{user.user.name}</p>
                
                </div>
              )
            })}
            <h3 className="inter_c">Interested in collaborting</h3>
            {/* <hr className="hr_post"></hr> */}
                {user.map(name => {
                  return(
                  
                  <div className="inter_card" key={name.id}>
                    <img className="tumbnail_img" src={name.img} alt="profile image"/><h4>{name.name}</h4>
                    <i>skillset: {name.skillset}</i>
                    <p>school: {name.school}</p>
                    <button className="collaboratebtn" onClick={e => this.createCollaborations(e, name)}>Collaborate with {name.name}</button>
                    </div>
                   
                )
              })}
              </div>
              <div className="column right">
              <Calendar
                    views={['month']}
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectEvent={event => this.handleSelectEvent(event)}
                    onSelectSlot={(slotInfo) => this.openModal(slotInfo)}
                    style={{ height: "50vh", width: "100%" }}
                />
              </div>
            </div>

           

                    {this.state.clicked? ( 
                <Modal.Dialog className="pop_modal">
                  <Modal.Header onClick={this.handleClose}>
                    <Modal.Title>{this.state.event_title}</Modal.Title>
                    <div className="modal-body">
                   {/* {Intl.DateTimeFormat('en-US',{
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit' }).format(this.state.event_start_on)} */}
                    {/* <p>from : {this.state.event_start_on ? this.state.event_start_on.toLocaleDateString():''}</p>
                    <p>to : {this.state.event_end_on ? this.state.event_end_on.toLocaleDateString():''}</p> */}
                    </div>
                  </Modal.Header>

                  <Modal.Footer>
                    <button variant="secondary" onClick={this.handleClose} >Close</button>
                  </Modal.Footer>
                </Modal.Dialog>) 
                : null}


          <Modal show={this.state.show} className="modal fade" id="event-form" style={{paddingTop: "10em"}}>
              {/* <div className="modal-dialog" role="document" > */}
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Your Selected Time</h5>
                </div>
                  <div className="modal-body">
                    <p>from : {this.state.event_start_on ? this.state.event_start_on.toLocaleString():''}</p>
                    <p>to : {this.state.event_end_on ? this.state.event_end_on.toLocaleString():''}</p>

                     <form>
                      <label>
                        Title
                      </label>
                      <input type="text" name="title" onChange={this.handleInputChange} />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={this.createEvent}>Schedule</button>
                    <button variant="secondary" onClick={this.handleClose}>Close</button>
                  </div>
                  </div>
                {/* </div> */}
          </Modal>

            <div class="footer">
            </div>
          </div>     
          </div>
          )
      }
    
    
} 

    const eventsContainer = document.getElementById('events');
    if (eventsContainer) {
    const calendar = JSON.parse(eventsContainer.dataset.events, reviver);
    console.log(calendar.events);
    ReactDOM.render(
    <ViewPost calendar= {calendar}/>
    , eventsContainer);} 




const mapStateToProps = state => state
export default connect(mapStateToProps)(ViewPost);
