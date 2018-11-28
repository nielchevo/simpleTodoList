import React, { Component } from 'react';
import ListItems from '../components/ListItem';
import dummyData from '../dummyData';
import AddTodo from './AddTodo';
import TodoCard from '../containers/TodoCard';

class TodoPage extends Component {
    constructor(props) {
        super();
        
        //this.state = {
        //    title: '',
        //    lists: []
        //}

        this.state = dummyData;

        this.populateTodosCollection= this.populateTodosCollection.bind(this);
        this.addNewList = this.addNewList.bind(this);
    }

    populateTodosCollection() {
    
        return (
           <TodoCard listCard={this.state.todos}/>
        )
    }

    onClickDeleteCard = (id) => {
        const deletedTodos = this.state.todos.filter(todo => {
            return todo._id !== id
        })
        this.setState({
            todos: deletedTodos
        })
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