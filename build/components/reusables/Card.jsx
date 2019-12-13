import React, { Component } from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';
import '../../styles/reusables/card.css';

export default class Card extends Component {
    render() {
        const { imageShowcase, postDescription, postName, salesPrice } = this.props.item.fields;
        return (
            <div className="card">
                <ExifOrientationImg
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