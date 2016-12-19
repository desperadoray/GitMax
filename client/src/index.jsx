import React from 'react';
import {render} from 'react-dom';
import PageNotFound from './PageNotFound.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';
import AboutPage from './AboutPage.jsx';

const router = (
    <Router history={hashHistory}>
      {/*<Router>*/}
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={AboutPage}/>
      </Route>
      <Route path="*" component={PageNotFound}/>
    </Router>
);

render(router, document.getElementById('app'));