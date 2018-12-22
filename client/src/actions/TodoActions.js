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
export const deleteItemListAction = ({ cardId, listId, Data}) => ({
    type   : Types.DELETE_TODO, 
    cardId: cardId,
    listId: listId
})

export const deleteItemList = (cardID, itemID) => {
    return (dispatch) => {
        return Axios.post('http://localhost:5000/todo/'+ cardID +'/lists/delete', {itemID: itemID}, authHeader())
                .then(response => {
                    if (response && response.status === 200) {
                        dispatch(deleteItemListAction({ cardId: cardID, listId: itemID} ));
                    }
                })
                .catch( error => {
                    throw (error);
                });
    };
};

export const deleteCardAction = (cardID) => ({
    type    : Types.DELETE_CARD,
    id: cardID
})

export const deleteCard = (cardID) => {
    return (dispatch) => {
        return Axios.post('http://localhost:5000/todo/'+ cardID +'/delete', { }, authHeader())
                .then(response => {                    
                    if (response && response.status === 200) {
                        dispatch(deleteCardAction(cardID));
                    }                    
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

export const toggleItemAction = (cardId, itemId) => ({
    type: Types.TOGGLE_ITEM,
    cardId: cardId,
    itemId: itemId
})

export const toggleItemDone = (cardId, itemId) => {
    return (dispatch) => {
        //return Axios.post('http://localhost:5000/todo/' + cardID + '/delete', {}, authHeader())
            //.then(response => {
                //if (response && response.status === 200) {
                    console.log('action itemid:', itemId);
                    dispatch(toggleItemAction(cardId, itemId));
                //}
            //})
            //.catch(error => {
            //    throw (error);
            //});
    };
};