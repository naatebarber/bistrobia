/* eslint-disable no-unused-vars */

import {
	withStateHandlers,
	lifecycle,
	compose,
	withProps
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Checkout from '../Checkout';
import ContentHooks from '../../../../contentHooks';

const helpers = props => {

};

export const CheckoutWithContent = withRouter(compose(
	connect((state, ownProps) => {
		const { cart } = state;
		return { cart };
	}),
	withStateHandlers(null, {
		onContent: state => data => {
			console.log(data);
			return {
				content: data.fields
			};}
	}),
	withProps(helpers),
	lifecycle({
		componentDidMount() {
			fetch(ContentHooks.CHECKOUT_CONTENT)
				.then(res => res.json())
				.then(data => this.props.onContent(data))
				.catch(err => console.log(err));
		}
	})
)(Checkout));