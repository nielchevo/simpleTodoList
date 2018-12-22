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
            {
                let todos = [...state.todos];
                todos.forEach(todo => {
                    if ((todo._id === action.cardId) && (todo.list && todo.list.length)) {
                        let newlist = todo.list.filter(item => {
                            return item._id !== action.listId;
                        });
                        todo.list = newlist;
                    }
                });
                return {
                    todos
                }
            }
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
        case Types.EDIT_TODO:
            console.log('EDIT');
            return state;
        case Types.FETCH_TODO:
            return {
                //...state, i wonder if this necessary
                todos: action.payload.todos
            }
        case Types.TOGGLE_ITEM:
            {
                let todos = [...state.todos];
                todos.forEach(todo => {
                    if ((todo._id === action.cardId) && (todo.list && todo.list.length)) {
                        todo.list.forEach(item => {
                            if (item._id === action.itemId) {
                                item.isDone = !item.isDone;
                            }
                        });
                    }
                });
                return {
                    todos
                }
            }
        default:
            return state;
    }
}