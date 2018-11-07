import React, { Component } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';

var m_todoLists = [ 
    {
        "isDone" : false,
        "content" : "testing todo content 1"
    }, 
    {
        "isDone" : false,
        "content" : "testing todo content 2"
    }, 
    {
        "isDone" : false,
        "content" : "testing todo content 3"
    }
]; // dummy list 

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

    viewTodoCollection() {
        // Handle view all todos.
        return(
            <li>Test list item</li>
        );
    }

    handlePost() {
        // Handle submit Todo.
    }

    handleDelete(){
        // Handle Delete Todo.
    }

    addNewList() {
        // logic for add new list
        // input text 
        
        console.log("render new list Input");
    }

    render() {
        return(
            <div className="container">
                {this.viewTodoCollection} 
                
                <hr/>
                <form className="container" onSubmit={this.handleListPost}>
                    <Input 
                        type={"text"}
                        title={"Todo Title"}
                        name={"todoTitle"}
                        value={this.state.title}
                        placeholder={"ex. My Todos "}
                        handleChange={this.handleChange}
                    />
                    <Input type={"text"}
                        title = "todoList"
                        name ={"todoList"}
                        placeholder = {"ex. My first todo list "} 
                    />
                    <Button 
                        type={"primary"}
                        title={'+ New list'}
                        addNewList = {this.addNewList}
                    />
                    <br/> <hr/>
                    <Button 
                        type={'primary'}
                        title={'Submit'}
                        handlePost = {this.handlePost}
                    />
                </form>
            </div>
        );
    }
}
export default TodoPage;