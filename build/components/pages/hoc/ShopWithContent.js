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

const helpers = props => {
    return {
        filterPostsByCategory: category => posts => {
            return posts.filter(post => post.fields.metadata.category == category);
        }
    }
}

export const ShopWithContent = withRouter(compose(
    connect(),
    withStateHandlers(null, {
        onContent: state => data => {
            return {content: data.fields}
        },
        onPosts: state => data => {
            return {posts: data.items}
        }
    }),
    withProps(helpers),
    lifecycle({
        componentDidMount() {
            fetch(ContentHooks.SHOP_POSTS)
                .then(res => res.json())
                .then(data => this.props.onPosts(data))
                .catch(err => console.log(err));
            fetch(ContentHooks.SHOP_CONTENT)
                .then(res => res.json())
                .then(data => this.props.onContent(data))
                .catch(err => console.log(err));
        }
    })
)(Shop));