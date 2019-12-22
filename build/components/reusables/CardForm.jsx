import React, { Component } from 'react';
import {
    withProps,
    compose
} from 'recompose';
import { connect } from 'react-redux';
import {
    injectStripe,
    StripeProvider,
    CardElement,
    CardNumberElement,
    CardCVCElement,
    CardExpiryElement,
    PostalCodeElement,
    PaymentRequestButtonElement,
    Elements
} from 'react-stripe-elements';
import ContentHooks from '../../../contentHooks';
import '../../styles/reusables/cardform.css';

const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          fontFamily: 'Bebas Neue, Open Sans, sans-serif',
          letterSpacing: '0.025em',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#c23d4b',
        },
      }
    }
}

class ModifiedCardElement extends Component {
    render() {
        const { submit, cart } = this.props;
        return (
            <div className="cardform" style={{margin: "auto"}}>
                <form>
                    <div className="cart-contents">
                        {cart.contents.map((item, index) => (
                            <div className="checkout-item-grid" key={index}>
                                <div className="checkout-item-name">{item.name}</div>
                                <div className="checkout-item-price">${item.price}</div>
                            </div>
                        ))}
                        <div className="checkout-total">Total: ${cart.total}</div>
                    </div>
                    <div className="payment-input-grid">
                        <input type="text" name="first" placeholder="First Name" className="span-2"/>
                        <input type="text" name="last" placeholder="Last Name" className="span-2"/>
                        <input type="text" name="address" placeholder="Address Line 1" />
                        <input type="text" name="address" placeholder="Address Line 2" className="span-3"/>
                        <input type="text" name="state" placeholder="State" className="span-1"/>
                        <input type="text" name="zip" placeholder="Zip Code" className="span-2"/>
                        <CardElement {...createOptions()} />
                        <div className="button" onClick={submit}>Submit Order</div>
                    </div>
                </form>       
            </div>
        );
    }
}

const ModifiedCardElementWithStripe = injectStripe(compose(
    connect((state, ownProps) => ({
        cart: state.cart
    })),
    withProps(props => ({
        submit: ev => {
            console.log("TOTAL " + props.cart.total)
            props.stripe.createToken({"name": "PaymentToken"})
                .then(data => fetch("/charge", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        token: data.token.id,
                        amt: Math.ceil(props.cart.total * 100) || 0,
                        description: "Example Purchase!"
                    })
                }))
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
    }))
)(ModifiedCardElement));

export default class CardForm extends Component {
    render() {
        return (
            <StripeProvider apiKey={ContentHooks.STRIPE_API_KEY}>
                <Elements fonts={[{
                    cssSrc: 'https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap'
                }]}>
                    <ModifiedCardElementWithStripe />
                </Elements>
            </StripeProvider>
        );
    }
}