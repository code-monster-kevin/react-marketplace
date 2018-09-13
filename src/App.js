import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './common/Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Menu />
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
