import React, { Component } from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';
import '../../styles/pages/cart.css';

export default class Cart extends Component {
    render() {
        const { content, cart, removeFromCart, linkTo } = this.props;
        if(!(content)) return <div></div>;
        console.log(cart);

        return (
            <div className="cart page">
                <div className="hero" style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${content.heroImage.fields.file.url})`
                }}>{content.cartName}</div>
                <div className="category-header"><span>Your Items</span></div>
                { cart.contents.length ? '' :
                    <div className="message">{content.emptyCartMessage}</div> }
                <div className="cart-wrapper">
                    {cart.contents.map((item, index) => (
                        <div className="cart-item" key={item.name + index}>
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
                { cart.contents.length ?
                    <div className="checkout"> 
                        <span onClick={() => { linkTo("/checkout") }}>{content.checkoutMessage}</span>
                    </div> : '' }
            </div>
        )
    }
}