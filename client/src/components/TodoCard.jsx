import React from 'react';
import Input from './Input';
import ListItem from './ListItem'
/*
   Component to handle one object of todo card. (WIP)
    purpose: break down component as small as posible.
      TodoPage -> TodoCard -> ListItem ( view list of todo item)
                           \-> Button ( delete todo card)
                            \-> FormAddItem ( for add new todo item)
   
*/

const TodoCard = ({todoLists, todoDeleteCard, updateListItem}) => {
  
   const todoObject = todoLists.map( todo => {
      console.log(todo);
      let todoListItems = todo.list;

      return (
         <div className="card border-primary mb-3" key={todo._id}>
            <div className="card-header">
               <h4 className="card-title">{todo.title}</h4>
               <button className="btn btn-primary"> Delete Card </button>
            </div>
            
            <ListItem 
               itemList={todo.list} 
               deleteTodo={todoDeleteCard}
            />
         
            <Input 
               placeholder="Add New Task Here !"
            />
         </div>
      )
   })

   return(
      <div>
         {todoObject}
      </div>
   )
}

export default TodoCard;