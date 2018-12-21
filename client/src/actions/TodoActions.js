import Axios from 'axios';
import * as Types from '../constants/ActionTypes';
import { authHeader } from '../modules/authHelper';

/*
    function Add Todo Card
 */
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

/* 
    function Delete item List 
*/
export const deleteItemListAction = ({Status, Data}) => ({
    type   : Types.DELETE_TODO, 
    status : Status,
    data   : Data
})

export const deleteItemList = (cardID, itemID) => {
    return (dispatch) => {
        return Axios.post('http://localhost:5000/todo/'+ cardID +'/lists/delete', {itemID: itemID}, authHeader())
                .then(response => {
                    dispatch(deleteItemListAction( {Status: response.status, Data: response.data} ));
                })
                .catch( error => {
                    throw (error);
                });
    };
};

export const deleteCardAction = ({Status, Data}) => ({
    type    : Types.DELETE_CARD,
    status  : Status,
    data    : Data
})

export const deleteCard = (cardID) => {
    return (dispatch) => {
        return Axios.post('http://localhost:5000/todo/'+ cardID +'/delete', { }, authHeader())
                .then(response => {
                    dispatch(deleteCardAction( {Status: response.status, Data: response.data} ));
                })
                .catch( error => {
                    throw (error);
                });
    };
};

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

export const fetchTodo = () => {
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