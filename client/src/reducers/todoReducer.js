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
        case Types.DELETE_TODO:
            console.log('DELETE');
            return state;
        case Types.EDIT_TODO :
            console.log('EDIT');
            return state;
        case Types.FETCH_TODO:
            console.log('FETCH todo, data:', action.payload.todos);
            return {
                //...state, i wonder if this necessary
                todos: action.payload.todos
            }
        default: 
            console.log('default reducer');
            return state;
    }
}