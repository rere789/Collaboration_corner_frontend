import {createStore, combineReducers} from 'redux';
import UserReducer from './reducers/UserReducer';
import PostReducer  from './reducers/PostReducer';
// import Userprojects from './reducers/UserProjectReducer'
import CollaborationReducer from './reducers/CollaborationReducer'
import EventReducer from './reducers/EventReducer'

const rootReducer = combineReducers ({
    user: UserReducer,
    post: PostReducer,
    // projects: Userprojects,
    collaborations: CollaborationReducer,
    events: EventReducer,

})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);