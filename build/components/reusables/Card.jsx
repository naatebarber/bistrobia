import React, { Component } from 'react';
import Img from 'react-fix-image-orientation'
import '../../styles/reusables/card.css';

export default class Card extends Component {
    render() {
        const { imageShowcase, postDescription, postName, salesPrice } = this.props.item.fields;
        return (
            <div className="card">
                <Img
                    className="image"
                    src={imageShowcase[0].fields.file.url}
                    />
                <div className="description">
                    <div className="header">{postName}</div>
                    <div className="sales-price">${salesPrice}</div>
                    <div className="text">{postDescription}</div>
                </div>
            </div>
        )
    }
}