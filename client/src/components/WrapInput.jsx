import React, { Component } from 'react';

// Component for input field without label

class WrapInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        const { id, name, onChange } = this.props;
        const newValue = e.target.value;
        onChange(id, name, newValue);
    }

    render() {
        const { value } = this.props;
        return (
            <input
                className="form-control"
                id={this.props.id}
                name={this.props.name}
                type={this.props.type}
                value={value}
                onChange={this.handleChange}
                placeholder={this.props.placeholder}
            />  
        );
    }
}

export default WrapInput