import * as Types from '../constants/ActionTypes';

const initialState = {
    todos: [],
    detailVisible: false,
    detailItem: null
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
                return {...state,
                    todos
                }
            }
        case Types.EDIT_TODO:
            console.log('EDIT');
            return state;
        case Types.FETCH_TODO:
            return {
                ...state, //i wonder if this necessary
                todos: action.payload.todos
            }
        case Types.TOGGLE_ITEM:
            {
                let todos = [...state.todos];
                todos.forEach(todo => {
                    if ((todo._id === action.cardId) && (todo.list && todo.list.length)) {
                        todo.list.forEach(item => {
                            if (item._id === action.itemId) {
                                item.isDone = action.toggledvalue;
                            }
                        });
                    }
                });
                return {...state,
                    todos
                }
            }
        case Types.SHOW_DETAIL:
            {
                let list = state.todos.find(todo => {
                    return todo._id === action.cardID
                })

                return {...state,
                    detailVisible: true,
                    detailItem: list
                }
            }
        case Types.CLOSE_DETAIL:
            {
                return {...state,
                    detailVisible: false,
                }
            }
        default:
            return state;
    }
}