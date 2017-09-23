import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import MenuHeader from './components/MenuHeader';
import ScoreForm from './components/ScoreForm';
import Login from './components/Login';
import FourOFour from './components/404';

class App extends Component {
  
  render() {
    return (
      <Router>
				<div>
        	<MenuHeader />
					<Switch>
						<Route path='/score' render={() => <ScoreForm />} />
						<Route path='/login' render={() => <Login />} />
						<Route path='/404' component={FourOFour} />
						<Redirect to='/404' />
					</Switch>
				</div>
			</Router>

    )
  }
}

export default App;
