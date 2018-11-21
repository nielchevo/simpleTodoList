import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import ListItems from '../components/ListItem';
import dummyData from '../dummyData';

class TodoPage extends Component {
    constructor(props) {
        super();
        
        this.state ={
            title: '',
            lists: []
        }

        this.viewTodoCollection = this.viewTodoCollection.bind(this);
        this.addNewList = this.addNewList.bind(this);
    }

    viewTodoCollection(todoTitle, todoListItem) {
        return (
            <ListItems itemList={dummyData}/>
        )
    }

    handlePost() {
        // Handle submit Todo.
    }

    handleDelete(){
        // Handle Delete Todo.
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
                <h1>todo Page</h1>
           
                <this.viewTodoCollection />
            </div>
        )
    }
}
export default TodoPage;