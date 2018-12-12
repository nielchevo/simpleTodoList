import React from 'react';
import ListItem from '../components/ListItem';

class TodoCard extends React.Component {
   constructor(props){
      super(props);
      
      this.state = {
         inputItemList: ''
      }
      
      console.log('TodoCard.js props : ' , props)
      this.handleOnTextChange = this.handleOnTextChange.bind(this);
      this.handleOnSubmit = this.handleOnSubmit.bind(this);
   }
   
   componentWillReceiveProps(nextProps) {
      // https://stackoverflow.com/questions/32414308/updating-state-on-props-change-in-react-form
      this.setState({todos: nextProps.listCard});
   }

   handleOnTextChange(e) {
      e.preventDefault();
      this.setState({inputItemList: e.target.value});
   }

   handleOnSubmit(e) {
      e.preventDefault();
   }

   onRenderListItem() {  
      if (this.props.listCard.length) {            
            //let renderList = this.state.todos.map(item => {
            let renderList = this.props.listCard.map(item => {
            return (
                  <div className="card border-primary mb-3" key={item._id}>
                  <div className="card-header">
                        <h4 className="card-title">{item.title}</h4>
                        <button className="btn btn-primary"> Delete Card </button>
                  </div>
                  
                  <ListItem 
                        itemList={item.list} 
                        deleteTodo={this.props.handleDeleteCard}
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

export default TodoCard