import * as Types from '../constants/ActionTypes';

const initialState = {
    todos: []
}

export default function todoReducer(state = initialState, action) {
    
    switch(action.type) {
        case Types.ADD_TODO:
        {
            console.log("todo reducer, add todo:", action.newtodo);
            let todos = [...state.todos, action.newtodo];
            return {
                todos
            }
        }
        case Types.DELETE_TODO:
            console.log('DELETE action status, data: ',action.status, action.data);
            return state;
        case Types.DELETE_CARD:
        {
            console.log('Delete action on Card status, id: ', action.id);
            let todos = state.todos.filter(todo => {
                return todo._id !== action.id
            });
            return {
                todos
            }
        }
        case Types.EDIT_TODO :
            console.log('EDIT');
            return state;
        case Types.FETCH_TODO:
            return {
                //...state, i wonder if this necessary
                todos: action.payload.todos
            }
        default: 
            return state;
    }
}