import React, { Component } from 'react';
import '../../styles/pages/navigation.css';

export default class Navigation extends Component {
    render() {
        const { content } = this.props;
        if(!content) return <div></div>
        return (
            <div className="navigation">
                <div className="title">{content.title}</div>
                <div className="menu-items"></div>
            </div>
        )
    }
}