import React, { Component } from 'react';
import '../../styles/pages/cart.css';

export default class Cart extends Component {
    render() {
        const { content } = this.props;
        if(!(content)) return <div></div>;

        return (
            <div></div>
        )
    }
}