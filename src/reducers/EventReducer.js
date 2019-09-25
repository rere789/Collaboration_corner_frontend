const initialState = {
    events: []
 }
 
 export default (state = initialState, action) => {
     switch(action.type){
         case 'GET_EVENTS': {
             return {...state,
             events: action.data}
         }
         default: {
             return state
         }   
     }
     
 }