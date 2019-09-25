const initialState = {
    posts: [],
    post: {}
    
}

export default (state = initialState, action) => {
    switch (action.type){
        case 'GET_POST': {
            return{...state, post: action.post}
        } 
        case 'GET_POSTS': {
            return {...state, posts: action.posts}
        }
        case 'CREATE_POST': {
            return { ...state, posts: action.post}
        }
        default: {
            return state
        }   
    }
    
}