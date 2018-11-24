import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

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

    handleChangeList = (e) => {
        const { title, list } = this.state;
        //console.log(e.target);
        //console.log(updatelist[e.target.id]);
        //console.log(this.state);        
        list[e.target.id] = {content: e.target.value}
        //console.log(list);
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
        console.log(this.state);
    }

    renderInputList = () => {
        const { list } = this.state;
        let inputlist = [];
        list.forEach((item, id) => {
            inputlist.push(
                <input
                    key={id}
                    className="form-control"
                    id={id}
                    name="list-todo"
                    type="text"
                    value={item.content}
                    onChange={this.handleChangeList}
                    placeholder="what to do"
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
                <Input
                    type={"text"}
                    title={"Title"}
                    name={"todoTitle"}
                    value=""
                    placeholder={"ex. My Todos "}
                    handleChange={() => { }}
                />
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