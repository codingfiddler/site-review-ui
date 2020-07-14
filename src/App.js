import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputFormTheFirst from './components/InputFormTheFirst'
import InputPageTheFirst from './pages/InputPageTheFirst'
import OutputPageTheFirst from './pages/OutputPageTheFirst'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/input">Input Page</Link>
              </li>
              <li>
                <Link to="/output">Output Page</Link>
              </li>
            </ul>
          </nav>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {/* <InputFormTheFirst /> */}
          </div>

        </header>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/input">
          <InputPageTheFirst />
        </Route>
        <Route path="/output">
          <OutputPageTheFirst />
        </Route>
      </Switch>
    </div>
  </Router>

  );
}

export default App;
