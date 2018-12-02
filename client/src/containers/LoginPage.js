import React, { Component } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';
import Auth from '../modules/Auth';

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

        this.Auth = new Auth();
    }

    handleSubmit(e) {
        e.preventDefault();

        this.Auth.login(this.state.username, this.state.password, (res => {
            // Temporary, remove after redux?
            console.log('login page: ', res);
            this.props.history.push('/');
        }));
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