import React from 'react';

const ListItem = ({itemList, deleteTodo}) => {
	//console.log(itemList);

    const items = itemList.length ? (
      itemList.map((item, index) => {
         console.log(item);

         return (
            <li 
               className="todo-items" 
               key={item._id} 
               > 
                  {item.content}
                  <button className="btn-delete-item" onClick={()=> deleteTodo(item._id)}> 
                     Delete !
                  </button>
                  <button>
                     Mark is done !
                  </button>
            </li>
         )
      })
    ) : (
            <div className="center">
                  No Todo, please add one 
            </div>
         )
         

	return(
      <div className="todos-collection">
         {items}
      </div>
	)
}

export default ListItem;