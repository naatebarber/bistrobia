import {
    withProps,
    withStateHandlers,
    compose,
    lifecycle
} from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '../Grid';

export const GridWithContent = withRouter(compose(
    connect(),
    withProps()
)(Grid))