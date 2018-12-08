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
        
        console.log("todo page todos from props:", props);

        this.populateTodosCollection= this.populateTodosCollection.bind(this);
        this.addNewList = this.addNewList.bind(this);

        this.Auth = new Auth();
    }

    componentDidMount() {        
        this.props.actions.fetchTodo('paul3');
    }

    componentWillReceiveProps() {
        //this.populateTodosCollection();
    }

    populateTodosCollection() {
        console.log("populate again:", this.props);
        return (
           <TodoCard listCard={this.props.todos}
                handleDeleteCard={this.onClickDeleteItem}
                handleIsDoneItem={this.onClickIsDoneItem}
                handleAddListItem={this.onSubmitAddItem}
            />
        )
    }

    onClickDeleteItem = (id) => {
        console.log("trigger from ListItem.onClick Delete event");
    }

    onClickIsDoneItem = (id, listID, isDone) => {
        console.log("trigger from ListItem.onClick is Done event");
        
    }
    
    onSubmitAddItem = (id, content) => {
        console.log("Trigger from TodoCard.onSubmit add new list item");
        
    }

    addNewList = (newtodo) => {
        // change this to dispatch action add
        this.props.actions.AddTodoAction(newtodo);
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

const mapStateToProps = (state) => ({
    todos: state.todoReducer.todos
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