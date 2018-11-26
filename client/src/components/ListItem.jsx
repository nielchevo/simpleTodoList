import React from 'react';

const ListItem = ({itemList, deleteTodo}) => {
	//console.log(itemList);

    const items = itemList.length ? (
      itemList.map((item, index) => {
         console.log(item);

         return (
            <li 
               className="list-group-item list-group-item-action" 
               key={item._id} 
               > 
                  {item.content}
                  <button className="btn btn-primary" onClick={()=> deleteTodo(item._id)}> 
                     Delete !
                  </button>
                  <button className="btn btn-secondary">
                     Mark is done !
                  </button>
            </li>
         )
      })
    ) : (
         <li className="list-group-item list-group-item-action">
            No Todo, please add one 
         </li>
         )
         

	return(
      <div className="list-group">
         {items}
      </div>
	)
}

export default ListItem;