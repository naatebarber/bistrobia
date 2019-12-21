import {
    withStateHandlers,
    lifecycle,
    withProps,
    compose
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cart from '../Cart';
import ContentHooks from '../../../../contentHooks';

const helpers = props => ({
    removeFromCart: item => {
        return props.dispatch({
            type: "REMOVE_FROM_CART",
            item: item
        })
    }
})

export const CartWithContent = withRouter(compose(
    connect((state, ownProps) => {
        const { cart } = state;
        return { cart };
    }),
    withStateHandlers(null, {
        onContent: state => data => {
            return {
                content: data.fields
            }
        }
    }),
    withProps(helpers),
    lifecycle({
        componentDidMount() {
            fetch(ContentHooks.CART_CONTENT)
                .then(res => res.json())
                .then(data => this.props.onContent(data))
                .catch(err => console.log(err));
        }
    })
)(Cart))