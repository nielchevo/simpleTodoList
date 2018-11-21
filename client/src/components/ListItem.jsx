import React from 'react';

const ListItem = ({itemList}) => {
	//console.log(itemList);

	const items = itemList.map( (item, index) => {
		const Lists = item.list.map((List, _id) => {
			console.log( List);
			return (<li className="Item" key={List._id}> {List.content} </li>)
		})	
		
		return (
			<ul className="List-Item" key={index}>
				{Lists}
			</ul>
		)
	})
	
	return(
		<div className="Todo-ListItem" key = {itemList._id}>
				{items}
		</div>
	)
}

export default ListItem;