import React, { Component } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';
import todoItem from '../components/todoItem';

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

    viewTodoCollection(props) {
        const itemList = props.list;
        return (
            <div>
                {
                    itemList.map(function (item, id) {
                        return (
                            <li key={id}>
                                {item.content}
                            </li>
                        );
                    })
                }
            </div>
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