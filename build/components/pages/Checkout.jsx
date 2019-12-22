import React, { Component } from 'react';
import CardForm from '../reusables/CardForm';
import '../../styles/pages/checkout.css';

export default class Checkout extends Component {
    render() {
        const { content, cart, history } = this.props;
        console.log(this.props);
        if(cart.contents.length == 0) history.push("/");
        if(!(content)) return <div></div>;

        return (
            <div className="checkout page">
                <div className="checkout-header"><span>{content.checkoutPageName}</span></div>
                <div className="form-wrapper">
                    <CardForm />
                </div>
            </div>
        );
    }
}