import React from "react";

import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Todo from "./components/Todo";

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/todo" component={Todo} />
    </Switch>
  );
};

export default App;
