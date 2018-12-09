import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Loader from "review/components/loader/Loader";
import "review/scss/marvel.scss";
import Header from "review/components/general/Header";
import Routes from "review/core/Routes";

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
        <div className="App">
          <Route path={"*"} component={Header}/>

          {/* SITE : CONTENTS */}
          <section id={"contents"} style={{backgroundColor: "#fff"}}>
            <Switch>
              {this.routesRender()}
            </Switch>
          </section>

          <Loader/>

          <footer>
            <div className="mm-footer py-4">
              <div className="container text-center">
                <p>Developed by <a className="text-muted" rel="noopener noreferrer" href="mailto:lab@yuiti.com.br">Fabio Y. Goto</a>. Source code @ <a
                  className="text-muted" target="_blank" rel="noopener noreferrer" href="https://github.com/yuigoto"><i className="fab fa-github"></i> Github</a></p>
                <p>
                  <small>Data provided by Marvel. © 2014 Marvel. Get your own API key at <a
                    href="https://developer.marvel.com" className="text-muted"
                    rel="noopener noreferrer"
                    target="_blank">https://developer.marvel.com</a></small>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;