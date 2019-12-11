import React, { Component } from 'react';
import '../../styles/reusables/card.css';

export default class Card extends Component {
    render() {
        const { content } = this.props;
        if(!content) return <div></div>;

        return (
            <div className="card">
                
            </div>
        )
    }
}