import React, { Component } from 'react';

class ComposeSalad extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const inventory = this.props.inventory;
        let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        return (
            <div className="container">
                <ul>
                    {foundations.map(name => <li key={name}>{name}</li>)}
                </ul>
                <span>
                    {/* This is a comment! */}
                </span>
            </div>
        );
    }
}
export default ComposeSalad;