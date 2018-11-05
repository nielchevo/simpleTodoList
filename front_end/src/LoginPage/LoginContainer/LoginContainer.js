import React, { Component } from 'react';
import axios from 'axios';

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        console.log('submiting login');
        await axios.post('http://localhost:5000/user/login', {
            username: this.state.username,
            password: this.state.password
        }
        /*, {
                headers: {
                    //'Authorization': `Token ${still_none}`
                    'Authorization': `Token hai`
                }
            }*/
        );
    }

    handleClearForm() {

    }

    //render() {
    //    return (
    //        <div className="container h-100 identifyProb">
    //            <div className="row h-100 justify-content-center align-items-center">
    //                <form className="col-12">
    //                    <div className="form-group">
    //                        <label htmlFor="inputUsername">username</label>
    //                        <input type="text" className="form-control" id="username" placeholder="username" />
    //                    </div>
    //                    <div className="form-group">
    //                        <label htmlFor="inputPassword">password</label>
    //                        <input type="password" className="form-control" id="password" placeholder="password" />
    //                    </div>
    //                    <div className="form-group">
    //                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.handleSubmit}>Sign in</button>
    //                    </div>                        
    //                </form>
    //            </div>
    //        </div>
    //    )
    //}

    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <Input />
                <Input />
                <Button />
            </form>    
        );        
    }
}

export default LoginContainer;