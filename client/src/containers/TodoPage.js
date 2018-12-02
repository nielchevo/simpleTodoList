import React, { Component } from 'react';
import axios from 'axios';
import dummyData from '../dummyData';
import AddTodo from './AddTodo';
import TodoCard from '../containers/TodoCard';
import Auth from '../modules/Auth';

const api_get_todo = 'http://localhost:5000/user/paul1/todo'; // need to be more dynamic, following user's username

class TodoPage extends Component {
    constructor(props) {
        super();
        
        // this.state = {
        //     todos : [
        //         // this is the initial state, following the dummy data
        //         //title: '',
        //         //lists: []
        //     ]
        // }

        this.state = dummyData;

        this.populateTodosCollection= this.populateTodosCollection.bind(this);
        this.addNewList = this.addNewList.bind(this);

        this.Auth = new Auth();
    }

    componentDidMount() {
        //console.log('start consuming the api, token:', this.Auth.getToken());
        axios.get(api_get_todo, { headers: { Authorization: 'Token ' + this.Auth.getToken() } })
            .then(res => {
                let todos = [...this.state.todos];
                Array.prototype.push.apply(todos, res.data);
                this.setState({
                    todos: todos
                });                
                // STILL NOT WORKING, WIP
            })
            .catch(err => {
                console.log(err);
            });
    }

    populateTodosCollection() {
        return (
           <TodoCard listCard={this.state.todos}
                handleDeleteCard={this.onClickDeleteCard}
                handleIsDoneItem={this.onClickIsDoneItem}
                handleAddListItem={this.onSubmitAddItem}
            />
        )
    }

    onClickDeleteCard = (id) => {
        console.log("trigger from ListItem.onClick Delete event");

        const deletedTodos = this.state.todos.filter(todo => {
            return todo._id !== id
        })
        this.setState({
            todos: deletedTodos
        })
    }

    onClickIsDoneItem = (id) => {
        console.log("trigger from ListItem.onClick is Done event");
        
    }
    
    onSubmitAddItem = (id, content) => {
        console.log("Trigger from TodoCard.onSubmit add new list item");
    }

    addNewList = (newtodo) => {
        let todos = [...this.state.todos, newtodo];
        this.setState({
            todos: todos
        });
    }

    render() {
        return (
            <div>
                <h2>Todo Page !</h2>
           
                {this.populateTodosCollection()}

                <br />
                <hr align="center" width="90%" />
                <br />
                <AddTodo addNewList={this.addNewList} />
            </div>
        )
    }
}
export default TodoPage;