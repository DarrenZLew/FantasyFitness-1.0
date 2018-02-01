import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import 'react-dates/initialize';

class App extends Component {

	componentDidMount() {
		fetch('/api')
			.then(res => res.json())
			.catch(err => console.log(err))
	}

	render() {
		return (
				<Router>
				<MenuHeader />
				</Router>
			   )
	}
}

export default App;
