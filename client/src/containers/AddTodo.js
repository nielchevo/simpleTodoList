import React, { Component } from 'react';
import Button from '../components/Button';
import WrapInput from '../components/WrapInput';

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            list: [
                {
                    content: ''
                }
            ]
        };
    }

    handleChangeList = (id, name, value) => {
        const { list } = this.state;
        let { title } = this.state;        
        if (name === 'list') {
            list[id] = { content: value }
        } else if (name === 'title') {
            title = value
        }
        this.setState({
            title,
            list
        });
    }

    handleAddList = (e) => {
        e.preventDefault();
        const { title, list } = this.state;
        list.push({ content: '' });
        this.setState({
            title,
            list
        });
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        // temporary, need to match with backend
        let todo = this.state;
        todo._id = Math.random();
        todo.list.forEach(list => {
            list._id = Math.random()
        });
        // temporary
        this.props.addNewList(todo);
    }

    renderInputList = () => {
        const { list } = this.state;
        let inputlist = [];
        list.forEach((item, id) => {
            inputlist.push(
                <WrapInput
                    key={id}
                    id={id}
                    name="list"
                    type="text"
                    placeholder="what to do"
                    value={item.content}
                    onChange={this.handleChangeList}
                />
            );
        })
        inputlist.push(<br key="br" />);
        inputlist.push(
            <Button
                key={"btnAdd"} // just to remove warning
                action={this.handleAddList}
                type={"primary"}
                title={"+"}
            />
        );
        return inputlist;
    }

    render() {
        const list = this.renderInputList();
        return (
            <form className="container">
                <label htmlFor="todoTitle" className="form-label">Title</label>
                <WrapInput
                    id={"todoTitle"}
                    name={"title"}
                    type="text"
                    placeholder="todo title"
                    value={this.state.title}
                    onChange={this.handleChangeList}
                />
                <br />
                <label htmlFor="todoItem" className="form-label">Todo</label>
                {list}
                <br />
                <hr />
                <Button
                    type={'primary'}
                    title={'Submit'}
                    action={this.handleSubmitForm}
                />
            </form>    
        )
    }
}

export default AddTodo