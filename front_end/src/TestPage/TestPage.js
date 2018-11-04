import React, { Component } from 'react';
import '../App.css';

class TestPage extends Component {
    render() {
        return (
            <div className="container">
                { console.log(this.props) }
                <p>TEST PAGE</p>
            </div>
        );
    }
}

export default TestPage;