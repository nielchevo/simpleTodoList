import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import ListItems from '../components/ListItem';
import dummyData from '../dummyData';

class TodoPage extends Component {
    constructor(props) {
        super();
        
        //this.state = {
        //    title: '',
        //    lists: []
        //}

        this.state = dummyData;

        this.viewTodoCollection = this.viewTodoCollection.bind(this);
        this.addNewList = this.addNewList.bind(this);
    }

    viewTodoCollection(todoTitle, todoListItem) {
        return (
            <ListItems itemList={this.state.todos} deleteTodo={this.handleDelete} />
        )
    }

    handlePost() {
        // Handle submit Todo.
    }

    handleDelete = (id) => {
        const deletedTodos = this.state.todos.filter(todo => {
            return todo._id !== id
        })
        this.setState({
            todos: deletedTodos
        })
    }
    
    addNewList() {
        // logic for add new list``````
        // input text 
    }

    todoFormItem = () => {
        // render FormAddItem
    };

    render() {
        return (
            <div>
                <h1>Todo!</h1>
           
                {this.viewTodoCollection()}
            </div>
        )
    }
}
export default TodoPage;