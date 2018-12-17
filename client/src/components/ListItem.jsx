import React from 'react';

const ListItem = ({cardID, itemList, deleteTodo, isDoneTodo}) => {

    const items = itemList.length ? (
      itemList.map((item, index) => {
         return (
            <li 
               className="list-group-item list-group-item-action" 
               key={item._id} 
               > 
                  {item.content}
                  <div className="btn-wrapper">
                     <button className="btn btn-primary" onClick={(e)=> deleteTodo(cardID, item._id)}> 
                        Delete !
                     </button>
                     <button className="btn btn-secondary" onClick={ e => isDoneTodo(cardID, item._id)}>
                        Complete
                     </button>
                  </div>
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