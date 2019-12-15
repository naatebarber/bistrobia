import {
    withStateHandlers,
    withState,
    withProps,
    lifecycle,
    compose
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Post from '../Post';

const helpers = props => ({
    fromHex: hex => (new Buffer(hex, "hex").toString())
})

export const PostWithContent = withRouter(compose(
    connect(),
    withStateHandlers(null, {
        onContent: state => data => ({
            content: data.fields,
            currentImageRef: data.fields.imageShowcase[0].fields.file.url
        }),
        updateImageRef: state => newRef => ({
            currentImageRef: newRef
        })
    }),
    withProps(helpers),
    lifecycle({
        componentWillMount() {
            const entryID = this.props.fromHex(this.props.match.params.id);
            fetch(`/cf_entry?entryID=${entryID}`)
                .then(res => res.json())
                .then(data => this.props.onContent(data))
                .catch(err => console.log(err));
        }
    })
)(Post))