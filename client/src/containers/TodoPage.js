import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import AddTodo from './AddTodo';
import TodoCard from '../containers/TodoCard';
import Auth from '../modules/Auth';
import * as TodoActions from '../actions/TodoActions';

const api_get_todo = 'http://localhost:5000/user/paul1/todo'; // need to be more dynamic, following user's username

class TodoPage extends Component {
    constructor(props) {
        super();
        
        console.log(props);

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
           <TodoCard listCard={this.props.todo}
                handleDeleteCard={this.onClickDeleteItem}
                handleIsDoneItem={this.onClickIsDoneItem}
                handleAddListItem={this.onSubmitAddItem}
            />
        )
    }

    onClickDeleteItem = (id) => {
        console.log("trigger from ListItem.onClick Delete event");
        // const deletedTodos = this.state.todos.filter(todo => {
        //     return todo._id !== id
        // })
        // this.setState({
        //     todos: deletedTodos
        // })
    }

    onClickIsDoneItem = (id, listID, isDone) => {
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

const mapStateToProps = state => ({
    todo: state.todoReducer.todos
})

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(TodoPage);