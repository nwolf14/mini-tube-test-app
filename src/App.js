import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Home from "./views/home/home";
import Login from "./views/login/login";

import Navbar from "./components/navbar/navbar";
import Searchbar from "./components/searchbar/searchbar";

import { routes } from "./common/constants";
import { checkIfUserExists } from "./actions/user";

class App extends Component {
  componentDidMount() {
    //this.props.checkIfUserExists();
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Navbar />
            </div>
            <div className="col-12">
              <Searchbar />
            </div>
          </div>
        </div>

        <Switch>
          <Route path={routes.LOGIN} component={Login} />
          <Route path={routes.HOME} component={Home} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      checkIfUserExists
    },
    dispatch
  );
}

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(App)
);
