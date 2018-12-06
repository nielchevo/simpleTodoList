
import * as Types from '../constants/ActionTypes';

export const AddTodoAction = (newtodo) => ({
    type: Types.ADD_TODO,
    newtodo: newtodo
})

export const DeleteTodoAction = id => ({
    type: Types.DELETE_TODO, 
    id: id
})

export const EditTodoAction = (id, todos) => ({
    type: Types.EDIT_TODO, 
    id: id, 
    content: todos
})

export const FetchTodoAction = () => ({
    type: Types.FETCH_TODO
})