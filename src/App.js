import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './common/Menu';
import GridListProduct from './product/GridListProduct';
import Keycloak from 'keycloak-js';

const keycloak = Keycloak('/keycloak.json');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    keycloak.init({ onLoad: 'check-sso' }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
    });
  }

  signIn() {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
    });
  }

  signOut() {
    keycloak.logout();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu
            authenticated={this.state.authenticated}
            signIn={this.signIn}
            signOut={this.signOut}
            handleChangeLocale={this.props.handleChangeLocale}
          />
          <Route exact path="/" component={GridListProduct} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
