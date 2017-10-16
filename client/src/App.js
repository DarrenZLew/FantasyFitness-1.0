import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import ScoreForm from './components/ScoreForm';
import Login from './components/Login';
import FourOFour from './components/404';
import ScoreSheet from './components/ScoreSheet';
import ProfileForm from './components/ProfileForm';
import HeadToHead from './components/HeadToHead';

class App extends Component {
  render() {
    return (
      <Router>
				<div>
        	<MenuHeader />
					<Switch>
						<Route exact path='/score' render={() => <ScoreForm />} />
						<Route exact path='/scoresheet' render={() => <ScoreSheet />} />
						<Route path='/login' render={() => <Login />} />
						<Route path='/matchups' render={() => <HeadToHead />} />
						<Route path='/profile' render={() => <ProfileForm userAttributes={this.state.userAttributes} preferences={this.state.preferences} handleCheckedBox={this.handleCheckedBox}/>} />
						<Route path='/404' component={FourOFour} />
						<Redirect to='/404' />
					</Switch>
				</div>
			</Router>

    )
  }
}

export default App;
