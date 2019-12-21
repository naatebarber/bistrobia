import {
    withStateHandlers,
    lifecycle,
    withProps,
    compose
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cart from '../Cart';

export const CartWithContent = withRouter(compose(
    // connect(),
    // withStateHandlers(),
    // withProps(),
    // lifecycle()
)(Cart))