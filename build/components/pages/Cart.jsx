import React, { Component } from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';
import '../../styles/pages/cart.css';

export default class Cart extends Component {
    render() {
        const { content, cart, removeFromCart } = this.props;
        if(!(content)) return <div></div>;

        return (
            <div className="cart page">
                <div className="hero plain">{content.cartName}</div>
                <div className="cart-wrapper">
                    {cart.contents.map((item, index) => (
                        <div className="cart-item" key={item.name}>
                            <div className="item-image">
                                <ExifOrientationImg className="image" src={item.image} />
                            </div>
                            <div className="item-details">
                                <div className="item-name">{item.name}</div>
                                <div className="item-text">{item.description}</div>
                            </div>
                            <div className="item-sales-price">${item.price} </div>
                            <div className="item-remove">
                                <i className="fas fa-times-circle" onClick={() => { removeFromCart(index) }}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}