import React from 'react';
import ListItem from '../components/ListItem';

class TodoCard extends React.Component {
   constructor(props){
      super(props);
      
      this.state = {
         todo: [],
         inputItemList: ''
      }
      
      this.handleOnTextChange = this.handleOnTextChange.bind(this);
      this.handleOnSubmit = this.handleOnSubmit.bind(this);
   }
   
   componentDidMount() {
      this.setState({todo: this.props.listCard});
   }

   handleOnTextChange(e) {
      e.preventDefault();
      this.setState({inputItemList: e.target.value});
   }

   handleOnSubmit(e) {
      e.preventDefault();

      console.log('OnSubmit textInput: ' + this.state.inputItemList +" id " + e.target.id);
   }

   onRenderListItem() {  
      console.log("do we also call this evertime?");
      let renderList = this.state.todo.map(item => {
         return(
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
      })
      
      return(
         renderList
      )
   }

   render(){
      return(
         <div className="wrapper-card">
            <h1>todoCard</h1>
            {this.onRenderListItem()}
         </div>
      )
   }
}

export default TodoCard