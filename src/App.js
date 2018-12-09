import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "components/base/Header";
import Footer from "components/base/Footer";
import Routes from "core/Routes";
import Loader from "components/loader/Loader";

/**
 * App
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class App extends Component {
  /**
   * Renders application routes.
   */
  routesRender() {
    return Routes.map((item, key) => {
      return (
        <Route key={key} {...item}/>
      );
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div id={"mm-app"}>
          <Route path={"*"} component={Header}/>
          <section id={"contents"}>
            <Switch>
              {this.routesRender()}
            </Switch>
          </section>
          <Route path={"*"} component={Footer}/>
          <Loader/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
