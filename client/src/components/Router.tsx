import React from 'react';
import { Route as R } from '../utils';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './Auth';
import { Message } from './Message';

export const Router = () => {
  const route = [
    {
      component: <Login />,
      path: R.Home,
    },
    {
      component: <Message />,
      path: R.Message,
    },
  ];
  return (
    <BrowserRouter>
      <Switch>
        {route.map((item, index) => (
          <Route path={item.path} key={index} exact>
            {item.component}
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
};
