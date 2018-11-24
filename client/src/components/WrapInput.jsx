import React, { Component } from 'react';

// Component for input field without label

class WrapInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        const { name, onChange } = this.props;
        const newValue = e.target.value;
        onChange(name, newValue);
    }

    render() {
        const { value } = this.props;
        return (
            <input
                className="form-control"
                id={props.id}
                name={props.name}
                type={props.type}
                value={value}
                onChange={this.handleChange}
                placeholder={props.placeholder}
            />  
        );
    }
}

export default WrapInput