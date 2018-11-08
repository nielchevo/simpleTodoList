import React from 'react';

const todoItem = (props) => {
    return (
        <li 
        className ="list-group-item"
        id  ={props.name}
        name={props.name} >
            {this.props.lists.content}
        </li>
    );
}

export default todoItem