import React, { Component } from 'react';
import axios from 'axios';
import ListItems from '../components/ListItem';
import dummyData from '../dummyData';
import TodoCard from '../components/TodoCard';
import AddTodo from './AddTodo';

const authStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViZDc0ZGUwOWFiM2M5MjVhZGM2NTc1MSIsInVzZXJuYW1lIjoicGF1bDEifSwiaWF0IjoxNTQzNDI4MTQ2LCJleHAiOjE1NDM0Mjk5NDZ9.YHq3KtrEi1YO0HbdbYaeH_93rlQOj-xBwo6iCPSa8Ns';

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

    componentDidMount() {
        console.log('starting consuming the api');
        axios.get('http://localhost:5000/user/paul1/todo', {headers: {Authorization: 'Token ' + authStr}})
        .then(res => {
            console.log(res.data)
        })
        .catch()
    }

    populateTodosCollection() {
        return (
            <TodoCard 
                todoLists={this.state.todos} 
                todoDeleteCard={this.onClickDeleteCard} 
            />
        )
    }

    handlePost() {
        // Handle submit Todo.
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

    todoFormItem = () => {
        // render FormAddItem
    };

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