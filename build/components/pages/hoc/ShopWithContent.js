import {
    withStateHandlers,
    lifecycle,
    withProps,
    compose
} from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import ContentHooks from '../../../../contentHooks';
import Shop from '../Shop'; 

const linkTo = props => {
    return {
        linkTo: path => {
            props.history.push(path);
        }
    }
}

export const ShopWithContent = withRouter(compose(
    connect(),
    withStateHandlers(null, {
        onContent: state => data => {
            return {content: data.items}
        }
    }),
    withProps(linkTo),
    lifecycle({
        componentDidMount() {
            fetch(ContentHooks.SHOP)
                .then(res => res.json())
                .then(data => this.props.onContent(data))
                .catch(err => this.props.onContent(null));
        }
    })
)(Shop));