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
                    {(item.isDone) ? <strike>item.content</strike> : item.content}

                    <div className="btn-wrapper">
                        <button className="btn btn-primary" onClick={() => deleteItemList(cardID, item._id)}>
                            Delete !
                        </button>
                        <button className="btn btn-secondary" onClick={() => itemIsCompleted(cardID, item._id)}>
                            {(item.isDone) ? 'Undone' : 'Complete'}
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