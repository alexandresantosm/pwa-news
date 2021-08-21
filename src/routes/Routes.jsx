import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "../containers/Home";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
