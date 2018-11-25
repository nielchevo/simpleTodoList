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

const TodoCard = ({todoLists, todoDeleteCard}) => {
  
   const todoObject = todoLists.map( todo => {
      console.log(todo);
      let todoListItems = todo.list;

      return (
         <div className="todo-card" key={todo._id}>
            <div className="todo-header">
               <div className="title"> <h4>{todo.title}</h4> </div>
               <button className="btn-delete-card"> Delete Card </button>
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