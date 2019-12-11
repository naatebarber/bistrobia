import {
    withStateHandlers,
    lifecycle,
    withProps,
    compose
} from 'recompose'
import { connect } from 'react-redux'
import ContentHooks from '../../../../contentHooks';
import Navigation from '../Navigation';

export const withNavigation = compose(
    connect(),
    withStateHandlers(null, {
        onContent: state => data => ({
            content: data.fields
        })
    }),
    lifecycle({
        componentDidMount() {
            fetch(ContentHooks.NAVIGATION)
                .then(res => res.json())
                .then(data => this.props.onContent(data));
        }
    })
)(Navigation)