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
                    content: 'aaaaaa'
                },
                {
                    content: 'bbbbbb'
                },
                {
                    content: 'cccccc'
                }
            ]
        };
    }

    handleChangeList = (e) => {
        let updatelist = this.state.list;
        //console.log(e.target);
        //console.log(updatelist[e.target.id]);
        //console.log(this.state);        
        updatelist[e.target.id] = {content: e.target.value}
        //console.log(updatelist);
        this.setState({
            ...this.state,
            updatelist
        })
    }

    render() {
        const formlist = this.state;
        const tes = formlist.list.length ? (
            formlist.list.map((item, id) => {
                return (
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
                )
            })
            
        ) : (
            <input
                className="form-control"
                id="list-todo"
                name="list-todo"
                type="text"
                value=""
                
                placeholder="what to do"
            />
        )

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
                {tes}
                <Button
                    type={"primary"}
                    title={'+ New list'}
                    addNewList={() => { }}
                />
                <br /> <hr />
                <Button
                    type={'primary'}
                    title={'Submit'}
                    handlePost={() => { }}
                />
            </form>    
        )
    }
}

export default AddTodo