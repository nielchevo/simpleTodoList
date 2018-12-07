import * as Types from '../constants/ActionTypes';

const initialState = {
    todos: []
}

export default function todoReducer(state = initialState, action) {
    
    switch(action.type) {
        case Types.ADD_TODO:
            console.log("todo reducer, add todo:", action.newtodo);
            let todos = [...state.todos, action.newtodo];
            return {
                todos
            }
            break;
        case Types.DELETE_TODO:
            console.log('DELETE');
            break;
        case Types.EDIT_TODO :
            console.log('EDIT');
            break;
        case Types.FETCH_TODO :
            console.log('FETCH');
            return "this fetch todo";
        default: 
            console.log('default reducer');
            break;
    }
    return state;
}