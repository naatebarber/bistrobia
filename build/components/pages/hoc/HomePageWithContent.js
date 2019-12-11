import HomePage from '../HomePage';
import {
    withProps,
    withHandlers,
    withState,
    lifecycle,
    withStateHandlers,
    compose
} from 'recompose';
import { connect } from 'react-redux';
import contentHooks from '../../../../contentHooks';

export const HomePageWithContent = compose(
    connect(),
    withStateHandlers(null, {
        onContent: state => data => ({
            content: data.fields
        })
    }),
    lifecycle({
        componentDidMount() {
            fetch(contentHooks.HOME_PAGE)
                .then(res => res.json())
                .then(data => this.props.onContent(data))
                .catch(err => console.log(err));
        }
    })
)(HomePage);

