import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import MenuHeader from './components/MenuHeader';

class App extends Component {

	componentDidMount() {
		fetch('/api')
			.then(res => res.json())
			.then(res => console.log(res))
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
