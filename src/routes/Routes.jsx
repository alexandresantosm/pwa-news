import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "../containers/Home";
import { Post } from "../containers/Post";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:subject/:id" exact component={Post} />
      </Switch>
    </BrowserRouter>
  );
}
