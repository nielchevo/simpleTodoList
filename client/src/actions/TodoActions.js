import Axios from 'axios';
import * as Types from '../constants/ActionTypes';
import { authHeader } from '../modules/authHelper';

// dummy Auth Token , if this fail set token lifespan to '1w' in back-end configs.js
const tokenUser = ''; 

//const header_config = {
//     headers: { Authorization: 'Token ' + tokenUser }
//}

export const addTodoAction = (newtodo) => ({
    type: Types.ADD_TODO,
    newtodo: newtodo
})

export const addTodo = (listItem) => {
   return (dispatch) => {
       return Axios.post('http://localhost:5000/todo/create', listItem, authHeader())
         .then(response => {
            dispatch(addTodoAction(response.data));
         })
         .catch( error => {
            throw (error);
         });
   };
};

export const deleteTodoAction = (cardID, itemID) => ({
    type: Types.DELETE_TODO, 
    id: cardID,
    itemId : itemID
})

export const deleteTodo = (cardID, itemID) => {
    console.log('cardID, itemID : ', cardID, itemID)
}

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
        return Axios.get('http://localhost:5000/todos', authHeader())
            .then(response => {
                // success, pass to todoReducer
                dispatch(fetchTodoAction(response.data));
            })
            .catch( error => {
                throw (error);
            });
    };
};