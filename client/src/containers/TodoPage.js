import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddTodo from './AddTodo';
import TodoCard from '../containers/TodoCard';
import Auth from '../modules/Auth';
import * as TodoActions from '../actions/TodoActions';

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
        return (
            <TodoCard listCard={this.props.todos}
               handleDeleteCard={this.onClickDeleteCard}
               handleIsDoneItem={this.onClickIsDoneItem}
               handleAddListItem={this.onSubmitAddItem}
               handleDeleteListItem={this.onClickDeleteItem}
            />
        )
    }

    onClickDeleteCard = (cardId) => {
      console.log("trigger from ListItem.onClick Delete event cardID: ", cardId);
    }

    onClickIsDoneItem = (id, listID, isDone) => {
      console.log("trigger from ListItem.onClick is Done event");
    }
    
    onClickDeleteItem = (itemId) => {
      console.log("trigger from ListItem.onClick Delete Item event itemID ", itemId);
    }

    onSubmitAddItem = (id, content) => {
      console.log("Trigger from TodoCard.onSubmit add new list item");
    }

    addNewList = (newtodo) => {
        // change this to dispatch action add
        this.props.actions.addTodoAction(newtodo);
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
    todos: state.todo.todos
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