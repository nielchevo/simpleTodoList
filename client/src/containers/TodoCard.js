import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../actions/TodoActions';
import ListItem from '../components/ListItem';

class TodoCard extends React.Component {
   constructor(props){
      super(props);
      
      // This local state for handle text input for new item list
      this.state = {
         inputItemList: ''
      }

      this.handleDeleteItem = this.handleDeleteItem.bind(this);
   }
   
   //componentWillReceiveProps(nextProps) {
   //   // https://stackoverflow.com/questions/32414308/updating-state-on-props-change-in-react-form
   //   console.log('TODO CARD WILL REC, props:', nextProps);
   //   this.setState({todos: nextProps.listCard});
   //}

   handleOnTextChange(e) {
      e.preventDefault();
      this.setState({inputItemList: e.target.value});
   }

   handleOnSubmit(e) {
      e.preventDefault();
   }

   handleDeleteItem(cardID, itemID) {
      console.log('cardID, itemID : ', cardID, itemID);

   }

   onRenderListItem() {         
       if (this.props.todos.length) {            
            //let renderList = this.state.todos.map(item => {
            let renderList = this.props.todos.map(item => {
            return (
                  <div className="card border-primary mb-3" key={item._id}>
                  <div className="card-header">
                        <h4 className="card-title">{item.title}</h4>
                        <button className="btn btn-primary"> Delete Card </button>
                  </div>
                  
                  <ListItem 
                     cardID={item._id}
                     itemList={item.list} 
                     deleteTodo={this.handleDeleteItem}
                     isDoneTodo={this.props.handleIsDoneItem}
                  />

                  <form className="form-group" id={item._id} onSubmit={ this.handleOnSubmit}>
                        <input className="form-control"
                        onChange={ this.handleOnTextChange }/>
                  </form>
                  </div>
            )
            });

            return (
                  renderList
            )
      } else {
            return (
                  <div className="center">No Todo</div>
            )
      }      
   }

   render() {
      return(
         <div className="wrapper-card">
            <h1>todoCard</h1>
            {this.onRenderListItem()}
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return { todos: state.todo.todos }
} 

const mapDispatchToProps = dispatch => {
   return {
      onDeleteTodo: (cardID, itemID) => { dispatch(deleteTodo(cardID, itemID)); }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard)