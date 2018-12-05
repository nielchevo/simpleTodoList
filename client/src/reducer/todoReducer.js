import dummyData from '../dummyData';
import * as Types from '../constants/ActionTypes';

const initialState = {
   todos: dummyData.todos,
   isPublic : 'test2'
}

export default function todoReducer(state = initialState, action) {
    
    switch(action.type) {
        case Types.ADD_TODO :
            console.log('ADD');
            break;
        case Types.DELETE_TODO :
            console.log('DELETE'); 
            break;
        case Types.EDIT_TODO :
            console.log('EDIT');
            break;
        case Types.FETCH_TODO :
            console.log('FETCH');
            break;
        default: 
            console.log('default reducer');
            return state;
    }
}