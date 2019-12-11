import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
    Router,
    Switch,
    Route
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { preloadedState, reducer } from './store';

import { withNavigation as Navigation } from './components/pages/hoc/withNavigation';
import { withHomePage } from './components/pages/hoc/withHomePage';

const history = createBrowserHistory(),
    reduxStore = createStore(reducer, preloadedState);

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={reduxStore}>
                    <Navigation></Navigation>
                    <Router history={history} >
                        <Switch>
                            <Route exact path='/' component={withHomePage} />
                        </Switch>
                    </Router>
                </Provider>
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('main-app')
);