import React, { Component } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // debug
        this.debugLogState = this.debugLogState.bind(this);
    }

    handleSubmit(e) {
        
        //console.log(this.state.username);
        //console.log(this.state.password);
        axios.post('http://localhost:5000/user/login', {
            username: this.state.username,
            password: this.state.password
            })
            .then(response => {
                if (response) {
                    console.log(response);
                }
            })
            .catch(err => {
                if (err) {
                    console.log("error: ", err);
                }
            });

        e.preventDefault();
    }

    handleClearForm() {

    }

    handleChange = (e) => {
        let newState = {}
        newState[e.target.name] = e.target.value
        this.setState(newState)
    }

    debugLogState = (e) => {
        e.preventDefault();

        console.log(this.state);
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <Input
                    type={"text"}
                    title={"Username"}
                    name={"username"}
                    value={this.state.username}
                    placeholder={"enter username"}
                    handleChange={this.handleChange}
                />
                <Input
                    type={"password"}
                    title={"Password"}
                    name={"password"}
                    value={this.state.password}
                    placeholder={"enter password"}
                    handleChange={this.handleChange}
                />
                <Button
                    action={this.handleSubmit}
                    type={"primary"}
                    title={"Login"}
                />
                {/*{" "}
                <Button
                    action={this.debugLogState}
                    type={"secondary"}
                    title={"DEBUG"}
                />*/}
            </form>    
        );        
    }
}

export default LoginContainer;