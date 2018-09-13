import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './common/Menu';
import GridListProduct from './product/GridListProduct';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <GridListProduct />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
