import React, { Component } from 'react';
import '../../styles/reusables/grid.css';

export default class Grid extends Component {
    render() {
        const { content } = this.props;
        console.log(content);
        if(!content) return <div></div>;
        
        return (
            <div className="grid">
                Hello
            </div>
        )
    }
}