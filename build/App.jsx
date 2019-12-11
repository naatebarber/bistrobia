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

import { NavigationWithContent } from './components/pages/hoc/NavigationWithContent';
import { HomePageWithContent } from './components/pages/hoc/HomePageWithContent';
import { ShopWithContent } from './components/pages/hoc/ShopWithContent';
import Shop from './components/pages/Shop';

const history = createBrowserHistory(),
    reduxStore = createStore(reducer, preloadedState);

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={reduxStore}>
                    <Router history={history} >
                        <NavigationWithContent></NavigationWithContent>
                        <Switch>
                            <Route exact path='/' component={HomePageWithContent} />
                            <Route exact path='/bikes' />
                            <Route exact path='/shop' component={ShopWithContent} />
                            <Route exact path='/account' />
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

module.hot.accept();