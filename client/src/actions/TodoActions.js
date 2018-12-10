
import * as Types from '../constants/ActionTypes';
import Axios from 'axios';
import * as api from '../api/TodoApi';
import Auth from '../modules/Auth';

const APIUrl = 'http://localhost:5000/';
// dummy Auth Token , if this fail set token lifespan to '1w' in back-end configs.js
const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjMDZiNjE4NjNhN2Y4MmIzNDBlOWQ1NCIsInVzZXJuYW1lIjoibmllbHRvZG8ifSwiaWF0IjoxNTQ0NDYzOTk5LCJleHAiOjE1NDQ0NjU3OTl9.om9h9KrZbQZkxqg3tAW5MUk4Sr-12ma4h-JycTc--JA'; 

const GetHeader_config = {
    headers: { Authorization: 'Token ' + tokenUser }
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

export const fetchTodoAction = (todos) => ({
    type: Types.FETCH_TODO,
    payload: {
        todos
    }
})

export const fetchTodo = (username) => {
    return (dispatch) => {
        return Axios.get('http://localhost:5000/todos', GetHeader_config)
            .then(response => {
                // success, pass to todoReducer
                console.log("resp:", response);
                dispatch(fetchTodoAction(response.data));
            })
            .catch( error => {
                throw (error);
            });
    };
};