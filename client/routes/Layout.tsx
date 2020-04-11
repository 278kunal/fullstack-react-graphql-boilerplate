// ./routes/Layout.js
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import React from 'react';

// A Routes file is a good shared entry-point between client and server
import routes from './routes';

const Layout = () =>
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/another">Another page</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      {routes.map((route: any) => <Route key={route.name} {...route} />)}
    </Switch>
  </div>;

export default Layout;
