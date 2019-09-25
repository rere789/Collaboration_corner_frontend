
const initialState = {
    user: {},
    users: [],
    loggedInStatus: false
    
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'GET_USER': {
            // console.log(action.data)
            return {...state,
            user: action.data.user, loggedInStatus: true}
        }
        case "EDIT_USER": {
            return{...state, user: action.user}
        }
        default: {
            return state
        }   
    }
    
}