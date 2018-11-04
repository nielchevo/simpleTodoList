import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="email" id="email" className="form-control" placeholder="enter email" required autoFocus />
                                        <label htmlFor="inputEmail">Email</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="password" className="form-control" placeholder="enter password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="passwordConf" className="form-control" placeholder="confirm password" required />
                                        <label htmlFor="inputPasswordConf">Password Confirmation</label>
                                    </div>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                                    {/*
                                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                                    */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;