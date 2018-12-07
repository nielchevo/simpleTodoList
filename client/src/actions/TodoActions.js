
import * as Types from '../constants/ActionTypes';
import Axios from 'axios';

const APIUrl = 'http://localhost:5000/';
// dummy Auth Token , if this fail set token lifespan to '1w' in back-end configs.js
const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjMDc2ZDY2N2M1MGMzMjMzODk2OGU0YSIsInVzZXJuYW1lIjoibmllbHRvZG8ifSwiaWF0IjoxNTQ0MTYyNTk4LCJleHAiOjE1NDQxNjQzOTh9.4ThiobYdnYd0YlH65oSA9dSOaF8MmrlSzzm-KBtOCQ0'; 
const GetHeader_config = {
    headers: { 
        'Content-Type': 'Application/json', 
        'Authorization' : 'Token ' + tokenUser
    }
}

export const addTodoAction = (newtodo) => ({
    type: Types.ADD_TODO,
    newtodo: newtodo
})

export const deleteTodoAction = id => ({
    type: Types.DELETE_TODO, 
    id: id
})

export const editTodoAction = (id, todos) => ({
    type: Types.EDIT_TODO, 
    id: id, 
    content: todos
})

// Sync function to Reducer
export const fetchTodoAction = (todos) => ({
    type: Types.FETCH_TODO,
    payload: {
        todos
    }
})

// Async function handle fetch request
export const fetchTodo = () => {
    return (dispatch) => {
        let urlRequest = APIUrl + '/todos';
        return Axios.get(urlRequest, GetHeader_config)
            .then(response => {
                // success, pass to todoReducer
                dispatch(fetchTodoAction(response.data));
            })
            .catch( error => {
                throw (error);
            });
    };
};