import React from 'react';

import FormAddItem from '../components/FormAddItem'
import BtnDelete from '../components/Button';
import ListItem from '../components/ListItem';
/*
   Component to handle one object of todo card. (WIP)
    purpose: break down component as small as posible.
      TodoPage -> TodoCard -> ListItem ( view list of todo item)
                           \-> Button ( delete todo card)
                            \-> FormAddItem ( for add new todo item)
   
*/
const TodoCard = (props) => {

   const kusambat = () => { 
      return(
         <div>
            <ul className="todo-list">
               <li className="todo-item">Item list 1</li>
               <li className="todo-item">Item List 2</li>
            </ul>
         </div>
      )
   } 

   return(
      <div className="todo-card">
         <div className="title"> Title </div>
         <button className="delete card"> Delete </button>
         <div className="todos collection">  
            <ListItem itemList={dummyData}/>
         </div>
         {/* <FormAddItem/> */}
      </div>
   )
}

export default TodoCard;