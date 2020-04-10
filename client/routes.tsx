import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';

const Routes: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Route exact path="/" component={Home} />
    </div>
  );
};

export default Routes;
