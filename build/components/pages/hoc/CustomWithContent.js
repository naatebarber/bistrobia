import {
    compose,
    lifecycle,
    withStateHandlers,
    withProps
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContentHooks from '../../../../contentHooks';
import Custom from '../Custom';

const helpers = props => {
    return {
        linkTo: path => {
            props.history.push(path);
        },
        filterPostsByCategory: category => posts => {
            return posts.filter(post => post.fields.metadata.category == category);
        }
    }
}

export const CustomWithContent = withRouter(compose(
    connect(),
    withStateHandlers(null, {
        onContent: state => data => {
            return {
                content: data.fields
            }
        },
        onPosts: state => data => {
            return {
                posts: data.items
            }
        }
    }),
    withProps(helpers),
    lifecycle({
        componentDidMount() {
            fetch(ContentHooks.CUSTOM_SHOP_CONTENT)
                .then(res => res.json())
                .then(data => this.props.onContent(data))
                .catch(err => console.log(err));
            fetch(ContentHooks.CUSTOM_SHOP_POSTS)
                .then(res => res.json())
                .then(data => this.props.onPosts(data))
                .catch(err => console.log(err));
        }
    })
)(Custom))