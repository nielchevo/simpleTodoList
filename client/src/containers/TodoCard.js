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
      console.log('todocard', this.props);
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
   }

   handleOnTextChange(e) {
      e.preventDefault();
      this.setState({inputItemList: e.target.value});
   }

   handleOnSubmit(e) {
      e.preventDefault();
   }

   handleDeleteItem(itemID, cardID) {
      // Find the card which we wanted to delete item list 
      const cardEdit = this.props.todos.find( items => {
         return items._id === cardID
      })

      // Delete the list item we clicked using item _id (generated from mongodb)
      let listItem = cardEdit.list.filter( items => {
         return items._id !== itemID
      })

      // Dispatch to redux with card object ID and list item. 
      this.props.onDeleteTodo({cardID, ...listItem});
   }

   handleItemIsDone(itemID, cardID) {
      console.log('handleItemIsDone itemID: ', itemID)
      
   }

   onRenderListItem() {         
       if (this.props.todos.length) {
           
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
                           deleteItemList={this.handleDeleteItem}
                           itemIsCompleted={this.handleItemIsDone}
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
      onDeleteTodo: (listItem) => { dispatch(deleteTodo(listItem)); }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard)