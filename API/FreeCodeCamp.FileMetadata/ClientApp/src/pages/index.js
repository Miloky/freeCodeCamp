import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FileMetadata from './file-metadata';
import NotFound from './not-found';
import Root from './root';

const Routes = () => {
  return <Router>
    <Switch>
      <Route path="/" exact>
        <Root />
      </Route>
      <Route path='/file-metadata'>
        <FileMetadata/>
      </Route>
      <Route path="*">
        <NotFound/>
      </Route>
    </Switch>
  </Router>;
};

export default Routes;
