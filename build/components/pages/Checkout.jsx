import React, { Component } from 'react';
import CardForm from '../reusables/CardForm';
import '../../styles/pages/checkout.css';

export default class Checkout extends Component {
    render() {
        const { content } = this.props;
        console.log(this.props);
        if(!(content)) return <div></div>;

        return (
            <div className="checkout page">
                <div className="checkout-header"><span>{content.checkoutPageName}</span></div>
                <CardForm />
            </div>
        );
    }
}