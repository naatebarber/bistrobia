/* eslint-disable no-unused-vars */

import {
	withStateHandlers,
	lifecycle,
	withProps,
	compose
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContentHooks from '../../../../contentHooks';
import Navigation from '../Navigation';

const linkTo = props => {
	return {
		linkTo: path => {
			props.history.push(path);
		}
	};
};

export const NavigationWithContent = withRouter(compose(
	connect((state, ownProps) => {
		const { cart } = state;
		return { cart };
	}),
	withStateHandlers(null, {
		onContent: state => data => ({
			content: data.fields
		})
	}),
	withProps(linkTo),
	lifecycle({
		componentDidMount() {
			fetch(ContentHooks.NAVIGATION)
				.then(res => res.json())
				.then(data => this.props.onContent(data))
				.catch(err => console.log(err));
		}
	})
)(Navigation));