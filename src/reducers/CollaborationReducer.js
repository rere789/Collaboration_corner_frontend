const initialState = {
   collaborations: [],
   interestedCollabs: [],
   collaborating: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'GET_COLLABORATION': {
            return {...state,
            collaborations: action.data}
        }
        case 'GET_MYCOLLABORATIONS':{
            return {...state,
            interestedCollabs: action.data}
        }
        case 'GET_COLLABORATING':{
            return {...state,
            collaborating: action.data}
        }
        default: {
            return state
        }   
    }
    
}