import React from 'react';

const ListItem = ({itemList}) => {
	//console.log(itemList);

    const items = itemList.length ? (
        itemList.map((item, index) => {
            const Lists = item.list.map((List, _id) => {
                //console.log(List);
                return (<li className="Item" key={List._id}> {List.content} </li>)
            })

            return (
                <div className="post card" key={item._id}>
                    <div className="card-content">
                        <p className="card-title">{item.title}</p>
                        <ul className="List-Item" key={index}>
                            {Lists}
                        </ul>
                    </div>
                </div>
            )
        })
    ) : (
            <div className="center">
                No Todo, please add one 
            </div>
        )
        
	
	return(
		<div className="Todo-ListItem" key = {itemList._id}>
				{items}
		</div>
	)
}

export default ListItem;