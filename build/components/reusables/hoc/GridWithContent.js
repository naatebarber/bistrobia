import {
	withProps,
	compose,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '../Grid';
import { Buffer } from 'buffer';

const helpers = props => ({
	toHex: id => (new Buffer(id).toString('hex')),
	linkToPost: hexidecimalEncodedID => {
		props.history.push(`/post${hexidecimalEncodedID}`);
	},
});

export const GridWithContent = withRouter(compose(
	connect(),
	withProps(helpers)
)(Grid));