import React, { Component } from 'react';
import '../../styles/reusables/grid.css';
import Card from './Card';

export default class Grid extends Component {
    render() {
        const { items, toHex, linkToPost } = this.props;
        if(!items) return <div></div>;
        
        return (
            <div className="grid">
                {items.map(item => (
                    <Card item={item} key={item.fields.postName} linkToPost={(() => linkToPost(toHex(item.sys.id))).bind(this)}/>
                ))}
            </div>
        )
    }
}