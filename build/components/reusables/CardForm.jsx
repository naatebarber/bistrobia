import React, { Component } from 'react';
import {
    injectStripe,
    StripeProvider,
    CardElement,
    Elements
} from 'react-stripe-elements';
import ContentHooks from '../../../contentHooks';

const createOptions = () => ({
    style: {
        fontFamily: "Bebas Neue",
        padding: "5px",
        borderRadius: "4px",
        border: "#ce7e6f"
    }
})

class ModifiedCardElement extends Component {
    render() {
        return (
            <div>
                <form>
                    <CardElement {...createOptions()} />         
                </form>       
            </div>
        );
    }
}

const ModifiedCardElementWithStripe = injectStripe(ModifiedCardElement);

export default class CardForm extends Component {
    render() {
        return (
            <StripeProvider apiKey={ContentHooks.STRIPE_API_KEY}>
                <Elements>
                    <ModifiedCardElementWithStripe />
                </Elements>
            </StripeProvider>
        );
    }
}