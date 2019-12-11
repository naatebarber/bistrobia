import React, { Component } from 'react';
import '../../styles/pages/shop.css';
import { GridWithContent } from '../reusables/hoc/GridWithContent'

export default class Shop extends Component {
    render() {
        const { content } = this.props;
        if(!content) return <div></div>;
        console.log(content);
        
        return (
            <div className="page">
                <GridWithContent items={content}/>
            </div>
        )
    }
}