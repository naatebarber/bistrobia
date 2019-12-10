import { Component } from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router'

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    compose()(App),
    document.getElementById('main-app')
);