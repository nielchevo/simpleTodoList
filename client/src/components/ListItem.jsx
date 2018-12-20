import React from 'react';

const ListItem = ({cardID, itemList, deleteItemList, itemIsCompleted}) => {
    // note: cardID act as key to known where itemlist we want to modify.
    const items = (itemList && itemList.length) ? (
        itemList.map((item) => {
            return (
                <li
                    className="list-group-item list-group-item-action"
                    key={item._id}
                >
                    {item.content}
                    <div className="btn-wrapper">
                        <button className="btn btn-primary" onClick={() => deleteItemList(item._id, cardID)}>
                            Delete !
                    </button>
                        <button className="btn btn-secondary" onClick={() => itemIsCompleted(item._id, cardID)}>
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

    return (
        <div className="list-group">
            {items}
        </div>
    )
}

export default ListItem;