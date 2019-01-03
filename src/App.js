import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Notes from './components/notes/notes'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/folder/:folderId" component={Notes} />
        </Router>      
      </div>
    );
  }
}

export default App;
