import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CurrentTimer, Project, Projects } from './containers';

const Home = () => <h2>Welcome</h2>;

const Routes = () => (
  <Switch>
    <Route exact path="/time-tracker" component={CurrentTimer} />
    <Route exact path="/projects" component={Projects} />
    <Route exact path="/projects/:id" component={Project} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
