import React, { Component } from 'react';
import './App.css';
import HeaderNavbar from './components/HeaderNavbar';
import ScoreForm from './components/ScoreForm';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderNavbar />
        <ScoreForm />
      </div>


    )
  }
}

export default App;
